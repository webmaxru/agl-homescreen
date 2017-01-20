"use strict";

let speedInterval;
let milleageInterval;
let leftFrontInterval;
let leftRearInterval;
let rightFrontInterval;
let rightRearInterval;

module.exports = function (wss, ws) {

  return {
    turnOn: function () {
      speedInterval = setInterval(() => {
        const min = 20;
        const max = 250;
        let value = Math.floor(Math.random() * (max - min + 1)) + min;
        ws.send(JSON.stringify({
          type: "speed-change",
          value: value,
        }));
      }, 8000);

      let mileageValue;
      milleageInterval = setInterval(() => {
        const minMileage = 100000.00;
        const maxMileage = 999999.99;
        if (mileageValue < maxMileage) {
          mileageValue = Math.round((mileageValue + 0.78) * 100) / 100;
        } else {
          mileageValue = minMileage;
        }
        ws.send(JSON.stringify({
          type: "mileage-change",
          value: mileageValue,
        }));
      }, 1000);

      leftFrontInterval = setInterval(() => {
        const min = 20;
        const max = 250;
        let value = Math.floor(Math.random() * (max - min + 1)) + min;
        ws.send(JSON.stringify({
          type: "left-front-change",
          value: value
        }));
      }, 3000);

      leftRearInterval = setInterval(() => {
        const min = 20;
        const max = 250;
        let value = Math.floor(Math.random() * (max - min + 1)) + min;
        ws.send(JSON.stringify({
          type: "left-rear-change",
          value: value
        }));
      }, 2000);

      rightFrontInterval = setInterval(() => {
        const min = 20;
        const max = 250;
        let value = Math.floor(Math.random() * (max - min + 1)) + min;
        ws.send(JSON.stringify({
          type: "right-front-change",
          value: value
        }));
      }, 4000);

      rightRearInterval = setInterval(() => {
        const min = 20;
        const max = 250;
        let value = Math.floor(Math.random() * (max - min + 1)) + min;
        ws.send(JSON.stringify({
          type: "right-rear-change",
          value: value
        }));
      }, 5000);
    },
    turnOff: function () {
      clearInterval(speedInterval);
      clearInterval(milleageInterval);
      clearInterval(leftFrontInterval);
      clearInterval(leftRearInterval);
      clearInterval(rightFrontInterval);
      clearInterval(rightRearInterval);
    }
  };

};