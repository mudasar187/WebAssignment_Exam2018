import React, {Component} from 'react';
import { withRouter } from 'react-router-dom';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import actions from '../redux/actions';
import ApplicationService from '../services/ApplicationService';
import { FormControl, FormGroup, Button, Alert } from 'react-bootstrap';

class LoginForm extends Component {

    constructor(props) {

        super(props);

        this.state = {
            message: null,
            user: {
                name: '',
                password: ''
            }
        }

        this.onSubmit = this.onSubmit.bind(this);
        this.onTextFieldChange = this.onTextFieldChange.bind(this);
    }

    static propTypes = {
        loginSuccess: PropTypes.func.isRequired
    }

    onSubmit(event) {
        const {user} = this.state;

        event.preventDefault();

        ApplicationService.login(user.name, user.password).then((payload) => {
            this.props.loginSuccess(payload);
            this.props.history.push("/dashboard");
        }).catch((err) => {
            this.setState({
                message: {
                    body: err,
                    type: 'error',
                }
            })
        });
    }

    onTextFieldChange(event) {
        let {user} = this.state;
        const field = event.target.name;
        user[field] = event.target.value;
        this.setState({
            user: user
        });
    }

    render() {

        const {user, message} = this.state;

        return (
            <form onSubmit={this.onSubmit} method="post">
                <FormGroup>
                    <h2>Log in</h2>
                    <FormControl
                        placeholder={'Username'}
                        value={_.get(user, 'name', '')}
                        onChange={this.onTextFieldChange}
                        type={'text'}
                        name={"name"}
                    />
                    <FormControl
                        placeholder="Password"
                        value={_.get(user, 'password')}
                        onChange={this.onTextFieldChange}
                        type="password"
                        name="password"
                    />
                    <Button className="primary" type="submit">
                        Log in
                    </Button>
                </FormGroup>
                {message ?
                        <Alert bsStyle="danger">
                            {_.get(message, 'body')}
                        </Alert>
                    : null}
            </form>
        );
    }
}

const mapStateToProps = () => ({
});

const mapDispatchToProps = dispatch => ({
    loginSuccess: (payload) => dispatch(actions.loginSuccess(payload))
});

const ConnectedQuiz = withRouter(
    connect(mapStateToProps, mapDispatchToProps)(LoginForm)
);

export default ConnectedQuiz;
