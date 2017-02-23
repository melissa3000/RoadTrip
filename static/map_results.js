"use strict";





// function initMap() {

//   var boxpolys = null;
//   var directions;
//   var distance;
//   var googleMarkers = [];

//   // creates map with hard coded center point with marker at Oakland
//   var oakland = {lat: 37.8044, lng: -122.2711};

//   //centers map template at oakland
//   var mapOptions = {
//     zoom: 8,
//     center: oakland
//   };

//   var map = new google.maps.Map(document.getElementById('map'), mapOptions);




 //------------------Search by Radius------------------------------------------

//   //allows places search with hard coded variables built into request //later use .value to set each element from the DOM
  // var request = {
  //   location: oakland,
  //   radius: 500,
  //   types: ['restaurant']
  // };

//   //radar search allows a search for places within a search radius by keyword or type, will return up to 200 objects
  // var service = new google.maps.places.PlacesService(map);
  // service.radarSearch(request, processRadarResults);





//   //---------------------Create InfoWindows----------------------------------




//   var infowindow = new google.maps.InfoWindow();

//   // //creates map marker at Oakland - location currently hard coded in
//   var marker = new google.maps.Marker({
//     position: oakland,
//     map: map,
//     title: 'Oakland, CA'
//   });


//   //creates window on marker click that displays custom text  (useful later when incorporating yelp)
//   var windowContent = 'infowindow content goes here'; // double check google documentaion on this syntax when it becomes complicated

//   var infowindow = new google.maps.InfoWindow({
//     content: windowContent
//   });


//   //when marker clicked, show info window
//   marker.addListener('click', function() {
//     infowindow.open(map, marker);
//   });



//   //------------------Create Markers based on Places Search----------------

  // function processRadarResults(results, status) {
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


// //------------------display directions----------------------------------

 //Creates path overlay on map from start to end location, hard coded for stinson beach to petaluma
//   function displayDirections() {

//     var stinsonBeach = {lat:37.9005, lng: -122.6444};
//     var petaluma = {lat: 38.2324, lng: -122.6367};

//     var request = {
//       origin: stinsonBeach, // start
//       destination: petaluma, // end
//       travelMode: 'DRIVING'
//     };

//     var directionsService = new google.maps.DirectionsService;
//     directionsService.route(request, function(response, status) {
//       if (status === google.maps.DirectionsStatus.OK) {
//         directionsDisplay.setDirections(response);
//       } else {
//         window.alert('Directions request failed due to ' + status);
//       }
//     });

//     var directionsDisplay = new google.maps.DirectionsRenderer;
//     directionsDisplay.setMap(map);
//   }

//   displayDirections();

// }
//   //incorporate later when start and end are taken from DOM
//   // var start = document.getElementById('start').value;
//   // var end = document.getElementById('end').value;

// initMap();







// --------------Full function to return search results along path------------------------



// function initialize() {
//   // intial map hard coded to center at Oakland
//   var oakland = {lat: 37.8044, lng: -122.2711};

//   var mapOptions = {
//     center: oakland,
//     zoom: 8
//   };

//   var map = new google.maps.Map(document.getElementById("map"), mapOptions);
//   var service = new google.maps.places.PlacesService(map);

//   //assigns variable routeBoxer as new object from RouteBoxer library
//   var routeBoxer = new RouteBoxer();

//   //directionsService makes a directions request from Google maps
//   //directionsRenderer has Google maps render the directions it just returned
//   var directionService = new google.maps.DirectionsService();
//   var directionsRenderer = new google.maps.DirectionsRenderer({
//     map: map
//   });

//   drawPath();

//   var boxes;

//   function drawPath() {

//     var distance = 5.0; // sets search box size to 5km from route path

//     //search parameters for draw path request: start point, end point, travel method
//     var pathRequest = {
//       origin: {lat: 37.8044, lng: -122.2711}, // hard coded to oakland for testing
//       destination: {lat: 38.2324, lng: -122.6367}, // hard coded to petaluma for testing
//       travelMode: google.maps.DirectionsTravelMode.DRIVING
//     };

//     // Make the directions request, if the status is ok, create a path and
//     // routeBox search boxes along the path
//     directionService.route(pathRequest, function(result, status) {
//       if (status == google.maps.DirectionsStatus.OK) {
//         directionsRenderer.setDirections(result);

//         //path_overview smooths out the path coordinates
//         var path = result.routes[0].overview_path;
//         // creates search boxes around the returned path
//         boxes = routeBoxer.box(path, distance);

//         //turn on drawBoxes for testing if you want to visualize search boundaries,
//         //function is commented out below
//         // drawBoxes();

