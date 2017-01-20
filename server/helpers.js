"use strict";

let helperModule = {};

helperModule.currentAccountMocked = null;

helperModule.getRandomItemsFromArray = function (array, itemsCount) {
	let resultArray = [];
	let arrayCopy = Object.assign([], array);
	for (let i = 0; i < itemsCount; i++) {
		let item = arrayCopy[Math.floor(Math.random() * arrayCopy.length)];
		arrayCopy.splice(arrayCopy.indexOf(item), 1);
		resultArray.push(item);
	}
	return resultArray;
};

helperModule.getAllowedAppsArray = function ( array ) {
	let arrayCopy = null;
	if(helperModule.currentAccountMocked){
		arrayCopy = Object.assign([], array);
	} else{
		arrayCopy = Object.assign([], array.filter(function ( element ) {
			return !element.authRequired;
		}));
	}
	return arrayCopy;
};

helperModule.getRandomNumber = function(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
};

module.exports = helperModule;