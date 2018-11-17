import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import actions from '../redux/actions';
import selectors from '../redux/selectors';
import { Button, Navbar, Nav, NavItem } from 'react-bootstrap';

class Header extends Component {

    static propTypes = {
        isUserLoggedIn: PropTypes.bool.isRequired,
        logoutAction: PropTypes.func.isRequired
    }

    render() {
        const {
            history,
            isUserLoggedIn,
            logoutAction
        } = this.props;

        return (
            <Navbar>
                <Navbar.Header>
                    <Navbar.Brand>
                        <a href={isUserLoggedIn ? "/dashboard" : "/"}>
                            Quiz game
                        </a>
                    </Navbar.Brand>
                </Navbar.Header>
                <Nav>
                    <NavItem>
                        <Button onClick={() => {
                            history.push("/about");
                        }}>
                            About
                        </Button>
                    </NavItem>
                </Nav>
                <Nav pullRight>
                    {isUserLoggedIn ? (
                        <NavItem>
                            <Button onClick={() => {
                                history.push("/leaderboard");
                            }}>
                                Leaderboard
                            </Button>
                            &nbsp;
                            <Button bsStyle="danger" onClick={() => {
                                logoutAction();
                                history.push("/");
                            }}>
                                Log out
                            </Button>
                        </NavItem>
                    ) : (
                        <NavItem>
                            <Button onClick={() => {
                                history.push("/sign-up");
                            }}>
                                Sign up
                            </Button>
                            &nbsp;
                            <Button bsStyle="primary" onClick={() => {
                                history.push("/login");
                            }}>
                                Log in
                            </Button>
                        </NavItem>
                    )}
                </Nav>
            </Navbar>
        );
    }

}

const mapStateToProps = (state) => ({
    isUserLoggedIn: selectors.getIsUserLoggedIn(state)
});

const mapDispatchToProps = dispatch => ({
    logoutAction: () => dispatch(actions.logoutRequest())
});

const ConnectedHeader = withRouter(
    connect(mapStateToProps, mapDispatchToProps)(Header)
);

export default ConnectedHeader;