//         //since direction request was successful,
//         //call findPlaces function with searchIndex zero
//         findPlaces(0);
//       } else {
//         alert("Directions query failed: " + status);
//       }
//     });

//   }

//   // Draw the array of boxes as polylines on the map - helpful to visualize search while testing
//   // function drawBoxes() {
//   //   var boxpolys = new Array(boxes.length);
//   //   for (var i = 0; i < boxes.length; i++) {
//   //     boxpolys[i] = new google.maps.Rectangle({
//   //       bounds: boxes[i],
//   //       fillOpacity: 0,
//   //       strokeOpacity: 1.0,
//   //       strokeColor: '#000000',
//   //       strokeWeight: 1,
//   //       map: map
//   //     });
//   //   }
//   // }


//   function findPlaces(searchIndex) {

//     // search request is defined as the area bound by each routeBox box,
//     // search type is hard coded as restaurant for testing
//     var radarRequest = {
//       bounds: boxes[searchIndex],
//       type: 'restaurant'
//     };

//     //radarSearch allows a 'type' search within a given radius,
//     // if search is successful, create a marker for each result.
//     // If not, set Timeout to allow a delay and search again due to query limits
//     service.radarSearch(radarRequest, function(results, status) {
//       if (status == google.maps.places.PlacesServiceStatus.OK) {
//         // for (var i = 0; i < length.results; i++) {
//         for (var i = 0, result; result = results[i]; i++) {
//           var marker = createMarker(result);
//         }
//       }
//       //as long as we haven't triggered the query limit, add 1 to the index and search again
//       if (status != google.maps.places.PlacesServiceStatus.OVER_QUERY_LIMIT) {
//         searchIndex++;
//         if (searchIndex < boxes.length)
//           findPlaces(searchIndex);
//       } else { // delay 1 second and try again
//         setTimeout("findPlaces(" + searchIndex + ")", 1000);
//       }

//     });
//   }


//   //create markers on each returned place result
//   function createMarker(place) {
//     var placeLoc = place.geometry.location;

//     var image = {
//       url: "https://maps.gstatic.com/intl/en_us/mapfiles/markers2/measle.png",
//       size: new google.maps.Size(7, 7),
//       anchor: new google.maps.Point(3.5, 3.5)
//     };

//     var marker = new google.maps.Marker({
//       map: map,
//       icon: image,
//       position: place.geometry.location
//     });

//     var infowindow = new google.maps.InfoWindow();

//     google.maps.event.addListener(marker, 'click', function() {
//       service.getDetails(place, function(result, status) {
//         if (status !== google.maps.places.PlacesServiceStatus.OK) {
//           console.error(status);
//           return;
//         }
//       infowindow.setContent(result.name);
//       infowindow.open(map, marker);
//       });
//     });

//   }
// }
// initialize();



//-------------------------------------------------------------------------
//Search updated to Nearby and boxes closest to origin not included in search
//--------------------------------------------------------------------------

