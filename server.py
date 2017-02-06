"""Road Trip app"""

from jinja2 import StrictUndefined

from flask import Flask, render_template, request, flash, redirect, session
from flask_debugtoolbar import DebugToolbarExtension

from model import connect_to_db, User


app = Flask(__name__)

# should this be kept in the secrets.sh file?
app.secret_key = "jaofep98urOSAKFDa89"

#Included to make Jinja variables easier to debug:
app.jinja_env.undefined = StrictUndefined


@app.route('/', methods=['GET'])
def index():
    """Homepage allows users to log in"""

# ToDo: create my own user that I can control and a random test user for others to
# explore/play with app (create db with two user_id's)


    return render_template("homepage.html")


@app.route('/login', methods=['POST'])
def user_login():
    """Logs user into system"""


    pass


# will need to deliver log in information, create session if user found
# and return successful log in flash message



if __name__ == "__main__":
    # Code below only runs if server file is opened directly

    #Turn this off after debugging
    app.debug = True
    
    connect_to_db(app)

    DebugToolbarExtension(app)

    app.run(debug=True, host="0.0.0.0")
