import React, {Component} from 'react';
import Header from '../containers/Header';
import { Jumbotron, ButtonToolbar, Button, Grid, Row } from 'react-bootstrap';
import Footer from '../containers/Footer';

export default class Homepage extends Component{
	render(){
		return (
			<Grid>
				<Row>
					<Header />
					<Jumbotron>
						<h1>Quiz Game</h1>
						<ButtonToolbar>
							<Button href="/sign-up">Sign up</Button>
							<Button bsStyle="primary" href="/login">Log in</Button>
						</ButtonToolbar>
					</Jumbotron>
					<Footer />
				</Row>
			</Grid>
		);
	}
}