function initialize() {
  // intial map hard coded to center at Oakland
  var oakland = {lat: 37.8044, lng: -122.2711};

  var mapOptions = {
    center: oakland,
    zoom: 8
  };

  var map = new google.maps.Map(document.getElementById("map"), mapOptions);
  var service = new google.maps.places.PlacesService(map);

  //assigns variable routeBoxer as new object from RouteBoxer library
  var routeBoxer = new RouteBoxer();

  //directionsService makes a directions request from Google maps
  //directionsRenderer has Google maps render the directions it just returned
  var directionService = new google.maps.DirectionsService();
  var directionsRenderer = new google.maps.DirectionsRenderer({
    map: map
  });

  drawPath();

  var boxes;
  var endLat;
  var startLat;
  var driveDistance; // in meters
  var driveDuration; // drive time in seconds

  function drawPath() {



    // hard coded parameters used for testing / troubleshooting / this works as written
    //search parameters for draw path request: start point, end point, travel method
    // var pathRequest = {
    //   origin: {lat: 37.8044, lng: -122.2711}, // hard coded to oakland for testing
    //   destination: {lat: 38.2324, lng: -122.6367}, // hard coded to petaluma for testing
    //   // destination: {lat: 38.5816, lng: -121.4944}, // hard coded to sacramento for testing
    //   travelMode: google.maps.DirectionsTravelMode.DRIVING
    // };




    //search parameters for draw path request: start point, end point, travel method
    var pathRequest = {
      // origin: document.getElementById('start').value,
      origin: start,
      // origin: 'sacramento',
      // destination: document.getElementById('end').value,
      destination: end,
      // destination: 'oakland',
      travelMode: google.maps.DirectionsTravelMode.DRIVING
    };




    // Make the directions request, if the status is ok, create a path and
    // routeBox search boxes along the path
    directionService.route(pathRequest, function(result, status) {
      if (status == google.maps.DirectionsStatus.OK) {
        directionsRenderer.setDirections(result);

        //required to adjust box iteration later (independent of direction of travel)
        endLat = result.routes[0].legs[0].end_location.lng();
        startLat = result.routes[0].legs[0].start_location.lng();

        // required to capture route distance and drive time for additional calculations
        driveDistance = result.routes[0].legs[0].distance.value;
        driveDuration = result.routes[0].legs[0].duration.value;

        // console.log("Distance in meters: ", distance);
        // console.log("Drive time in seconds: ", duration);

        // console.log("End Lat: ", endLat);
        // console.log("Start Lat: ", startLat);
        var distance;
        if (driveDuration < 5400) {
          distance = 5.0; // sets search box size to 5km from route path
        } else if (driveDuration > 5401 && driveDuration < 10800) {
          distance = 10.0;
        } else if (driveDuration > 10801 && driveDuration < 16200) {
          distance = 15.0;
        } else if (driveDuration > 16201) {
          distance = 20.0;
        }

        //path_overview smooths out the path coordinates
        var path = result.routes[0].overview_path;
        // creates search boxes around the returned path
        boxes = routeBoxer.box(path, distance);


        //------------Save Trips to DB-------------------------------------
        function tripAdded(result) {
          alert(result);
        }

        function addTrip(evt) {
          evt.preventDefault();

          var formInputs = {
            'start': start,
            'end': end,
            'trip_name': $('trip_name').val()
          };

          $.post("/saved-trips", formInputs, tripAdded );
        }


        $("#save-trip").on('submit', addTrip);


        //turn on drawBoxes for testing if you want to visualize search boundaries,
        //function is commented out below
        // drawBoxes();

        //since direction request was successful,
        //call findPlaces function with searchIndex zero

        //allows selection of search boxes to adjust based on origin/destation direction
        if (startLat > endLat) {
          findParks(0);
        } else if (endLat > startLat) {
          findParks(2);
        }

        if (startLat > endLat) {
          findPlaces(0);
        } else if (endLat > startLat) {
          findPlaces(2);
        }

        // findAmusementParks(0);
      } else {
        alert("Directions query failed: " + status);
      }
    });

  }



  // Draw the array of boxes as polylines on the map - helpful to visualize search while testing
  // function drawBoxes() {
  //   var boxpolys = new Array(boxes.length);
  //   for (var i = 0; i < boxes.length; i++) {
  //     boxpolys[i] = new google.maps.Rectangle({
  //       bounds: boxes[i],
  //       fillOpacity: 0,
  //       strokeOpacity: 1.0,
  //       strokeColor: '#000000',
  //       strokeWeight: 1,
  //       map: map
  //     });
  //   }
  // }




  function findPlaces(searchIndex) {

    // search request is defined as the area bound by each routeBox box,
    // search type is hard coded as restaurant for testing
    var restaurantRequest = {
      bounds: boxes[searchIndex],
      type: 'restaurant'
    };

    // debugger;
    service.nearbySearch(restaurantRequest, function(results, status) {
      if (status == google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0, result; result = results[i]; i++) {
          if (result.rating >= 4.0){
            var marker = createMarker(result);
          }
        }
      }

      // console.log("End Lat: ", endLat);
      // console.log("Start Lat: ", startLat);

      //as long as we haven't triggered the query limit, add 1 to the index and search again
      if (status != google.maps.places.PlacesServiceStatus.OVER_QUERY_LIMIT) {
        searchIndex++;
        if (startLat > endLat) {
          if (searchIndex < (boxes.length - 3)) {
            findPlaces(searchIndex);
          }
        }
        else if (endLat > startLat) {
          if (searchIndex < boxes.length) {
            findPlaces(searchIndex);
          }
        }
      } else { // delay 1 second and try again
        setTimeout("findPlaces(" + searchIndex + ")", 1000);
      }
    });
  }

  function findParks(searchIndex) {

    // search request is defined as the area bound by each routeBox box,
    // search type is hard coded as park for testing

    var parkRequest = {
      bounds: boxes[searchIndex],
      type: 'park'
    };



    //separate search for second parameter (parks only), returns parks with 4.0 rating or higher
     service.nearbySearch(parkRequest, function(results, status) {
      if (status == google.maps.places.PlacesServiceStatus.OK) {

        for (var i = 0, result; result = results[i]; i++) {
          if (result.rating >= 4.0) {
            // debugger;
            var marker = createParkMarker(result);
          }
        }
      }
      //as long as we haven't triggered the query limit, add 1 to the index and search again
      if (status != google.maps.places.PlacesServiceStatus.OVER_QUERY_LIMIT) {
        searchIndex++;

        if (startLat > endLat) {
          if (searchIndex < (boxes.length-2)) {
            findParks(searchIndex);
          }
        }
        else if (endLat > startLat) {
          if (searchIndex < boxes.length) {
            findParks(searchIndex);
          }
        }
      } else { // delay 1 second and try again
        setTimeout("findParks(" + searchIndex + ")", 1000);
      }
    });
  }

  // submitYelpRequest();
  // var yelp_rating_graphic;
  // var yelp_link;

  // function showYelpResults(result) {
  //   yelp_rating_graphic = result[1];
  //   yelp_link = result[0];
  //         console.log(yelp_rating_graphic, yelp_link);
  //         //this should return an object, use var first = resp.businesses[1] to get park,
  //         // first.name, first.url, first.rating_img_url
  // }

  // function submitYelpRequest() {

  //   //hard coded for testing (later use term: result.name)
  //   var params = {
  //   'term': 'Wildwood Park',
  //   'type': 'park'
  //   };


  //   $.get("/yelp-search",
  //           params,
  //           showYelpResults
  //        );
  //       }




  // function findAmusementParks(searchIndex) {

  //   // search request is defined as the area bound by each routeBox box,
  //   // search type is hard coded as park for testing

  //   var amusementParkRequest = {
  //     bounds: boxes[searchIndex],
  //     type: 'amusement_park'
  //   };


  //   //separate search for amusement parks, no ratings minimum specified
  //    service.nearbySearch(amusementParkRequest, function(results, status) {
  //     if (status == google.maps.places.PlacesServiceStatus.OK) {

  //       for (var i = 0, result; result = results[i]; i++) {
  //           var marker = createMarker(result);
  //       }
  //     }
  //     //as long as we haven't triggered the query limit, add 1 to the index and search again
  //     if (status != google.maps.places.PlacesServiceStatus.OVER_QUERY_LIMIT) {
  //       searchIndex++;
  //       if (searchIndex < (boxes.length-2))
  //         findParks(searchIndex);
  //     } else { // delay 1 second and try again
  //       setTimeout(findAmusementParks(searchIndex), 1000);
  //     }

  //   });
  // }

  //create markers on each returned place result
  function createMarker(place) {
    var placeLoc = place.geometry.location;

    var image = {
      url: "https://maps.gstatic.com/intl/en_us/mapfiles/markers2/measle.png",
      size: new google.maps.Size(7, 7),
      anchor: new google.maps.Point(3.5, 3.5)
    };

    var marker = new google.maps.Marker({
      map: map,
      icon: image,
      position: place.geometry.location
    });

    var infowindow = new google.maps.InfoWindow();

    google.maps.event.addListener(marker, 'click', function() {
      service.getDetails(place, function(result, status) {
        if (status !== google.maps.places.PlacesServiceStatus.OK) {
          console.error(status);
          return;
        }
      infowindow.setContent(result.name);
      infowindow.open(map, marker);
      });
    });

  }

  function createParkMarker(place) {
    var placeLoc = place.geometry.location;

    var image = {
      url: "https://storage.googleapis.com/support-kms-prod/SNP_2752129_en_v0",
      //url: "https://maps.gstatic.com/intl/en_us/mapfiles/markers2/measle_blue.png",
      size: new google.maps.Size(7, 7),
      anchor: new google.maps.Point(3.5, 3.5)
    };

    var marker = new google.maps.Marker({
      map: map,
      icon: image,
      position: place.geometry.location
    });


    google.maps.event.addListener(marker, 'click', function() {
      service.getDetails(place, function(result, status) {
        if (status !== google.maps.places.PlacesServiceStatus.OK) {
          console.error(status);
          return;
        }

          var contentString =
            '</div>' +
            '<h3>' + result.name + '</h3>'+
            '<p><img src=' + yelp_rating_graphic + '></p>'+
            '<p><a target="blank" href='+ yelp_link + '>Link to Yelp: </a></p>';


      // var contentString = "<div>" + result.name + "</div>";
      // contentString += "<a target='blank' href='http://google.com'>Search the web!</a>";


      var infowindow = new google.maps.InfoWindow({content: contentString});

      // infowindow.setContent(result.name);
      infowindow.open(map, marker);
      });
    });

  }

}
initialize();



