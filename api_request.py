import requests
import os  #to access OS environment variable (secret API key)

# payload = {'term': 'honeydew'}

# Hard coded lat, long for Oakland, radius of 321869 meters (200 miles - to get to lake tahoe), type=park 

# Instead of radius, should I rankby distance? Cannot use both together, but I could return distance in desc order

r = requests.get(
    "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=37.8044,-122.2711&radius=500&type=park&key=" + os.environ['PLACES_SECRET_KEY'])


result_dict = r.json()

print result_dict

# allows additional flexibility by incorporating payload
# r = requests.get(
#     "https://maps.googleapis.com/maps/api/place/nearbysearch/json?",
#     params=payload)
     # where would YOUR_API_KEY go?

# results = r.json()
#converts results to a dictionary





# The following example is a search request for places of type 'restaurant' within a 500m radius of a point in Sydney, Australia, containing the word 'cruise':
    # "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8670522,151.1957362&radius=500&type=restaurant&keyword=cruise&key=SECRET_KEY")
