const http = require("http");
const SocketServer = require("ws").Server;
const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const session = require("express-session");
const dbConnection = require("./database");
const MongoStore = require("connect-mongo")(session);
const passport = require("./passport");
const path = require("path");

const app = express();

const PORT = process.env.PORT || 3000;

// Route requires
const authRoutes = require("./routes/auth");
const quizzesRoutes = require("./routes/quizzes");

const WebsocketService = require("./websockets");

// MIDDLEWARE
app.use(morgan("dev"));
app.use(bodyParser.json());

// Sessions
app.use(
  session({
    secret: "sessionsecret",
    store: new MongoStore({ mongooseConnection: dbConnection }),
    resave: false,
    saveUninitialized: false
  })
);

// Passport
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/auth", authRoutes);
app.use("/quizzes", quizzesRoutes);

if (process.env.NODE_ENV === "production" || process.env.NODE_ENV === "docker") {
  // Set static folder
  app.use('/', express.static("build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "build", "index.html"));
});
}

// Starting Server
const server = app.listen(PORT, () => {
  console.log(`App listening on PORT: ${PORT}`);
});

const wss = new SocketServer({ server });

new WebsocketService(wss);
