## WebDevelopment and API Design - PG6300

  
## Exam Fall 2018
  
  
## QuizGame Application

A web-based application where multiple users can join quiz and play against others using WebSockets. When a user sign up and join a game he/she need to wait until room is full before the game start. Different quizzes can have different requirement for max players. When the game start, a user have 10 seconds to answer a question before the next question show up. If both finish the game they achive the points and the points get added to their totalpoints which is showed in leaderboard. If a user quit the game before quiz is finished all users will ne notified. This means if a user click `Quit` button or close the browser by hitting `X`, and this will also make user loose all their points because they did not finish the game.
The points is based on the seconds they use to answer the question. If the question take 3 seconds to answer, user get 7 points, 10 seconds round - 3 seconds to answer = 7 points.

On the leaderboard their points is listed up in descending sort, with the player with most points on top.  
  

#### Travis
Also used travis to check the build.
(Add travis when repo is public)

  
### How to run

All these commands can be run from root folder:
  
##### - Docker
- run -> `docker-compose up` , if you want run in detached mode `docker-compose up -d`
	- Note: Note: If are running windows you may have to restart Docker and run `docker-compose 	up -d` [again (read this issue)](https://github.com/docker/for-win/issues/573#issuecomment-301513210) 
    due to a [bug](https://github.com/docker/for-win/issues/573) in the mongoDB container.
- verify that all nodes are up `docker-compose ps`
- if `web_app`exit, run again `docker-compose up -d`
- application will be accessible at [http://localhost:8080/](http://localhost:8080/)
	- you need to sign up a new user before you can play game
	- default quizzes are added in the database
- stop -> `docker-compose -f docker-compose.yml down --rmi all`


##### - Local (optional)
- install dependencies -> `npm install`
- connected to mongodb on local machine -> `npm run local-dev`
- connected to mongodb on [www.mlab.com](www.mlab.com) (currently there is my own account, if you want to use your own, create one and change url in file `/server/config/keys_dev.js`


##### - Heroku
- application also deployed to [https://www.heroku.com/](https://www.heroku.com/)
- accessible on this url -> [QuizGame](www.link.com)
- keep in mind that you need to wait a little bit before page is shown up, because Heroku servers tend to go in hibernate state after 30 minutes of inactivity
  
  

### Tools

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
-   **express-session** - a session middleware
- **connect-mongo** (optional) - MongoDB session store for [Connect](https://github.com/senchalabs/connect) and [Express](http://expressjs.com/)
	- if you want to store sessions in database, then you can just enable it by remove line comment in `server.js` file at line 30.
- **Nodemon** - is a utility that will monitor for any changes in your source and automatically restart your server. Perfect for development.
- **Concurrently** - Run multiple commands concurrently. Like `npm run watch-js & npm run watch-less` but better.


### HTTP methods
Auth:
- /POST -> /signup (user can sign up)
- /POST -> /login (user can login)
- /GET -> /check (check user auth)
- /POST -> /logout (user can log out)

Quizzes:
- /GET -> /stats (get user stats sorted)
- /GET -> / (get quizzes)


### Folder structure

![skjermbilde 2018-11-18 kl 12 27 53](https://user-images.githubusercontent.com/29889280/48671763-83acdd80-eb2d-11e8-91e4-1df671bbbf75.png)

- **public** - holds the HTML template of our app
- **config** - environment configs
- **database** - models and database connection
- **passport** - passport authentication
- **routes** - api routes
- **seeder** - defaultdata.json and a file which helps us adding these to database when running application
- **websockets** -   connection model and management for connections


### Evaluation

