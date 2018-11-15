import _ from 'lodash';
// import { WEB_SOCKET_URL, PORT } from '../config';
import actions from '../redux/actions';

import ApplicationService from './ApplicationService';

let _webSocketService = null;

const WEB_SOCKET_URL = require('../config/keys').webSocketURL;
const WEB_SOCKET_PORT = require('../config/keys').webSocketPORT;

/*
    Service manages the Websocket connections
*/
class WebSocketService {

    constructor() {
        this.webSocketConnection = null;
        this.isConnected = false;

        this.connect();
        this.reconnect();
    }

    /*
        Sets the dispatch function from Redux
    */
    setDispatch(dispatch){
        this.dispatch = dispatch;
    }

    /*
        Reconnects websockets if connection lost
    */
    reconnect() {
        window.setInterval(()=>{
            if (this.isConnected) {
                return;
            }
            console.log("WebSocketService: connecting...");
            this.connect();
        }, WEB_SOCKET_PORT)
    }

    /*
        Check if websockets are connected
    */
    checkIsConnected() {
        return new Promise((resolve, reject) => {

            if (this.isConnected && this.webSocketConnection) {
                resolve(true);
            }

            this.connect().then(() => {
                resolve(true);
            })
        });
    }

    /*
        Decodes message from websockets
    */
    decodeMessage(msg) {
        let message = {};

        try {
            message = JSON.parse(msg);
        }
        catch (err) {
            console.log(err);
        }

        return message;
    }

    /*
        Parses the message and dispatches actions
    */
    parseMessage(msg) {
        const message = this.decodeMessage(msg);

        const action = _.get(message, 'action', '');
        const payload = _.get(message, 'payload');

        switch (action) {
            /*
                Executed when user successfully authenticated
            */
            case 'auth_success':
                this.dispatch(actions.loginSuccess(payload));
                break;
            /*
                Executed when quiz info is available
            */
            case 'join_quiz_info':
                this.dispatch(actions.joinQuizInfo(payload));
                break;
            /*
                Executed when not allowed to join quiz
            */
            case 'join_quiz_reject':
                this.dispatch(actions.joinQuizReject(payload));
                break;
            /*
                Executed when required to wait for other user to join
            */
            case 'join_quiz_wait':
                this.dispatch(actions.joinQuizWait(payload));
                break;
            /*
                Executed when quiz has started
            */
            case 'start_quiz_success':
                this.dispatch(actions.startQuizSuccess(payload));
                break;
            /*
                Executed when quiz is finished
            */
            case 'finish_quiz_success':
                this.dispatch(actions.finishQuizSuccess(payload));
                break;
            /*
                Executed when other user log out / log in
            */
            case 'users_online':
                this.dispatch(actions.receiveUsersOnline(payload));
                break;
            /*
                Executed when users join quizzes
            */
            case 'someone_joined_quiz':
            case 'someone_left_quiz':
                this.dispatch(actions.getAllQuizzes());
                break;

            /*
                Executed when there is a question to answer
            */
            case 'incoming_question':
                this.dispatch(actions.receiveIncomingQuestion(payload));
                break;
            /*
                Executed when question answered
            */
            case 'answer_question_success':
                this.dispatch(actions.answerQuestionSuccess(payload));
                break;

            default:
                break;
        }
    }

    /*
        Send message through websocket
    */
    send(msg = {}) {
        const isConnected = this.isConnected;

        if (this.webSocketConnection && isConnected) {

            const msgString = JSON.stringify({
                ...msg,
                token: ApplicationService.getUserToken()
            });

            return this.webSocketConnection.send(msgString);
        }
    }

    /*
        Sends authentication message
    */
    authentication() {
        const tokenId = ApplicationService.getUserTokenId();

        if (tokenId) {
            const message = {
                action: 'auth',
                payload: `${tokenId}`
            }
            this.send(message);
        }
    }

    /*
        Connects to websockets
    */
    connect() {
        console.log(WEB_SOCKET_URL);
        console.log(WEB_SOCKET_PORT);
        console.log(WEB_SOCKET_URL+WEB_SOCKET_PORT);
        const webSocketConnection = new WebSocket(WEB_SOCKET_URL);
        this.webSocketConnection = webSocketConnection;

        this.webSocketConnection.onopen = () => {
            this.isConnected = true;

            console.log("WebSocketService: connected");

            this.webSocketConnection.onmessage = (event) => {
                this.parseMessage(_.get(event, 'data'));
                console.log("Mesage from the server: ", event.data);
            }
        }

        this.webSocketConnection.onclose = () => {
            this.isConnected = false;
        }

        this.webSocketConnection.onerror = () => {
            this.isConnected = false;
        }
    }

    disconnect() {
        this.webSocketConnection.close();
    }
}

_webSocketService = new WebSocketService();
export default _webSocketService;
