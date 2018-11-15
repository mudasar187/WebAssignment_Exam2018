export const getAllQuizzes = store => store.quizzes.get('allQuizzes').toJS();
export const getQuizError = store => store.quizzes.get('error');
export const getQuizIsWaiting = store => store.quizzes.get('isWaiting');
export const getQuizIsInProgress = store => store.quizzes.get('isInProgress');
export const getQuizIsFinished = store => store.quizzes.get('isFinished');
export const getQuizIsUnexpectedFinished = store => store.quizzes.get('isUnexpectedFinished');
export const getQuizName = store => store.quizzes.getIn(['activeQuiz', 'name']);
export const getIsUserLoggedIn = store => store.user.get('isLoggedIn');
export const getActiveQuestion = store => store.quizzes.get('activeQuestion');
export const getActivePlayers = store => store.quizzes.get('activePlayers');
export const getLeaderboard = store => store.leaderboard.get('data');
export const getUsersOnline = store => store.quizzes.get('usersOnline');

export default {
    getAllQuizzes,
    getQuizError,
    getQuizIsWaiting,
    getQuizIsInProgress,
    getQuizName,
    getIsUserLoggedIn,
    getQuizIsFinished,
    getActiveQuestion,
    getActivePlayers,
    getLeaderboard,
    getUsersOnline,
    getQuizIsUnexpectedFinished,
}
