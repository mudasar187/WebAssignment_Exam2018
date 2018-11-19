import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import actions from '../redux/actions';
import selectors from '../redux/selectors';
import { ListGroup, ListGroupItem, Badge } from 'react-bootstrap';

class QuizList extends Component {

    static propTypes = {
        data: PropTypes.object,
        usersOnline: PropTypes.number,
        getAllQuizzes: PropTypes.func.isRequired,
        getUsersOnline: PropTypes.func
    }

    static defaultProps = {
        data: []
    }

    /**
     * constructor
     */
    constructor(props) {
        super(props);

        this.handleQuizClick = this.handleQuizClick.bind(this);
    }

    /**
     * componentWillMount
     */
    componentWillMount() {
        this.props.getAllQuizzes();
    }

    handleQuizClick({ _id, playersCount, maxPlayersCount }) {
        if (playersCount >= maxPlayersCount) {
            return;
        }

        this.props.history.push(`/play/${_id}`);
    }

    /**
     * render
     */
    render() {
        const { data } = this.props;

        return (
            <ListGroup>
                {Object.keys(data).map((quizId, index) => (
                    <ListGroupItem disabled={data[quizId]['playersCount'] >= data[quizId]['maxPlayersCount'] } key={index} onClick={() => this.handleQuizClick(data[quizId])} >
                        {data[quizId]['name']} <Badge>{data[quizId]['playersCount']}&nbsp;/&nbsp;{data[quizId]['maxPlayersCount']}</Badge>
                    </ListGroupItem>
                ))}
            </ListGroup>
        );
    }

}

const mapStateToProps = state => ({
    data: selectors.getAllQuizzes(state),
    usersOnline: selectors.getUsersOnline(state)
});
const mapDispatchToProps = dispatch => ({
    getAllQuizzes: () => dispatch(actions.getAllQuizzes())
});

const ConnectedQuizList = withRouter(
    connect(mapStateToProps, mapDispatchToProps)(QuizList)
);

export default ConnectedQuizList;
