"use strict";

module.exports = {

	getRandomItemsFromArray: function (array, itemsCount) {
		let resultArray = [];
		let arrayCopy = Object.assign([], array);
		for (let i = 0; i < itemsCount; i++) {
			let item = arrayCopy[Math.floor(Math.random() * arrayCopy.length)];
			arrayCopy.splice(arrayCopy.indexOf(item), 1);
			resultArray.push(item);
		}
		return resultArray;
	},

	getRandomNumber: function(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}
	
};