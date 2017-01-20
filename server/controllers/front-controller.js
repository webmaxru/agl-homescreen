"use strict";

module.exports = function (wss, ws, req) {
  const afmMainController = require('./afm-main')(wss, ws);
  const aglIdentityController = require('./agl-identity')(wss, ws);
  const hvacController = require('./hvac')(wss, ws);

  if (req.api) {
    let enterPoint = req.api.split('/');
    let controller = enterPoint[0];
    let action = enterPoint[1];

    switch (controller) {
      case 'afm-main':
        switch (action) {
          case 'runnables':
            afmMainController.getRunnables();
            break;
          case 'detail':
            afmMainController.getDetail(req.appId);
            break;
          case 'start':
            afmMainController.launchApp(req.appId);
            break;
          default:
            throw new Error('No such an action');
        }
        break;
      case 'agl-identity':
        switch (action) {
          case 'login':
            aglIdentityController.login(req.data);
            break;
          case 'logout':
            aglIdentityController.logout();
            break;
          default:
            throw new Error('No such an action');
        }
        break;
      case 'hvac':
        switch (action) {
          case 'on':
            hvacController.turnOn();
            break;
          case 'off':
            hvacController.turnOff();
            break;
          default:
            throw new Error('No such an action');
        }
        break;
      default:
        throw new Error('No such a controller');
    }
  } else {
    throw new Error("Api is not provided in request");
  }
};