"use strict";

var map;
var boxpolys = null;
var directions;
var routeBoxer = null;
var distance;
var service;
var googleMarkers = [];


// console.log("I got to the js page");

function initMap() {
  var oakland = {lat: 37.8044, lng: -122.2711};
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 8,
    center: oakland
  });

  var windowContent = 'infowindow content goes here'; // double check google documentaion on this syntax when it becomes complicated

  var infowindow = new google.maps.InfoWindow({
    content: windowContent
  });

  var marker = new google.maps.Marker({
    position: oakland,
    map: map,
    title: 'Oakland, CA'
  });

  marker.addListener('click', function() {
    infowindow.open(map, marker);
  });
}

initMap();

// get map element by id, set to var map, param mapoptions (function above)
// set variable service using pacesService on the map from google places

// routeBoxer = new routeBoxer();

// set var for directionService from maps (directions??)
// set var for directsions Renderer from directionService




// write function to calculate route

//Clear previous route boxes from the map (from library - verify this)
// clearBoxes();

// do I need to covertdistanct to km from miles for routeBoxer?

// set variable request to pull origin, desintation and travelMode from DOM using element ID and maps travel mode (Driving) from API docs


// make directionService route request, should have an if to check that status relsults are ok before continuing then render set directions using results

// check reference code - what does their path do - result.routes[0].overiew_path; - is this from the library? Box around the 
// overview path of the first route, set path, boxes (using routeBoxer.box(path, distance);), drawBoxes (write this), findPlaces(write this),
// give laert if query failed + status



// write function to draw the array of boxes as polylines on teh map
// make a new Array of boxes.length
// iterate over boxpolys one at a time,
// for each boxpolys -- new google.maps.Rectangle ({set bounds, fill opacity, stroke opacity, stroke color, stroke wieght, map})




// write function to findPlaces(searchIndex)
// set variables for type, keyword, name from the DOM value -- hard code just one of these for MVP, read more later
// spend more time reading/understanding this code from reference



// write function to clearBoxes() currently on map
// if boxpolys not null, iterate through them and for each.setMap(null)
//   otherwise, boxpolys set to null


// write function createMarker(place)
// create variable for placeLocation using geometry
// use google for reference to add place icons/markers
// set variable for marker and set map, icon, position
// later add event listener to give yelp results, now use googel for popups/ getDetails - check google docs
// otherwise, double check reference code for more info



