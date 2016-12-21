"use strict";

module.exports = {
  port: 5000,
  token: 'secret_jwt_token',
  mockApps: [
    { id: 'hvac', name: 'HVAC', isRunning: false}, 
    { id: 'navigation', name: 'Navigation', isRunning: false}, 
    { id: 'phone', name: 'Phone', isRunning: false}, 
    { id: 'radio', name: 'Radio', isRunning: false}, 
    { id: 'multimedia', name: 'Multimedia', isRunning: false}, 
    { id: 'connectivity', name: 'Connectivity', isRunning: false}, 
    { id: 'dashboard', name: 'Dashboard', isRunning: false}, 
    { id: 'settings', name: 'Settings', isRunning: false}, 
    { id: 'point', name: 'Point of Interest', isRunning: false}
  ]
};