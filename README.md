## WebDevelopment and API Design - PG6300

  
## Exam Fall 2018
  
  
## QuizGame Application

A web-based application where multiple users can join quiz and play against other users using WebSockets. When a user sign up and join a game he/she need to wait until room is full before the game start. Different quizzes can have different requirement for max players. When the game start, a user have 10 seconds to answer a question before the next question show up. If both finish the game they achive the points and the points get added to their totalpoints which is showed in leaderboard. If there is a quiz with two max players, and one of them quit, the other will get notified and the game will be cancel because you cant play alone. The points will also be lost if they did not finish the game. But if there is more than 2 players, and one will quit, the others can just continue playing the game. They will se on the scoreboard under the game is running, that the user who left is gone. This will happends if they click `Quit` or exit browser by clicking `X`. The other user who continue playing the game will keep their points. 
The points are calculated by the number of seconds the user answered in. The more seconds left, the better the points. If user answered in 4 seconds, he gets 6 points (10 - 4 = 6)

On the leaderboard their points is listed up in descending sort, with the player with most points on top. 
Also marked with a star. If there is two players or more with same points, then all they will be listed with a star to indicate that they are the top players. 
  

#### Travis
Also used travis for this repo, url is removed because of private token, adding new markdown travis link when repo is public

---
  
### How to run

All these commands can be run from root folder:
  
