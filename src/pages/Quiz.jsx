import React, {Component} from 'react';
import QuizContainer from '../containers/Quiz';
import { Jumbotron, Grid, Row } from 'react-bootstrap';
import Footer from '../containers/Footer';

export default class Quiz extends Component{
	render(){
		const { quizId } = this.props.match.params;
		return (
			<Grid>
				<Row>
					<Jumbotron>
						<QuizContainer quizId={quizId} />
					</Jumbotron>
					<Footer />
				</Row>
			</Grid>
		);
	}
}
