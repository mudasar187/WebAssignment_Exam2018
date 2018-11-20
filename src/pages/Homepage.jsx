import React, { Component } from "react";
import Header from "../containers/Header";
import { Jumbotron, ButtonToolbar, Button, Grid, Row } from "react-bootstrap";
import Footer from "../containers/Footer";

export default class Homepage extends Component {
  render() {
    return (
      <Grid>
        <Row>
          <Header />
          <Jumbotron className="text-center">
            <h1>Quiz Game</h1>
            <h4>Play against other online players</h4>
            <br />
            <ButtonToolbar bsClass="text-center">
              <Button href="/signup">Sign up</Button>
              &nbsp;
              <Button bsStyle="primary" href="/login">
                Log in
              </Button>
            </ButtonToolbar>
          </Jumbotron>
          <Footer />
        </Row>
      </Grid>
    );
  }
}
