import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import actions from '../redux/actions';
import selectors from '../redux/selectors';
import { ListGroup, ListGroupItem, Col, Alert, Button, Table, Label } from 'react-bootstrap';

const TIME_TO_ANSWER_QUESTION = 10;

class Quiz extends Component {

    static propTypes = {
        quizId: PropTypes.string.isRequired,
        quizName: PropTypes.string,
        joinQuizRequest: PropTypes.func.isRequired,
        leaveQuizRequest: PropTypes.func.isRequired,
        answerQuestionRequest: PropTypes.func.isRequired,
        data: PropTypes.object,
        error: PropTypes.string,
        waitForPlayersCount: PropTypes.number.isRequired,
        isInProgress: PropTypes.bool.isRequired,
        isFinished: PropTypes.bool.isRequired,
        isUnexpectedFinished: PropTypes.bool.isRequired,
        activeQuestion: PropTypes.object,
        activePlayers: PropTypes.array.isRequired
    }

    static defaultProps = {
        data: {}
    }


    constructor(props) {
        super(props);

        this.getAnswerStyle = this.getAnswerStyle.bind(this);
        this.handleTimerTick = this.handleTimerTick.bind(this);
        this.handleStartTimer = this.handleStartTimer.bind(this);
        this.handleStopTimer = this.handleStopTimer.bind(this);

        this.state = {
            timer: TIME_TO_ANSWER_QUESTION,
            isPaused: true
        }
    }

    handleTimerTick() {
        this.setState({ timer : this.state.timer - 1 });
    }

    handleStartTimer() {
        clearInterval( this.interval );
        this.setState({ timer : TIME_TO_ANSWER_QUESTION, isPaused: true });

		this.interval = setInterval(this.handleTimerTick, 1000);
        this.setState({ isPaused : false });
    }

    handleStopTimer() {
        clearInterval( this.interval );
        this.setState({ isPaused : true });
    }

    componentDidUpdate(prevProps) {
        if (this.props.activeQuestion.questionId !== prevProps.activeQuestion.questionId) {
            this.handleStartTimer();
        }
    }

    componentWillMount() {
        this.props.joinQuizRequest(
            this.props.quizId
        );
    }

    componentWillUnmount() {
        this.props.leaveQuizRequest(
            this.props.quizId
        );
    }

    handleAnswerClick(answerId) {

        if (this.props.activeQuestion.question.userAnswer.answerId !== null) {
            return;
        }

        this.props.answerQuestionRequest({
            quizId: this.props.quizId,
            questionId: this.props.activeQuestion.questionId,
            answerId: answerId,
            answerSeconds: this.state.timer
        });

        this.handleStopTimer();
    }

    getAnswerStyle(answerId) {
        const {
            activeQuestion
        } = this.props;

        if (activeQuestion.question.userAnswer.answerId === null) {
            return null;
        }

        if (activeQuestion.question.userAnswer.answerId !== answerId) {
            return null;
        }

        if (activeQuestion.question.userAnswer.isCorrect) {
            return "success";
        }

        return "danger";
    }

    render() {
        const {
            error,
            history,
            leaveQuizRequest,
            waitForPlayersCount,
            isInProgress,
            isFinished,
            isUnexpectedFinished,
            quizName,
            activeQuestion,
            activePlayers
        } = this.props;

        const timer = new Date(this.state.timer * 1000);

        return (
            <Col>
                <h2 className="text-center">{quizName}</h2>
                {waitForPlayersCount !== 0 && !isInProgress ? (
                    <Alert bsStyle="info" className="text-center">
                        Wait for other players to join.. <br/>Missing <h4>{waitForPlayersCount}</h4> player(s) to start the game!
                    </Alert>
                ) : null}
                {isInProgress ? (
                    <Alert bsStyle="warning" className="text-center">
                        Quiz in progress.
                    </Alert>
                ) : null}
                {isUnexpectedFinished ? (
                    <Alert bsStyle="info" className="text-center">
                        Other player left quiz.
                    </Alert>
                ) : null}
                {isFinished ? (
                    <Alert bsStyle="success" className="text-center">
                        Quiz finished!
                    </Alert>
                ) : null}
                {error ? (
                    <Alert bsStyle="danger" className="text-center">
                        {error}
                    </Alert>
                ) : null}
                {Object.keys(activeQuestion).length && activeQuestion.question ? (
                    <div>
                        <h2 className="text-center">{activeQuestion.question.name}</h2>
                        <h3 className="text-center">
                            <Label bsStyle={this.state.isPaused ? "warning" : "primary"}>
                                00:{timer.getSeconds() < 10 ? '0' : ''}{timer.getSeconds()}
                            </Label>
                            <br/>
                            <h5>{this.state.isPaused ? "Wait for next question ..." : "Choose your option!"}</h5>
                        </h3>
                        <ListGroup>
                            {activeQuestion.question.answers.map((answer, answerId) => (
                                <ListGroupItem bsStyle={this.getAnswerStyle(answerId)} key={answerId} onClick={() => this.handleAnswerClick(answerId)} >
                                    {answer}
                                </ListGroupItem>
                            ))}
                        </ListGroup>
                    </div>
                ) : null}
                <Table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Points</th>
                        </tr>
                    </thead>
                    <tbody>
                        {activePlayers.map((activePlayer, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{activePlayer.name}</td>
                                <td>{activePlayer.points}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                <div className="text-center">
                    <Button onClick={() => {
                        leaveQuizRequest();
                        history.push("/dashboard");
                    }} bsStyle="danger">
                        Quit
                    </Button>
                </div>
            </Col>
        );
    }

}

const mapStateToProps = (state) => ({
    error: selectors.getQuizError(state),
    waitForPlayersCount: selectors.getWaitForPlayersCount(state),
    quizName: selectors.getQuizName(state),
    isInProgress: selectors.getQuizIsInProgress(state),
    isFinished: selectors.getQuizIsFinished(state),
    isUnexpectedFinished: selectors.getQuizIsUnexpectedFinished(state),
    activeQuestion: selectors.getActiveQuestion(state),
    activePlayers: selectors.getActivePlayers(state)
});

const mapDispatchToProps = dispatch => ({
    joinQuizRequest: (quizId) => dispatch(actions.joinQuizRequest(quizId)),
    leaveQuizRequest: (quizId) => dispatch(actions.leaveQuizRequest(quizId)),
    answerQuestionRequest: (params) => dispatch(actions.answerQuestionRequest(params))
});

const ConnectedQuiz = withRouter(
    connect(mapStateToProps, mapDispatchToProps)(Quiz)
);

export default ConnectedQuiz;
