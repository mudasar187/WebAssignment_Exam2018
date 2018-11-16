if (process.env.NODE_ENV === "production") {
  module.exports = require("./configureStore.prod");
} else if (process.env.NODE_ENV === "docker") {
  module.exports = require("./configureStore.prod");
} else {
  module.exports = require("./configureStore.dev");
}

/**
  This is based on which environment you are running on,
  because in development you should get access to Redux DevTools,
  in production you should be allowed to see Redux DevTools
 */