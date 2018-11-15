import * as actionTypes from "./actionTypes";

import ApplicationService from '../services/ApplicationService';

export const getAllQuizzes = () => ({
    type: actionTypes.GET_ALL_QUIZZES,
    payload: ApplicationService.getAllQuizzes()
});

export const joinQuizRequest = (quizId) => ({
    type: actionTypes.JOIN_QUIZ_REQUEST,
    payload: ApplicationService.joinQuizRequest(quizId)
});

export const joinQuizReject = (payload) => ({
    type: actionTypes.JOIN_QUIZ_REJECT,
    payload: payload
});

export const joinQuizInfo = (payload) => ({
    type: actionTypes.JOIN_QUIZ_INFO,
    payload: payload
});

export const joinQuizWait = (payload) => ({
    type: actionTypes.JOIN_QUIZ_WAIT,
    payload: payload
});

export const startQuizSuccess = (payload) => ({
    type: actionTypes.START_QUIZ_SUCCESS,
    payload: payload
});

export const finishQuizSuccess = (payload) => ({
    type: actionTypes.FINISH_QUIZ_SUCCESS,
    payload: payload
});

export const leaveQuizRequest = (quizId) => ({
    type: actionTypes.LEAVE_QUIZ_REQUEST,
    payload: ApplicationService.leaveQuizRequest(quizId)
});

export const loginSuccess = (payload) => ({
    type: actionTypes.LOGIN_SUCCESS,
    payload: payload
});

export const setUserIsLoggedIn = (payload) => ({
    type: actionTypes.SET_USER_IS_LOGGED_IN,
    payload: payload
});

export const receiveIncomingQuestion = (payload) => ({
    type: actionTypes.RECEIVE_INCOMING_QUESTION,
    payload: payload
});

export const logoutRequest = () => ({
    type: actionTypes.LOGOUT_REQUEST,
    payload: ApplicationService.logout()
});

export const answerQuestionRequest = (params) => ({
    type: actionTypes.ANSWER_QUESTION_REQUEST,
    payload: ApplicationService.answerQuestionRequest(params)
});

export const answerQuestionSuccess = (payload) => ({
    type: actionTypes.ANSWER_QUESTION_SUCCESS,
    payload: payload
});

export const getLeaderboard = () => ({
    type: actionTypes.GET_LEADERBOARD,
    payload: ApplicationService.getLeaderboard()
});

export const receiveUsersOnline = (payload) => ({
    type: actionTypes.RECEIVE_USERS_ONLINE,
    payload: payload
});

export default {
    getAllQuizzes,
    joinQuizRequest,
    joinQuizWait,
    joinQuizReject,
    leaveQuizRequest,
    joinQuizInfo,
    loginSuccess,
    logoutRequest,
    startQuizSuccess,
    finishQuizSuccess,
    receiveIncomingQuestion,
    answerQuestionRequest,
    answerQuestionSuccess,
    getLeaderboard,
    receiveUsersOnline,
    setUserIsLoggedIn
};