const Quiz = require("../database/models/quiz");

// To create default quizzes into database from defaultdata.json file

module.exports.addDefaultDataToDatabase = () => {
  let quizData = require("./defaultdata.json");

  let quizObjects = quizData.map(
    q =>
      new Quiz({
        name: q.name,
        players: q.players,
        maxPlayersCount: q.maxPlayersCount,
        questions: q.questions
      })
  );

  Quiz.getAllQuizzes((err, quizzes) => {
    if (err) {
      console.log(err);
      return;
    }
    if (quizzes.length === 0) {
      console.log("Saving quizzes to database ...");
      quizObjects.forEach(quiz => Quiz.createQuiz(quiz));
    } else {
      console.log("Finding new quizzes ...");

      let difference = quizObjects.filter(
        o1 => !quizzes.some(o2 => o1.name === o2.name)
      );
      console.log(`Number of new quizzes: ${difference.length}`);

      difference.forEach(quiz => Quiz.createQuiz(quiz));
      console.log("Done adding new quizzes ...");
    }
  });
};
