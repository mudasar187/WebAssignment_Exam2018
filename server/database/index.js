//Connect to Mongo database
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

// Connect to a database on which environment is running
const mongoURI = require("../config/keys").mongoURI;

mongoose.connect(
    mongoURI,
    { useNewUrlParser: true }
    ).then(
    () => {
        /** ready to use. The `mongoose.connect()` promise resolves to undefined. */ 
        console.log('Connected to Mongo');
    },
    err => {
         /** handle initial connection error */ 
         console.log('Error connecting to Mongo: ')
         console.log(err);
        }
  );


module.exports = mongoose.connection