##### - Docker
- run -> `docker-compose up` , if you want run in detached mode then `docker-compose up -d`
	- Note: Note: If are running windows you may have to restart Docker and run `docker-compose up -d` again [read this issue](https://github.com/docker/for-win/issues/573#issuecomment-301513210) due to a [bug](https://github.com/docker/for-win/issues/573) in the mongoDB container.
- verify that all nodes are up `docker-compose ps`
- if `web_app`exit, run again `docker-compose up -d`
- application will be accessible at [http://localhost:8080/](http://localhost:8080/)
	- you need to sign up a new user before you can play game
	- default quizzes are added in the database
- stop -> `docker-compose -f docker-compose.yml down --rmi all`


##### - Local (optional)
- install dependencies -> `npm install`
- connected to mongodb on local machine (this means you must start mongodb on local machine if you want to run with this command -> `npm run local-dev`
- connected to mongodb on [www.mlab.com](www.mlab.com) (create a database on mLab and change url in file `/server/config/keys_dev.js`, to use this run -> `npm run mlab-dev`


##### - Heroku
- application also deployed to [https://www.heroku.com/](https://www.heroku.com/)
- application accessible on this url -> [QuizGame](https://radiant-island-32328.herokuapp.com/)
- keep in mind that you need to wait a little bit before page is shown up, because Heroku servers tend to go in hibernate state after 30 minutes of inactivity

---  

### Tools

- **create-react-app** - Used to build the frontend

- **Express** - backend
- **React** - frontend
- **Redux** - state container for JavaScript
- **Passport** - authentication middleware for authenticating requests
- **JSONWebToken** - create token for each users so they can communicate over websockets
- **ws (WebSockets)** - a WebSocket library
- **Morgan** - popular HTTP request middleware logger for **Node**.js and basically used as a logger.
- **Axios** - is a promise-based HTTP client that works both in the browser and in a node.js environment.
- **Bcryptjs** - For hasing password
- **Immutable** - [Immutable](https://www.npmjs.com/package/immutable) data cannot be changed once created, leading to much simpler application development, no defensive copying, and enabling advanced memoization and change detection techniques with simple logic.
- **Moment** - A lightweight JavaScript date library for parsing, validating, manipulating, and formatting dates.
- **Mongoose** - Mongoose is a [MongoDB](https://www.mongodb.org/) object modeling tool designed to work in an asynchronous environment.
- **Lodash ** - Lodash makes JavaScript easier by taking the hassle out of working with arrays, numbers, objects, strings, etc.Lodash’s modular methods are great for:
	-   Iterating arrays, objects, & strings
	-   Manipulating & testing values
	-   Creating composite functions  
- **express-session** - a session middleware
- **connect-mongo** (optional) - MongoDB session store for [Connect](https://github.com/senchalabs/connect) and [Express](http://expressjs.com/)
	- if you want to store sessions in database, then you can just enable it by remove line comment in `server.js` file at line 30.
- **Nodemon** - is a utility that will monitor for any changes in your source and automatically restart your server. Perfect for development.
- **Concurrently** - Run multiple commands concurrently. Like `npm run watch-js & npm run watch-less` but better.

---

### HTTP methods
Auth:
- /POST -> /signup (user can sign up)
- /POST -> /login (user can login)
- /GET -> /check (check user auth)
- /POST -> /logout (user can log out)

Quizzes:
- /GET -> /stats (get user stats sorted)
- /GET -> / (get quizzes)

---

### Folder structure

![skjermbilde 2018-11-18 kl 12 27 53](https://user-images.githubusercontent.com/29889280/48671763-83acdd80-eb2d-11e8-91e4-1df671bbbf75.png)

##### - Backend
- **server/config** - database url config based on environment
- **server/database** - database models and connection
- **server/passport** - passport authentication
- **server/routes** - api routes
- **server/seeder** - defaultdata.json and a file which helps us adding these to database when running application
- **server/websockets** -   connection model manages the Websocket connections
- `server/server.js` file - server setup  
##### - Frontend
- **public** - holds the HTML template of our app
- **src/config** - config for websocket url
- **src/containers** - react containers
- **src/pages** - react pages
- **src/redux** - redux files
	- **reducers** - the application's state changes in response to [actions](https://redux.js.org/basics/actions) sent to the store
	- **store** - [store](https://redux.js.org/api/store) that holds the complete state tree of the app.
- `src/redux/actionsTypes.js` , `src/redux/actions.js` files - payloads of information that send data from application to store
- `src/redux/selectors.js` - functions that take Redux state as an argument and return some data to pass to the component.
- `src/services/ApiService.js` - Service that manages HTTP communication with API
- `src/services/ApplicationService.js` - Service that manages the main functionality of the app
- `src/services/WebSocketService.js` - Service manages the Websocket connections
- `src/index.js` - handle things such like react routes, provider and etc.
- `.dockerignore` - ignoring files for docker build
- `.gitingore` - ignoring files for github
- `.travis.yml` - run build on [https://travis-ci.org](https://travis-ci.org)
- `docker-compose.yml` - config for defining and running multi-container Docker
- `Dockerfile`- contains commands, in order, needed to build the given image
- `package.json` - holds metadata relevant to the project
- `Procfile` - declaring command run by application's dynos on the Heroku platform
---

### Evaluation
This exam was completed by making all the requirements set for the exam
 - [x] Docker with MongoDB database
 - [x] Heroku
 - [x] Redux
 - [x] MongoDB database

I'm satisfied with the result, but could have done a little more styling of the page with CSS. Could added admin page so a admin could add more quizzes if i have better time, and more tests. But tests with websocket part is pretty hard.


### Recources
- Udemy [The Complete React Web Developer Course (with Redux)](https://www.udemy.com/react-2nd-edition/)
- Udemy [MERN Stack Front To Back: React, Redux, Node](https://www.udemy.com/mern-stack-front-to-back/)
- Youtube - [Complete React Tutorial](https://www.youtube.com/watch?v=OxIDLw0M-m0&list=PL4cUxeGkcC9ij8CfkAY2RAGb-tmkNwQHG)
- Youtube - [NodeJS Tutorial for beginners](https://www.youtube.com/watch?v=w-7RQ46RgxU&list=PL4cUxeGkcC9gcy9lrvMJ75z9maRw4byYp) and based on previous knowledge of NodeJS.
- YouTube - [ReactCasts](https://www.youtube.com/channel/UCZkjWyyLvzWeoVWEpRemrDQ/videos)
- Quiz Questions - [Quiz Questions](https://www.quiz-questions.net/)
