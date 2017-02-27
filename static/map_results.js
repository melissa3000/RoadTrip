"use strict";

$(document).ready(function() {

function initialize() {
  // intial map hard coded to center at Oakland
  var oakland = {lat: 37.8044, lng: -122.2711};

  var mapOptions = {
    center: oakland,
    zoom: 8
  };

  var map = new google.maps.Map(document.getElementById("map"), mapOptions);
  var service = new google.maps.places.PlacesService(map);

//s and e - where do they come from?
  drawPath(start, end, map);
}


function drawPath(start, end, map) {

  var endLat;
  var startLat;
  var driveDistance; // in meters
  var driveDuration; // drive time in seconds

  //directionsService makes a directions request from Google maps
  //directionsRenderer has Google maps render the directions it just returned
  var directionService = new google.maps.DirectionsService();
  var directionsRenderer = new google.maps.DirectionsRenderer({
    map: map
  });


  //search parameters for draw path request: start point, end point, travel method
  var pathRequest = {
    origin: start,
    destination: end,
    travelMode: google.maps.DirectionsTravelMode.DRIVING
  };

  // Make the directions request, if the status is ok, create a path and
  // routeBox search boxes along the path
  directionService.route(pathRequest, function(result, status) {
    if (status == google.maps.DirectionsStatus.OK) {
      directionsRenderer.setDirections(result);


        //FIX THIS___________________________
        //required to adjust box iteration later (independent of direction of travel)
        endLat = result.routes[0].legs[0].end_location.lng();
        startLat = result.routes[0].legs[0].start_location.lng();

        // required to capture route distance and drive time for additional calculations
        driveDistance = result.routes[0].legs[0].distance.value;
        driveDuration = result.routes[0].legs[0].duration.value;

        var distance;

        // sets search box size to depending on length of route path (in km)
        if (driveDuration < 5400) {
          distance = 5.0;
        } else if (driveDuration > 5401 && driveDuration < 10800) {
          distance = 10.0;
        } else if (driveDuration > 10801 && driveDuration < 16200) {
          distance = 15.0;
        } else if (driveDuration > 16201) {
          distance = 20.0;
        }

        //path_overview smooths out the path coordinates
        var path = result.routes[0].overview_path;
        //assigns variable routeBoxer as new object from RouteBoxer library
        var routeBoxer = new RouteBoxer();
        // creates search boxes around the returned path
        var boxes = routeBoxer.box(path, distance);


        //turn on drawBoxes for testing if you want to visualize search boundaries,
        //function is commented out below
        // drawBoxes(boxes, map);

        //since direction request was successful,
        //call findPlaces function with searchIndex zero

        //allows selection of search boxes to adjust based on origin/destation direction
        if (startLat > endLat) {
          findPlaces(0, startLat, endLat, boxes, map, 'restaurant');
          findPlaces(0, startLat, endLat, boxes, map, 'park');
        } else if (endLat > startLat) {
          findPlaces(2, startLat, endLat, boxes, map, 'restaurant');
          findPlaces(2, startLat, endLat, boxes, map, 'park');
        }
      } else {
        alert("Directions query failed: " + status);
      }
  });
}


// Draw the array of boxes as polylines on the map - helpful to visualize search while testing
function drawBoxes(boxes, map) {

  var boxpolys = new Array(boxes.length);

  for (var i = 0; i < boxes.length; i++) {
    boxpolys[i] = new google.maps.Rectangle({
      bounds: boxes[i],
      fillOpacity: 0,
      strokeOpacity: 1.0,
      strokeColor: '#000000',
      strokeWeight: 1,
      map: map
    });
  }
}

function findPlaces(searchIndex, startLat, endLat, boxes, map, type) {
  // debugger;

  // search request is defined as the area bound by each routeBox box,
  // search type is hard coded as restaurant for testing
  var restaurantRequest = {
    bounds: boxes[searchIndex],
    type: type
  };

  var service = new google.maps.places.PlacesService(map);


  service.nearbySearch(restaurantRequest, function(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      for (var i = 0, result; result = results[i]; i++) {
        if (result.rating >= 4.0){
          var marker = createMarker(result, map, service, type);
        }
      }
    }

    //as long as we haven't triggered the query limit, add 1 to the index and search again
    if (status != google.maps.places.PlacesServiceStatus.OVER_QUERY_LIMIT) {
      searchIndex++;
      if (startLat > endLat) {
        if (searchIndex < (boxes.length - 3)) {
          findPlaces(searchIndex, startLat, endLat, boxes, map, type);
        }
      } else if (endLat > startLat) {
          if (searchIndex < boxes.length) {
            findPlaces(searchIndex, startLat, endLat, boxes, map, type);
          }
        }
    }

    else { // delay 1 second and try again
      var tryAgain = setTimeout(function() { findPlaces(searchIndex, startLat, endLat, boxes, map, type); }, 1000);
      // setTimeout("findPlaces(" + searchIndex + ")", 1000);
    }
  });
}

//create markers on each returned place result
function createMarker(place, map, service, type) {
  var placeLoc = place.geometry.location;
  var url;

  if (type == 'park') {
      url = "https://storage.googleapis.com/support-kms-prod/SNP_2752129_en_v0";
      //url: "https://maps.gstatic.com/intl/en_us/mapfiles/markers2/measle_blue.png",
    } else {
    url = "https://maps.gstatic.com/intl/en_us/mapfiles/markers2/measle.png";
  }

  var image = {
    url: url,
    size: new google.maps.Size(7, 7),
    anchor: new google.maps.Point(3.5, 3.5)
    };

  var marker = new google.maps.Marker({
    map: map,
    icon: image,
    position: place.geometry.location
  });


  google.maps.event.addListener(marker, 'click', function() {
    service.getDetails(place, function(placesResult, status) {
      if (status !== google.maps.places.PlacesServiceStatus.OK) {
        console.error(status);
        return;
      }

      // var infowindow = new google.maps.InfoWindow();

      // infowindow.setContent(placesResult.name);
      // infowindow.open(map, marker);

      // // get yelp data
      var params = {
        'term': placesResult.name,
        'type': type
      };

      $.get("/yelp-search", params, function(yelpResult) {

        var markerData = {
          placesResult: placesResult,
          yelpResult: yelpResult,
          map: map,
          type: type,
          marker: marker
        };

       createMarkerInfoWindow(markerData);

      });


    });
  });
}

//------------Save Trips to DB-------------------------------------
function tripAdded(result) {
  console.log('successfuly saved');
}

function addTrip(evt) {
  evt.preventDefault();

  var formInputs = {
    'start': start,
    'end': end,
    'trip_name': $('#trip_name').val()
  };

  $.post("/saved-trips", formInputs, tripAdded );
}


$("#save-trip").on('submit', addTrip);



// //Adds infoWindow with Yelp search results
function createMarkerInfoWindow(markerData) {
  var yelp_rating_graphic = markerData.yelpResult[1];
  var yelp_link = markerData.yelpResult[0];
  var name = markerData.placesResult.name;


  var contentString =
      '</div>' +
      '<h3>' + name + '</h3>'+
      '<p><img src=' + yelp_rating_graphic + '></p>'+
      '<p><a target="blank" href='+ yelp_link + '>Link to Yelp: </a></p>';
    // console.log(contentString);

    var infowindow = new google.maps.InfoWindow({content: contentString});
    infowindow.open(markerData.map, markerData.marker);
    // console.log(yelp_rating_graphic, yelp_link);
}




initialize();

});

