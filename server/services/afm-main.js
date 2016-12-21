"use strict";
const conf = require("./../conf");
const helper = require("./../helper-functions");

module.exports = function (io, socket) {

  let apps = [];

  //afm-main/runnables  @todo add logic here
  const getRunnables = function () {
    const min = 1;
    const max = 9;
    const randomNumber = helper.getRandomNumber(min, max);
    apps = helper.getRandomItemsFromArray(conf.mockApps, randomNumber);
    io.sockets.emit("new-runnables", {
      type: "get runnables apps",
      data: {
        apps: apps
      }
    });
  };

  //afm-main/detail   @todo add logic here
  const getDetail = function (id) {
    io.sockets.emit("new-details", {
      type: "get details about application",
      data: JSON.stringify({
        "id": id,
        "version": helper.getRandomNumber(0, 3) + "." + helper.getRandomNumber(1, 10) + "." + helper.getRandomNumber(1, 99),
        "width": 90,
        "height": 90,
        "name": id,
        "description": 'detail desc about app',
        "shortname": id,
        "author": 'John Doe'
      })
    });
  };

  //afm-main/start  @todo add app-start logic here
  const startApp = function (appToLaunch) {
    io.sockets.emit("app-started", {
      type: "started an app",
      data: {
        app: appToLaunch
      }
    });
  };

  //afm-main/once @todo add logic here
  const startAppOnce = function (appToLaunch) {
    io.sockets.emit("app-once", {
      type: " previous instance of app",
      data: {
        app: appToLaunch
      }
    });
  };


  //EVENT LISTENERS AND TRIGGERS!
  socket.on("send-runnables", getRunnables);        //afm-main/runnables
  socket.on("send-details", getDetail);             //afm-main/detail
  socket.on("launch-app", function (req) {          //afm-main/start && //afm-main/once
    let appToLaunch = apps.filter(function (app) {
      return req.id == app.id;
    })[0];

    if (appToLaunch) {
      if (appToLaunch.isRunning) {
        startAppOnce(appToLaunch);
      } else {
        appToLaunch.isRunning = true;
        startApp(appToLaunch);
      }
    } else {
      getRunnables();
    }
  });

};