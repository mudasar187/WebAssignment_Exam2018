import React, {Component} from 'react';
import Header from '../containers/Header';
import LeaderboardContainer from '../containers/Leaderboard';
import { Jumbotron, Grid, Row } from 'react-bootstrap';
import Footer from '../containers/Footer';

export default class Leaderboard extends Component{
	render(){
		return (
			<Grid>
				<Row>
					<Header />
					<Jumbotron>
							<h2 className="text-center">Leaderboard</h2>
							<br/>
							<h5>Username <span style={{ float: "right" }}>Total points</span></h5>
						<LeaderboardContainer />
					</Jumbotron>
					<Footer />
				</Row>
			</Grid>
		);
	}
}
