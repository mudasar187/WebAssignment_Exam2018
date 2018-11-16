module.exports = {
  webSocketURL: "ws://" + window.location.host
};
/*
  Note that we have window.location.host
  
  What does window.location.host does?

  Returns an object of type StringString
  The hostname and port number.
  For example, http://example.org:8080/ would return the host string of example.org:8080

  If we want to deploy app to Heroku we need to change from "ws://" to "wss://"
  if you only have "ws://" it will not work on Heroku

  "wss://" This adds a security layer over your communication, and Heroku expecting this security layer to make websockets work on heroku
*/