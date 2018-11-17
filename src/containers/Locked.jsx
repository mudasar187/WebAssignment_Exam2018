import { Component } from "react";
import PropTypes from "prop-types";
import actions from "../redux/actions";
import selectors from "../redux/selectors";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import ApplicationService from "../services/ApplicationService";

class Locked extends Component {
  static propTypes = {
    isUserLoggedIn: PropTypes.bool.isRequired,
    setUserIsLoggedIn: PropTypes.func.isRequired
  };

  componentWillMount() {
    ApplicationService.isAuthenticated()
      .then(result => {
        this.props.setUserIsLoggedIn(result.data.isAuthenticated);
        if (!result.data.isAuthenticated) {
          this.props.history.push("/");
        }
      })
      .catch(() => {
        this.props.history.push("/");
      });
  }

  render() {
    const { isUserLoggedIn } = this.props;
    return isUserLoggedIn ? this.props.children : null;
  }
}

const mapStateToProps = state => ({
  isUserLoggedIn: selectors.getIsUserLoggedIn(state)
});

const mapDispatchToProps = dispatch => ({
  setUserIsLoggedIn: isAuthenticated =>
    dispatch(actions.setUserIsLoggedIn(isAuthenticated))
});

const ConnectedLocked = withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Locked)
);

export default ConnectedLocked;
