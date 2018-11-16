import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Countdown from 'react-countdown-now';
import actions from '../redux/actions';
import selectors from '../redux/selectors';
import { ListGroup, ListGroupItem, Col, Alert, Button, Table } from 'react-bootstrap';

class Quiz extends Component {

    static propTypes = {
        quizId: PropTypes.string.isRequired,
        quizName: PropTypes.string,
        joinQuizRequest: PropTypes.func.isRequired,
        leaveQuizRequest: PropTypes.func.isRequired,
        answerQuestionRequest: PropTypes.func.isRequired,
        data: PropTypes.object,
        error: PropTypes.string,
        isWaiting: PropTypes.bool.isRequired,
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
            answerId: answerId
        });
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
            isWaiting,
            isInProgress,
            isFinished,
            isUnexpectedFinished,
            quizName,
            activeQuestion,
            activePlayers
        } = this.props;

        return (
            <Col>
                <h4>{quizName}</h4>
                {isWaiting ? (
                    <Alert bsStyle="info">
                        Wait for other user to join...
                    </Alert>
                ) : null}
                {isInProgress ? (
                    <Alert bsStyle="warning">
                        Quiz in progress.
                    </Alert>
                ) : null}
                {isUnexpectedFinished ? (
                    <Alert bsStyle="info">
                        Other player left quiz.
                    </Alert>
                ) : null}
                {isFinished ? (
                    <Alert bsStyle="success">
                        Quiz finished!
                    </Alert>
                ) : null}
                {error ? (
                    <Alert bsStyle="danger">
                        {error}
                    </Alert>
                ) : null}
                {Object.keys(activeQuestion).length && activeQuestion.question ? (
                    <div>
                        <h2>{activeQuestion.question.name}</h2>
                        <h3><Countdown date={Date.now() + 10000} /></h3>
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
                <Button onClick={() => {
                    leaveQuizRequest();
                    history.push("/dashboard");
                }} bsStyle="danger">
                    Quit
                </Button>
            </Col>
        );
    }

}

const mapStateToProps = (state) => ({
    error: selectors.getQuizError(state),
    isWaiting: selectors.getQuizIsWaiting(state),
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
