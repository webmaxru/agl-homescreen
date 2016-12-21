"use strict";
const conf = require("./conf");

const express = require("express");
const app = express();
const http = require("http").Server(app);
const session = require('express-session');
const bodyParser = require('body-parser');
const io = require("socket.io")(http);
let connections = [];

function checkAuth(req, res, next) {
  console.log('checkAuth ' + req.url);

  // don't serve those not logged in
  if (req.url !== '/login' && (!req.session || !req.session.authenticated)) {
    res.render('unauthorised', {status: 403});
    return;
  }

  next();
}

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}));
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(checkAuth);
app.set('views', __dirname + '/views');
app.set('view engine', 'pug');

//WEBSOCKET DECLARATION
io.sockets.on("connection", (socket) => {
  connections.push(socket);
  console.log(`User connected! ${connections.length} socket(s) are connected now`);

  socket.on("disconnect", function () {
    connections.splice(connections.indexOf(socket), 1);
    console.log(`User disconnected! ${connections.length} socket(s) are connected now`);
  });

  //WEBSOCKET CONTROLLERS
  require('./services/hvac.js')(io);
  require('./services/afm-main.js')(io, socket);
  require('./services/agl-identity.js')(io, socket);
});

require('./routes.js')(app);

http.listen(conf.port, () => {
  console.log(`started on port ${conf.port}`);
});