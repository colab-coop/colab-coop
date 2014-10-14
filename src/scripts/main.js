/* global require, console, window, document */

var square = require('./square');

console.log('main.js is here');

window.onload = function () {
  var elm = document.getElementById('jstest');
  var rand = Math.random();
  elm.innerHTML = '<h3>this h3 provided by main.js, who says that Math.random() == ' + rand + ' which does a require("./square") and uses it with that random number: square(rand) == ' + square(rand) + '</h3>';
  console.log('elm: ', elm);
};