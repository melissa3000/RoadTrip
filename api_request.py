import requests

# payload = {'term': 'honeydew'}

# will not work until link to SECRET_KEY, saved this way so I can git commit without
#sharing key accidentally
r = requests.get(
    "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8670522,151.1957362&radius=500&type=restaurant&keyword=cruise&key=SECRET_KEY")

result_dict = r.json()

print result_dict

# allows additional flexibility by incorporating payload
# r = requests.get(
#     "https://maps.googleapis.com/maps/api/place/nearbysearch/json?",
#     params=payload)
     # where would YOUR_API_KEY go?

# results = r.json()
#converts results to a dictionary