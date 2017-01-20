"use strict";
const conf = require("./../conf");
const helper = require("./../helpers");

let apps = [];

module.exports = function (wss, ws) {

  return {
    getRunnables: function () {
      let allowedAppsArray = helper.getAllowedAppsArray(conf.mockApps);
      const min = 1;
      const max = allowedAppsArray.length;
      apps = helper.getRandomItemsFromArray(allowedAppsArray, max);
      ws.send(JSON.stringify({
        type: "runnables",
        data: {
          apps: apps
        }
      }));
    },

    //afm-main/detail   @todo add logic here
    getDetail: function (id) {
      ws.send(JSON.stringify({
        type: "detail",
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
      }));
    },

    //afm-main/start  @todo add app-start logic here
    startApp: function (appToLaunch) {
      ws.send(JSON.stringify({
        type: "start",
        data: {
          app: appToLaunch
        }
      }));
    },

    //afm-main/once @todo add logic here
    startAppOnce: function (appToLaunch) {
      ws.send(JSON.stringify({
        type: "once",
        data: {
          app: appToLaunch
        }
      }));
    },

    launchApp: function (appId) {          //afm-main/start && //afm-main/once
      let appToLaunch = apps.filter(function (app) {
        return appId == app.id;
      })[0];

      if (appToLaunch) {
        if (appToLaunch.isRunning) {
          this.startAppOnce(appToLaunch);
        } else {
          appToLaunch.isRunning = true;
          this.startApp(appToLaunch);
        }
      } else {
        this.getRunnables();
      }
    }
  };

};