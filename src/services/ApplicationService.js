import ApiService from "./ApiService";
import WebsocketService from "./WebSocketService";

let _applicationService = null;

/*
    Service that manages the main functionality of the app
*/
class ApplicationService {
  /*
        Returns leaderboard data
    */
  getLeaderboard() {
    return new Promise((resolve, reject) => {
      return ApiService.get("/quizzes/stats")
        .then(response => {
          resolve(response);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  /*
        Returns list of all quizzes
    */
  getAllQuizzes() {
    return new Promise((resolve, reject) => {
      return ApiService.get("/quizzes")
        .then(response => {
          resolve(response);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  /*
        Sends request to join specific quiz
    */
  joinQuizRequest(quizId) {
    const obj = {
      action: "join_quiz_request",
      payload: {
        quizId: quizId
      }
    };

    return WebsocketService.send(obj);
  }

  /*
        Sends request to leave specific quiz
    */
  leaveQuizRequest(quizId) {
    const obj = {
      action: "leave_quiz_request",
      payload: {
        quizId: quizId
      }
    };

    return WebsocketService.send(obj);
  }

  /*
        Sends request to answer question
    */
  answerQuestionRequest({ quizId, questionId, answerId, answerSeconds }) {
    const obj = {
      action: "answer_question_request",
      payload: {
        quizId: quizId,
        questionId: questionId,
        answerId: answerId,
        answerSeconds: answerSeconds
      }
    };

    return WebsocketService.send(obj);
  }

  /*
        Returns user token
    */
  getUserToken() {
    return localStorage.getItem("token");
  }

  /*
        Sets user token
    */
  setUserToken(accessToken) {
    localStorage.setItem("token", accessToken);
  }

  /*
        Logs the user out
    */
  logout() {
    WebsocketService.disconnect();
    localStorage.removeItem("token");
    return new Promise((resolve, reject) => {
      ApiService.post("/auth/logout")
        .then(response => {
          return resolve(response.data);
        })
        .catch(err => {
          return reject("Error logging out: ", err);
        });
    });
  }

  /*
        Registers user
    */
  register(name = null, password = null) {
    return new Promise((resolve, reject) => {
      ApiService.post("/auth/signup", {
        name: name,
        password: password
      })
        .then(response => {
          return resolve(response.data);
        })
        .catch(err => {
          return reject("Error signing up: ", err);
        });
    });
  }

  isAuthenticated() {
    return new Promise((resolve, reject) => {
      return ApiService.get("/auth/check")
        .then(response => {
          resolve(response);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  /*
        Logs the user in
    */
  login(name = null, password = null) {
    return new Promise((resolve, reject) => {
      ApiService.post("/auth/login", {
        name: name,
        password: password
      })
        .then(response => {
          this.setUserToken(response.data.token);
          return resolve(response.data);
        })
        .catch(err => {
          return reject("Username/password incorrect", err);
        });
    });
  }
}

_applicationService = new ApplicationService();
export default _applicationService;
