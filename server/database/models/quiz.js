const mongoose = require("mongoose");
const Schema = mongoose.Schema;
mongoose.promise = Promise;

// Define userSchema
const quizSchema = new Schema({
  name: { type: String },
  maxPlayersCount: { type: Number },
  players: { type: Array },
  questions: { type: Array }
});

const join = function(quizId, userId) {
  return new Promise((resolve, reject) => {
    // Return if there are no empty places in quiz
    if (this.players.length >= 2) return reject("Quiz full!");

    // Return if the user is already part of the quiz
    if (this.players.indexOf(userId) > -1) return reject("User part of quiz!");
  });
};

quizSchema.methods = {
  join: join
};

// these three methods used to add default data into database when running application
const Quiz = mongoose.model("Quiz", quizSchema);
module.exports = Quiz;

module.exports.createQuiz = (quiz, callback) => {
  quiz.save(callback);
};

module.exports.getAllQuizzes = callback => {
  Quiz.find(callback);
};
