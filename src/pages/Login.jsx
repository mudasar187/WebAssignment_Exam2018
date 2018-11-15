import React, {Component} from 'react';
import LoginForm from '../containers/LoginForm';
import Header from '../containers/Header';
import { Jumbotron, Grid, Row } from 'react-bootstrap';
import Footer from '../containers/Footer';

export default class Login extends Component{
	render(){
		return (
			<Grid>
				<Row>
					<Header />
					<Jumbotron>
						<LoginForm/>
					</Jumbotron>
					<Footer />
				</Row>
			</Grid>
		);
	}
}
