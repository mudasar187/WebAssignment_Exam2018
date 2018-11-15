import React, {Component} from 'react';
import { withRouter } from 'react-router-dom';
import _ from 'lodash';
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

    onSubmit(event) {
        const {user} = this.state;

        event.preventDefault();

        ApplicationService.register(user.name, user.password).then((_)=> {
            ApplicationService.login(user.name, user.password).then(() => {
                this.props.history.push("/dashboard");
            })
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
                    <h2>Sign up</h2>
                    {message ?
                        <Alert bsStyle="danger">
                            {_.get(message, 'body')}
                        </Alert>
                    : null}
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
                        Sign up
                    </Button>
                </FormGroup>
            </form>
        );
    }
}

export default withRouter(LoginForm);
