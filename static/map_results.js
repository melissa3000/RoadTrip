"use strict";




function initMap() {

  var boxpolys = null;
  var directions;
  var distance;
  var googleMarkers = [];

  // creates map with hard coded center point with marker at Oakland
  var oakland = {lat: 37.8044, lng: -122.2711};
  
  //centers map template at oakland
  var mapOptions = {
    zoom: 8,
    center: oakland
  };

  var map = new google.maps.Map(document.getElementById('map'), mapOptions);
  
  


 //------------------Search by Radius------------------------------------------ 

  // //allows places search with hard coded variables built into request //later use .value to set each element from the DOM
  // var request = {
  //   location: oakland,
  //   radius: 500,
  //   types: ['restaurant']
  // };

  // //radar search allows a search for places within a search radius by keyword or type, will return up to 200 objects
  // var service = new google.maps.places.PlacesService(map);
  // service.radarSearch(request, callback);





  //---------------------Create InfoWindows----------------------------------

  


  var infowindow = new google.maps.InfoWindow();

  //creates map marker at Oakland - location currently hard coded in
  var marker = new google.maps.Marker({
    position: oakland,
    map: map,
    title: 'Oakland, CA'
  });


  //creates window on marker click that displays custom text  (useful later when incorporating yelp)
  // var windowContent = 'infowindow content goes here'; // double check google documentaion on this syntax when it becomes complicated

  // var infowindow = new google.maps.InfoWindow({
  //   content: windowContent
  // });


  //when marker clicked, show info window 
  // marker.addListener('click', function() {
  //   infowindow.open(map, marker);
  // });
    


  //------------------Create Markers based on Places Search----------------

  // function callback(results, status) {
  //   if (status === google.maps.places.PlacesServiceStatus.OK) {
  //     for (var i = 0; i < results.length; i++) {
  //       var place = results[i];
  //     createMarker(results[i]);
  //     }
  //   }
  //   else
  //     console.log('error: '+ status);
  // }

  // function createMarker(place) {
  //   var placeLoc = place.geometry.location;
  //   var marker = new google.maps.Marker({
  //     map: map,
  //     position: place.geometry.location
  //   });

  //   google.maps.event.addListener(marker, 'click', function() {
  //     service.getDetails(place, function(result, status) {
  //       if (status !== google.maps.places.PlacesServiceStatus.OK) {
  //         console.error(status);
  //         return;
  //       }
  //     infowindow.setContent(result.name);
  //     infowindow.open(map, marker);
  //   });
  // });
  // }


//------------------display directions----------------------------------

  //Creates path overlay on map from start to end location, hard coded for stinson beach to petaluma
  function displayDirections() {

    var stinsonBeach = {lat:37.9005, lng: -122.6444};
    var petaluma = {lat: 38.2324, lng: -122.6367};

    var request = {
      origin: stinsonBeach, // start
      desintation: petaluma, // end
      travelMode: 'DRIVING'
    };

    var directionsService = new google.maps.DirectionsService;
    directionsService.route(request, function(response, status) {
      if (status === google.maps.DirectionsStatus.OK) {
        directionsDisplay.setDirections(response);
      } else {
        window.alert('Directions request failed due to ' + status);
      }
    });

    var directionsDisplay = new google.maps.DirectionsRenderer;
    directionsDisplay.setMap(map);
  }

  // displayDirections();


  //incorporate later when start and end are taken from DOM
  // var start = document.getElementById('start').value;
  // var end = document.getElementById('end').value;
//-------------------------------------------------------------------------


}

// set var for directionService from maps (directions??)
// set var for directsions Renderer from directionService


  //creates new routebox object using Route Boxer library
  // var routeBoxer = new RouteBoxer();

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

initMap();



