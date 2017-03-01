import json
from yelp.client import Client
from yelp.oauth1_authenticator import Oauth1Authenticator



# read API keys
with open('config_secret.json') as cred:
    creds = json.load(cred)
    auth = Oauth1Authenticator(**creds)
    client = Client(auth)




params = {
    'term': 'Wildwood Park',
    'type': 'park'
}

resp = client.search('San Francisco', **params)





# -----------Practice / hard coded tests below ----------------------------

#hard coded bounding box for testing
# resp = client.search_by_bounding_box(
#     37.900000,
#     -122.500000,
#     37.788022,
#     -122.399797,
#     **params
# )


#------------------------------------------------------------------------

#restaurant search in all of SF
# params = {
#     'term': 'food'
# }

# resp = client.search('San Francisco', **params)