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
              <h5 style={{ float: "left" }}>Name</h5>
              <h5 style={{ float: "right" }}>Current players / Required players</h5>
            <QuizList />
          </Jumbotron>
          <Footer />
        </Row>
      </Grid>
    );
  }
}
