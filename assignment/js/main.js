/* =====================
 Copy your code from Week 4 Lab 2 Part 2 part2-app-state.js in this space
===================== */
/* =====================
  Lab 2, part 2: application state

  Spatial applications aren't typically as simple as putting data on a map. In
  addition, you'll usually need to change the stored data in response to user
  input. This lab walks you through writing a set of functions that are capable
  of building an interactive application.

  First, we'll need to write a function for loading points onto the map. Choose
  any dataset from part1 and write a function here to download it, parse it,
  make it into markers, and plot it. You'll know you've succeeded when you can
  see markers on the map.

  NOTE 1: When we have added markers to the map in the past, we have used a line like:

       L.marker([50.5, 30.5]).addTo(map);

       This is accomplishing two goals. L.marker([50.5, 30.5]) makes a marker
       and .addTo(map) adds that marker to the map. In this task, you will be
       asked to create separate functions: one to create markers and one to
       add them to the map.

  NOTE 2: These functions are being called for you. Look to the bottom of this file
       to see where and how the functions you are defining will be used. Remember
       that function calls (e.g. func();) which are equal to a value (i.e. you
       can set a var to it: var result = func();) must use the 'return' keyword.
       var justOne = function() {
         return 1;
       }
       var one = justOne();
===================== */

var parseData = function(data) {
  return JSON.parse(data);};

var makeMarkers = function(data) {
  return _.map(data, function(obj){ return L.marker([obj.Y, obj.X]);});
};

var plotMarkers = function(data) {
  return _.each(data, function(obj){ obj.addTo(map); });
};

var removeMarkers = function(data) {
  return _.each(data, function(obj) {
    map.removeLayer(obj);
  });
};

var map = L.map('map', {
  center: [39.9522, -75.1639],
  zoom: 14
});
var Stamen_TonerLite = L.tileLayer('http://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}.{ext}', {
  attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  subdomains: 'abcd',
  minZoom: 0,
  maxZoom: 20,
  ext: 'png'
}).addTo(map);


$(document).ready(function() {

// Enable all elements

$('*').prop('disabled',false);

// Grab user inputs for later

$('button#submit-button').click(function(x) {
    var userInputs = {
      inputURL: $('#input-URL').val(),
      latitude: $('#input-Latitude').val(),
      longitude: $('#input-Longitude').val(),
      radius: $('#input-radius').val()
    };
    console.log(userInputs);

    var downloadData = $.ajax(userInputs.inputURL);
    var parseData = function(data) {
      return JSON.parse(data);};
    var makeMarkers = function(data) {
      return _.map(data, function(obj){ return L.marker([obj.Y, obj.X]).bindPopup(obj.NAME + " // " + obj.ADDRESS);});
    };
    var plotMarkers = function(data) {
      return _.each(data, function(obj){ obj.addTo(map); });
    };


    //================ STILL WORKING ON THIS PART!!!!!!!

//     var radiusSearch = function distance(lat1,lon1,lat2,lon2){
//   var R = 6371; // km
//   return Math.acos(Math.sin(lat1)*Math.sin(lat2) +
//                   Math.cos(lat1)*Math.cos(lat2) *
//                   Math.cos(lon2-lon1)) * R;
// }
//
//     function markerFilter(userInputs.latitude, userInputs.longitude, userInputs.radius){
//        return function markersWithinCircle(data){
//           return distance(circleCenterLatitude, circleCenterLongitude, data.lat, data.lon) <= circleRadiusInKm;
//        }
//     }
//
//
//     var tweets = getSomeTweets();
//     var myFilter = makeTweetFilter(circle.lat, circle.lon, circle.radiusInMi);
//     var tweetsWithinCircle = _.filter(tweets, myFilter);
//     //==============



    downloadData.done(function(data) {
      var parsed = parseData(data);
      var markers = makeMarkers(parsed);
      plotMarkers(markers);
      var circle = L.circle([userInputs.latitude, userInputs.longitude], userInputs.radius*1000, {
            color: 'blue',
            fillColor:  "#ff8080",
            fillOpacity: 0.5
          }).addTo(map);

      $("button#clear-button").click(function() {
        removeMarkers(markers);
        map.removeLayer(circle);
      });
    });




/* =====================
  Define the function removeData so that it clears the markers you've written
  from the map. You'll know you've succeeded when the markers that were
  previously displayed are immediately removed from the map.

  In Leaflet, the syntax for removing one specific marker looks like this:

  map.removeLayer(marker);

  In real applications, this will typically happen in response to changes to the
  user's input.
===================== */


/* =====================
  Optional, stretch goal
  Write the necessary code (however you can) to plot a filtered down version of
  the downloaded and parsed data.

  Note: You can add or remove from the code at the bottom of this file.
===================== */
/* =====================
 CODE EXECUTED DOWN HERE!
===================== */


});

/* =====================
 Leaflet setup
===================== */


});
