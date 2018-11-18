import React, { Component } from "react";
import QuizList from "../containers/QuizList";
import Header from "../containers/Header";
import Footer from "../containers/Footer";
import { Jumbotron, Grid, Row } from "react-bootstrap";

export default class Dashboard extends Component {
  render() {
    return (
      <Grid>
        <Row>
          <Header />
          <Jumbotron>
              <h2 className="text-center">Join a Quiz</h2>
              <br/>
              <h5>Name <span style={{ float: "right" }}>Current players / Required players</span></h5>
            <QuizList />
          </Jumbotron>
          <Footer />
        </Row>
      </Grid>
    );
  }
}
