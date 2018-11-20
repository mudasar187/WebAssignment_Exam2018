import React from "react";
import ReactDOM from "react-dom";

import { Provider } from "react-redux";
import store from "./redux/store/configureStore";

import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";

import Homepage from "./pages/Homepage";
import Dashboard from "./pages/Dashboard";
import Leaderboard from "./pages/Leaderboard";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import About from "./pages/About";
import Quiz from "./pages/Quiz";
import Locked from "./containers/Locked";

import WebSocketService from "./services/WebSocketService";

// Add the redux.dispatch function to WebSocketService
WebSocketService.setDispatch(store.dispatch);

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Switch>
        <Route exact path="/" component={Homepage} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/about" component={About} />
        {/* Locked */}
        <Locked>
          <Route exact path="/leaderboard" component={Leaderboard} />
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/play/:quizId" component={Quiz} />
        </Locked>
        {/* 404 */}
        <Redirect to="/" />
      </Switch>
    </Router>
  </Provider>,
  document.getElementById("root")
);
