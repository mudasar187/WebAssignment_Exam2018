
const { OrderedMap } = require('immutable')
const _ = require('lodash')
const jwt = require('jsonwebtoken')
const Quiz = require('../database/models/quiz')
const User = require('../database/models/user')
const ObjectID = require('mongodb').ObjectID
const secretToken = require('../config/jwtSecret')

/*
    Connection model manages the Websocket connections
*/
class WebsocketService {
    constructor(wss) {
        this.wss = wss;
        this.connections = OrderedMap();

        this.init();
    }

    init() {
        //init Websocket ws and handle incoming connect requests
        this.wss.on('connection', (ws) => {
            const socketId = new ObjectID().toString();

            const clientConnection = {
                _id: `${socketId}`,
                ws: ws,
                userId: null
            }

            // Save the connection to cache
            this.connections = this.connections.set(socketId, clientConnection);

            // Listen to messages on socket
            ws.on('message', (msg) => {

                console.log("SERVER: message from a client", msg);

                const message = this.decodeMessage(msg);
                this.parseMessage(socketId, message);
            });

            // Listen when connection was closed
            ws.on('close', () => {

                console.log("Someone disconnected from the server", socketId);

                const closeConnection = this.connections.get(socketId);
                const userId = _.toString(_.get(closeConnection, 'userId', null));

                // Remove user from connections
                this.connections = this.connections.remove(socketId);
            });
        });
    }

    /*
        Decode the message from websocket
    */
   decodeMessage(msg) {
        let messageObject = null;

        try {
            messageObject = JSON.parse(msg);
        }
        catch (err) {
            console.log("Error when decoding message", msg);
        }

        return messageObject;
    }

