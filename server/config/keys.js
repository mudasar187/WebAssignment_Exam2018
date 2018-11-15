switch(process.env.NODE_ENV) {
    case 'production': {
      module.exports = require('./keys_prod');
      break
    }
    case 'development': {
      module.exports = require('./keys_dev');
      break
    }
    case 'docker': {
      module.exports = require('./keys_docker');
      break
    }
    case 'local': {
      module.exports = require('./keys_local');
      break
    }
  }