import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import actions from "../redux/actions";
import selectors from "../redux/selectors";
import { ListGroup, ListGroupItem } from "react-bootstrap";

class Leaderboard extends Component {
  static propTypes = {
    data: PropTypes.array,
    getLeaderboard: PropTypes.func.isRequired
  };

  static defaultProps = {
    data: []
  };

  componentWillMount() {
    this.props.getLeaderboard();
  }

  render() {
    const { data } = this.props;
    const maxScore = data.length ? data[0].total_points : 0;

    return (
      <ListGroup>
        {data.map((user, index) => (
          <ListGroupItem key={index}>
            <b>
              {user.name}&nbsp;&nbsp;
              {user.total_points === maxScore && (
                <img src="star.png" style={{ height: "2rem" }} alt="" />
              )}
              <span style={{ float: "right" }}>{user.total_points}</span>
            </b>
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
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Leaderboard)
);

export default ConnectedLeaderboard;
