"use strict";

module.exports = function (io) {
  setInterval(() => {
    const min = 20;
    const max = 250;
    let value = Math.floor(Math.random() * (max - min + 1)) + min;
    io.emit("speed-change", {
      type: "speed",
      data: {
        value: value,
        unit: "MPH"
      }
    });
  }, 8000);

  let mileageValue;
  setInterval(() => {
    const minMileage = 100000.00;
    const maxMileage = 999999.99;
    if (mileageValue < maxMileage) {
      mileageValue = Math.round((mileageValue + 0.78) * 100) / 100;
    } else {
      mileageValue = minMileage;
    }
    io.emit("mileage-change", {
      type: "mileage",
      data: {
        value: mileageValue,
        unit: "MI"
      }
    });
  }, 1000);

  setInterval(() => {
    const min = 20;
    const max = 250;
    let value = Math.floor(Math.random() * (max - min + 1)) + min;
    io.emit("left-front-change", {
      type: "left-front",
      value: value
    });
  }, 3000);

  setInterval(() => {
    const min = 20;
    const max = 250;
    let value = Math.floor(Math.random() * (max - min + 1)) + min;
    io.emit("left-rear-change", {
      type: "left-rear",
      value: value
    });
  }, 2000);

  setInterval(() => {
    const min = 20;
    const max = 250;
    let value = Math.floor(Math.random() * (max - min + 1)) + min;
    io.emit("right-front-change", {
      type: "right-front",
      value: value
    });
  }, 4000);

  setInterval(() => {
    const min = 20;
    const max = 250;
    let value = Math.floor(Math.random() * (max - min + 1)) + min;
    io.emit("right-rear-change", {
      type: "right-rear",
      value: value
    });
  }, 5000);

};