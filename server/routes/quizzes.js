const express = require("express");
const User = require("../database/models/user");
const Quiz = require("../database/models/quiz");
const router = express.Router();

/*
 * Get user stats sorted
 */
router.get("/stats", (req, res, next) => {
  if (!req.user) {
    return res.status(401);
  }

  User.aggregate(
    [
      {
        $project: {
          name: true,
          total_points: true,
          _id: false
        }
      },
      { $sort: { total_points: -1 } }
    ],
    (err, results) => {
      if (err) {
        console.log("error: ", err);
      }
      res.json(results);
    }
  );
});

/*
 * Get quizzes
 */
router.get("/", (req, res, next) => {
  if (!req.user) {
    return res.status(401);
  }

  Quiz.aggregate(
    [
      {
        $project: {
          name: true,
          playersCount: { $size: "$players" },
          maxPlayersCount: true
        }
      }
    ],
    (err, quizzes) => {
      if (err) {
        console.log("User.js post error: ", err);
      }
      res.json(quizzes);
    }
  );
});

module.exports = router;
