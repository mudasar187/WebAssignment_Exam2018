
## WebDevelopment and API Design - PG6300
  

## Exam Fall 2018


## QuizGame Application
  
A web-based application where multiple users can join quiz and play against others using WebSockets

#### Travis
(Add travis when repo is public)

### - How to run
All these commands can be run from root folder:

Docker
- build -> `docker-compose build`
- run -> `docker-compose up` , if you want run in detached mode `docker-compose up -d`
	- Verify that all nodes are up `docker-compose ps`
	- If `web_app`exit, run again `docker-compose up -d`
- stop -> `docker-compose -f docker-compose.yml down --rmi all`
 
Local (optional)
- install dependencies -> `npm install`
- connected to mongodb on local machine -> `npm run local-dev`
- connected to mongodb on [www.mlab.com](www.mlab.com) (currently there is my own account, if you want to use your own, create one and change url in file `/server/config/keys_dev.js`





### Tools
- Express [https://expressjs.com/](https://expressjs.com/)
- React [https://reactjs.org/](https://reactjs.org/)
- Redux [https://redux.js.org/](https://redux.js.org/)
- Passport for session and HTTP authentication to backend [http://www.passportjs.org/](http://www.passportjs.org/)
- JSONWebToken to create token for each users so they can communicate over websockets 
- ws (WebSockets) [https://www.npmjs.com/package/ws](https://www.npmjs.com/package/ws)
- fullfør dette !!!


### HTTP methods

Auth:
- /POST -> /signup (user can sign up)
- /POST -> /login (user can login)
- /GET -> /check (check user auth)
- /POST -> /logout (user can log out)

Quizzes:
- /GET -> /stats (get user stats sorted)
- /GET -> / (get quizzes)


### Functionality




