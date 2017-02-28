"""Road Trip app"""

from jinja2 import StrictUndefined
from flask import Flask, render_template, request, flash, redirect, session, jsonify
from flask_debugtoolbar import DebugToolbarExtension

from model import connect_to_db, User, Trip, db
import os
import yelping


app = Flask(__name__)
app.config['TEMPLATES_AUTO_RELOAD'] = True

app.secret_key = "jaofep98urOSAKFDa89"

#Included to make Jinja variables easier to debug:
app.jinja_env.undefined = StrictUndefined

#----------------------------------------------------------------------------

@app.route('/', methods=['GET'])
def index():
    """Homepage allows users to log in"""

    return render_template("homepage.html")


@app.route('/login', methods=['POST'])
def user_login():
    """Logs user into system"""

    username = request.form.get("name")
    password = request.form.get("password")
    # print "username: ", username      # this works
    # print "password: ", password      #  this works

    user = User.query.filter_by(username=username).first()
    # print "User query result: ", user     # this works,  <User user_id: 1 username: admin>  // User query result:  None

    if not user:
        flash("User name not found. Please try again")
        return redirect("/")

    if user.password != password:
        flash("Your password was incorrect. Please try again")
        return redirect("/")

    else:
        session["user_id"] = user.user_id

        flash("You are logged in")
        return render_template("search_form.html")


@app.route('/new-user')
def register_form():

    return render_template("new_user.html")



@app.route('/register', methods=['POST'])
def new_user():
    """Allows new user to register and adds them to database"""

    username = request.form.get("name")
    password = request.form.get("password")


    new_user = User(username=username, password=password)

    db.session.add(new_user)
    db.session.commit()

    flash("Thank you for registering as a user")
    #code 307 preserves the original form method through the redirect
    return redirect("/login", code=307)


@app.route('/map', methods=['POST'])
def new_search():
    """Takes user's start and end location and returns road trip results"""

    start = request.form.get("start")
    end = request.form.get("end")

    # print "start!!", start
    # print "end!!", end

    return render_template("map.html", start=start,
                                    end=end,
                                    key=os.environ['PLACES_SECRET_KEY'])


@app.route('/saved-trips', methods=['POST'])
def saved_trips():
    """Allows user to save trips and adds them to database"""

    trip_name = request.form.get("trip_name")
    start = request.form.get("start")
    end = request.form.get("end")

    user_id = session.get("user_id")

    new_trip = Trip(user_id=user_id, trip_name=trip_name, start=start, end=end)

    db.session.add(new_trip)
    db.session.commit()


    return "succeess"

@app.route('/my-trips')
def userTrips():
    """Displays saved trip for registered users"""


    trips = Trip.query.order_by('trip_name').all()


    return render_template("my_trips.html", trips=trips)


@app.route("/yelp-search")
def yelpRestaurantSearch():
    """Search Yelp for restaurants along path using bounding boxes"""

    term = request.args.get("term")
    search_type = request.args.get("type")

    params = {"term": term, "type": search_type}

    print "Params", params

    resp = yelping.client.search('San Francisco', **params)


    # import pdb
    # pdb.set_trace()

    yelp_link = resp.businesses[0].url
    rating_graphic = resp.businesses[0].rating_img_url
    yelp_name = resp.businesses[0].name

    return jsonify([yelp_link, rating_graphic, yelp_name])



@app.route('/d3map')
def displayD3Map():
    """Displays interactive D3 map"""

    return render_template("d3map.html")






if __name__ == "__main__":
    # Code below only runs if server file is opened directly

    #Turn this off after debugging
    app.debug = True
    connect_to_db(app)
    DebugToolbarExtension(app)

    app.run(host="0.0.0.0")
