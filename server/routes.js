"use strict";

const conf = require("./conf");

module.exports = function (app) {
  //REST METHODS
  app.get('/', function (req, res) {
    res.json({"str": "Hello World!"});
  });

  app.post('/login', function (req, res) {
    // you might like to do a database look-up or something more scalable here
    if (req.body.username && req.body.username === 'user' && req.body.password && req.body.password === 'pass') {
      req.session.authenticated = true;
      res.json({token: conf.token});
    } else {
      req.flash('error', 'Username and password are incorrect');
      res.sendStatus(403);
    }
  });

  app.get('/logout', function (req, res, next) {
    delete req.session.authenticated;
    res.sendStatus(200);
  });
};