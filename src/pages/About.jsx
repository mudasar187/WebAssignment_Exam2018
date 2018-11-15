import React, {Component} from 'react';
import Header from '../containers/Header';
import Footer from '../containers/Footer';
import { Jumbotron, Grid, Row } from 'react-bootstrap';

export default class About extends Component{
	render(){
		return (
			<Grid>
				<Row>
					<Header />
					<Jumbotron>
						<h2>About</h2>
						<p>
							About game here
						</p>
					</Jumbotron>
					<Footer />
				</Row>
			</Grid>
		);
	}
}

