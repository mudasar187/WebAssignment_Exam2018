const Quiz = require("../database/models/quiz");


module.exports.addDefaultDataToDatabase = () => {
  let quizData = require("./defaultdata.json");

  let quizObjects = quizData.map(q => new Quiz({
    name : q.name,
    players: q.players,
    maxPlayersCount: q.maxPlayersCount,
    questions: q.questions}));

  Quiz.getAllQuizzes(function (err, quizzes) {
    if (err) {
      console.log(err);
      return
    }
    if (quizzes.length === 0) {
      console.log("Database was empty, saving all quizzes to database...");
      quizObjects.forEach(quiz => Quiz.createQuiz(quiz));

    } else {
      console.log("Adding new quizzes to database...");

      let difference = quizObjects.filter(o1 => !quizzes.some(o2 => o1.name === o2.name));
      console.log(`Number of new quizzes: ${difference.length}`);

      difference.forEach(quiz => Quiz.createQuiz(quiz))
    }
    console.log("quizzes saved to database");
  })
};