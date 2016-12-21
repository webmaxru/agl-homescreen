"use strict";

module.exports = function (io, socket) {

  let currentAccountMocked;

  //agl-identity-agent/login
  const login = function (req) {
    io.sockets.emit("logged-in", {
      type: "account logged in",
      data: {
        account: {
          id: req.id,
          username: 'Some Cool Username',
          firstname: 'John',
          lastname: 'Doe'
        }
      }
    });
  };

  //agl-identity-agent/logout
  const logout = function () {
    currentAccountMocked = null;
    io.sockets.emit("logged-out", {
      type: "account logged out",
      data: null
    });
  };

  socket.on("login", login);      //agl-identity-agent/login
  socket.on("logout", logout);    //agl-identity-agent/logout

};