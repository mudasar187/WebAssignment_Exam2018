switch (process.env.NODE_ENV) {
  case "production": {
    module.exports = require("./keys_prod");
    break;
  }
  case "development": {
    module.exports = require("./keys_dev");
    break;
  }
}
/*
 which websockets url to use based on which environment you are running on, 
 important to read on file keys_prod.js if you want to deploy to Heroku
 */
