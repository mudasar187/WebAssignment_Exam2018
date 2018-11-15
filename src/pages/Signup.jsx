import React, {Component} from 'react';
import SignupForm from '../containers/SignupForm';
import Header from '../containers/Header';
import { Jumbotron, Grid, Row } from 'react-bootstrap';
import Footer from '../containers/Footer';

export default class Signup extends Component{
	render(){
		return (
			<Grid>
				<Row>
					<Header />
					<Jumbotron>
						<SignupForm/>
					</Jumbotron>
					<Footer />
				</Row>
			</Grid>
		);
	}
}
