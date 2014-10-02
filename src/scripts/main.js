/* global require, console, window, document */

var L = require('leaflet');
var square = require('./square');

console.log('main.js is here');

window.onload = function () {
  var elm = document.getElementById('jstest');
  var rand = Math.random();
  elm.innerHTML = '<h3>this h3 provided by main.js, who says that Math.random() == ' + rand + ' which does a require("./square") and uses it with that random number: square(rand) == ' + square(rand) + '</h3>';

  // show a map
  var map = L
        .map('map')
        .setView([42.439761,-76.497681], 15);

  L.Icon.Default.imagePath = 'assets/img';
  L.marker([42.439761,-76.497681]).addTo(map);

  L.tileLayer('http://{s}.tiles.mapbox.com/v3/brodavi.jh04f0pa/{z}/{x}/{y}.png', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 18
  }).addTo(map);

};