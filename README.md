# Road Tripper

Born from a love of travel and the open road, Road Tripper is a full stack web application that takes a user's starting and ending location, builds a drive route, and suggests park and restaurant stops along the path. Users can see the Yelp rating for each roadside attraction through the app results, and follow links directly to the location's Yelp review page. Bay Area users also have an option to view suggestions using a D3 map. Finally, any user may save road trip searches for later adventures.

## Technology:
* Python
* Flask
* Jinja
* JavaScript
* AJAX
* Bootstrap
* D3
* Selenium
* PostgreSQL
* Google Places API
* Yelp API

## How to Use Road Tripper

Once the user has logged in or registered, they can search for a trip by entering a start and end location.

![alt text](/static/Search_screenshot.png "Search page view")

Once the user clicks the submit button, a Google Maps API request is made. The result of this request is the path drawn from A to B. Because Google Maps searches around an address or within a set radius and not along a path, the app integrates a tool which builds invisible boxes which traverse the drive path. A separate Google Places API request is made for each bound search box for restaurants and parks along the route. Results are filtered for places with high ratings and those closest to the user's starting point are removed from the results.

![alt text](/static/MapResult_screenshot.png "Map results page view")

When the user clicks on a place marker, an AJAX request sends the place name and location as parameters to the server. The server then makes a Yelp API request. These results are fed into a success function which generates an infoWindow with the place name, Yelp star rating, and a link to the location's Yelp page. This function was created as a success function to meet the challenge of asynchronicity in returning results that depend on integrating multiple API requests.

![alt text](/static/InfoWindow_screenshot.png "InfoWindow example")

Any trip results can be saved by the user for future reference by naming the trip and selecting the "save" option. These trips and the user information are all saved in a PostgreSQL database.

![alt text](/static/SavedTrips_screenshot.png "Saved Trips")

Finally, users based in the Bay Area can use the D3 map as a visual representation of suggestions from San Francisco of varying drive times.

![alt text](/static/D3Map_screenshot.png "D3 Map")

## Version 2.0

Features under development:

* Expanding the functionality of the D3 map to include additional points of origin, allow users to search for suggestions by drive time, and making the map interactive so that road trip suggestions are returned once a destination is selected.

* Creating a social aspect so that friends can share trip ideas and points of interest with each other.

* Creating a draggable drive path with place suggestions that automatically update in case users want to travel along a specific route, for example along the coastline.

## About the Developer

Melissa is a software engineer in the San Francisco Bay Area. She's passionate about travel, technology and photography.
Learn more here: <www.linkedin.com/in/melissa3000>