    /*
        Manages the incoming messages and executes functions
    */
    parseMessage(socketId, msg) {

        const action = _.get(msg, 'action');
        const payload = _.get(msg, 'payload');
        const token = _.get(msg, 'token');

        const userConnection = this.connections.get(socketId);

        jwt.verify(token, secretToken.jwtSecret, (err, decoded) => {
            if (err) {
                return;
            }

            userConnection.userId = decoded.sub

            this.connections.set(socketId, userConnection);

            const userId = decoded.sub;

            switch (action) {
                /*
                    Executed when the user leaves the quiz
                */
                case 'leave_quiz_request':
                    Quiz.update(
                        { players: { $in: [String(userId)] } },
                        { $pull: { players: String(userId) } },
                        { returnOriginal: false }
                    ).then(() => {
                        User.update(
                            {_id: new ObjectID(userId)},
                            {$set: {activeQuizId: null}},
                            { returnOriginal: false }
                        ).then(() => {
                            console.log("User left quiz!: ", userId);

                            // Inform the user that he has left the quiz
                            this.send(userConnection.ws, {
                                action: 'leave_quiz_request',
                                payload: true,
                            });

                            // Inform other players that a user left the quiz
                            this.connections.forEach((connection) => {
                                this.send(connection.ws, {
                                    action: 'someone_left_quiz'
                                });
                            });
                        });
                    });
                    return;
                /*
                    Executed when the user joins the quiz
                */
                case 'join_quiz_request':
                    Quiz.findOne({ _id: payload.quizId }, (err, quiz) => {
                        // Return if there are no empty places in quiz
                        if (quiz.players.length >= 2) return "";

                        // Return if the user is already part of the quiz
                        if (quiz.players.indexOf(userId) > -1) return "";

                        Quiz.update({_id: new ObjectID(quiz._id)}, { $push: { players: userId } }, (err, info) => {

                            if (err) {
                                this.send(userConnection.ws, {
                                    action: 'join_quiz_reject',
                                    payload: err,
                                });
                            }

                            User.update({_id: new ObjectID(userId)}, {$set: {activeQuizId: quiz._id, points: 0}}, () => {

                                this.send(userConnection.ws, {
                                    action: 'join_quiz_info',
                                    payload: {
                                        id: quiz._id,
                                        name: quiz.name
                                    },
                                });

                                // Inform other players that user joined quiz
                                this.connections.forEach((connection) => {
                                    this.send(connection.ws, {
                                        action: 'someone_joined_quiz'
                                    });
                                });

                                Quiz.findOne({_id: new ObjectID(quiz._id)}, (err, quizData) => {
                                    if (quizData.players.length < quizData.maxPlayersCount) {
                                        // Inform the user to wait for other players
                                        return this.send(userConnection.ws, {
                                            action: 'join_quiz_wait',
                                            payload: quizData.maxPlayersCount - quizData.players.length
                                        });
                                    }

                                    Quiz.findOne({_id: new ObjectID(quiz._id)}, {"questions.answer_id": 0}, (err, quizData) => {
                                        const playerConnections = this.connections.filter((c) => quizData.players.includes(c.userId));
                                        let questionCounter = 0;

                                        this.connections.forEach((connection) => {
                                            console.log("connection", connection);
                                        });

                                        // Inform other players that quiz has started
                                        playerConnections.forEach((connection) => {
                                            this.send(connection.ws, {
                                                action: 'start_quiz_success',
                                                payload: true
                                            });
                                        });

                                        // Send questions one by one to playes
                                        const questionAsk = () => {
                                            User.find({activeQuizId: payload.quizId}, {"name": true, "points": true}, (err, activePlayers) => {
                                                console.log("activePlayers", activePlayers);

                                                // Finish quiz if other user disconnected
                                                if (activePlayers.length < quizData.maxPlayersCount) {
                                                    clearInterval(interval);

                                                    return Quiz.findOne({_id: new ObjectID(quiz._id)}, (err, quizData) => {
                                                        // Remove players from quiz and assign points
                                                        quizData.players.forEach((userId) => {
                                                            Quiz.update({_id: new ObjectID(quiz._id)}, { $pull: { players: String(userId) } }, (err, result) => {
                                                                User.findOne({_id: new ObjectID(userId)}, (err, user) => {
                                                                    User.update({_id: new ObjectID(userId)}, {
                                                                        $set: {
                                                                            activeQuizId: null,
                                                                            points: 0,
                                                                            total_points: user.total_points + user.points
                                                                        }
                                                                    }, () => {
                                                                        console.log("User updated", userId);
                                                                    });
                                                                });
                                                            });
                                                        });

                                                        playerConnections.forEach((connection) => {
                                                            this.send(connection.ws, {
                                                                action: 'finish_quiz_success',
                                                                payload: {
                                                                    quizId: quiz._id,
                                                                    activePlayers: activePlayers,
                                                                    isUnexpectedFinished: true
                                                                }
                                                            });
                                                        });
                                                    });
                                                }

                                                // Finish the quiz if it is the last question
                                                if (questionCounter >= quizData.questions.length) {
                                                    clearInterval(interval);

                                                    return Quiz.findOne({_id: new ObjectID(quiz._id)}, (err, quizData) => {
                                                        // Remove players from quiz and assign points
                                                        quizData.players.forEach((userId) => {
                                                            Quiz.update({_id: new ObjectID(quiz._id)}, { $pull: { players: String(userId) } }, (err, result) => {
                                                                User.findOne({_id: new ObjectID(userId)}, (err, user) => {
                                                                    User.update({_id: new ObjectID(userId)}, {
                                                                        $set: {
                                                                            activeQuizId: null,
                                                                            points: 0,
                                                                            total_points: user.total_points + user.points
                                                                        }
                                                                    }, () => {
                                                                        console.log("User updated");
                                                                    });
                                                                });
                                                            });
                                                        });

                                                        playerConnections.forEach((connection) => {
                                                            this.send(connection.ws, {
                                                                action: 'finish_quiz_success',
                                                                payload: {
                                                                    quizId: quiz._id,
                                                                    activePlayers: activePlayers
                                                                }
                                                            });
                                                        });
                                                    });
                                                }

                                                // Send question to every player
                                                playerConnections.forEach((connection) => {
                                                    this.send(connection.ws, {
                                                        action: 'incoming_question',
                                                        payload: {
                                                            quizId: quizData._id,
                                                            questionId: questionCounter,
                                                            question: quizData.questions[questionCounter],
                                                            activePlayers: activePlayers
                                                        }
                                                    });
                                                });
                                                questionCounter++;
                                            });
                                        };

                                        // Ask the first question
                                        questionAsk();

                                        // Ask other questions after interval has passed
                                        const interval = setInterval(questionAsk, 10000);
                                    });
                                })
                            });
                        });
                    });
                    return;
                /*
                    Executed when the user asnwers a question
                */
                case 'answer_question_request':
                    const { quizId, questionId, answerId } = payload;

                    Quiz.findOne({_id: new ObjectID(quizId)}, (err, quiz) => {
                        if (err) return;

                        const isCorrect = quiz.questions[questionId]["answer_id"] === parseInt(answerId)

                        // Increase the user points if question is correct
                        if (isCorrect) {
                            User.update({_id: new ObjectID(userId)}, {$inc: {'points': 1}}, () => {
                                console.log("User bumped!", userId);
                            });
                        }

                        // Inform the user about question answered
                        this.send(userConnection.ws, {
                            action: 'answer_question_success',
                            payload: {
                                answerId,
                                isCorrect
                            }
                        });
                    });
                    return;
                default:
                    break;
            }
        })
    }

    /*
        Sends message through websocket
    */
   send(ws, obj) {
        const message = JSON.stringify(obj);
        ws.send(message);
    }
}

module.exports = WebsocketService