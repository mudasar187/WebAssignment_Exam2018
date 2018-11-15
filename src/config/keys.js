switch (process.env.NODE_ENV) {
  case "production": {
    module.exports = require("./keys_heroku");
    break;
  }
  case "development": {
    module.exports = require("./keys_dev");
    break;
  }
  case "docker": {
    module.exports = require("./keys_docker");
    break;
  }
}
