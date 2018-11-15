import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import actions from '../redux/actions';
import selectors from '../redux/selectors';
import { ListGroup, ListGroupItem } from 'react-bootstrap';

class Leaderboard extends Component {

    static propTypes = {
        data: PropTypes.array,
        getLeaderboard: PropTypes.func.isRequired
    }

    static defaultProps = {
        data: []
    }

    componentWillMount() {
        this.props.getLeaderboard();
    }

    render() {
        const { data } = this.props;

        return (
            <ListGroup>
                {data.map((user, index) => (
                    <ListGroupItem key={index} >
                        <b>User: {user.name}</b>: {user.total_points}
                    </ListGroupItem>
                ))}
            </ListGroup>
        );
    }

}

const mapStateToProps = state => ({
    data: selectors.getLeaderboard(state)
});

const mapDispatchToProps = dispatch => ({
    getLeaderboard: () => dispatch(actions.getLeaderboard())
});

const ConnectedLeaderboard = withRouter(
    connect(mapStateToProps, mapDispatchToProps)(Leaderboard)
);

export default ConnectedLeaderboard;
