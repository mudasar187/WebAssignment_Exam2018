import React, { Component } from "react";
import Header from "../containers/Header";
import Footer from "../containers/Footer";
import { Jumbotron, Grid, Row } from "react-bootstrap";

export default class About extends Component {
  render() {
    return (
      <Grid>
        <Row>
          <Header />
          <Jumbotron>
            <div className="text-center">
              <h1>About</h1>
              <h4>How to play?</h4>
              <br />
              <p>
                On the dashboard you will see all the quizzes you can join. The
                name of the quiz is on the left side, on the right hand side you
                will see how many players currently playing the quiz and max
                players a quiz can have. If a quiz is free, you can join the
                quiz. If the quiz has max players, you can not join the quiz. A
                quiz will not start until the required number of players of the
                game has joined the quiz. When you enter the quiz, you will see
                a message of how many players there are missing before a game
                can start. Note that if you quit the game before the quiz has
                been finished, all the points you achived in the round will be
                lost. To keep the points you need to finish the game.
              </p>
              <br />
              <h4>Game rules</h4>
              <li>You got 10 seconds to answer a question</li>
              <li>If you answer right, you will get points.</li>
              <li>If you answer wrong, no points,</li>
              <li>
                The quicker you answer a question, higher points you will get.
              </li>
              <li>
                The points is the seconds that took you to answer the question.
              </li>
            </div>
          </Jumbotron>
          <Footer />
        </Row>
      </Grid>
    );
  }
}
