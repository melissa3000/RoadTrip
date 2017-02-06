"""Road Trip app"""

from jinja2 import StrictUndefined

from flask import Flask, render_template, request, flash, redirect, session
from flask_debugtoolbar import DebugToolbarExtension

from model import connect_to_db, User
import psycopg2


app = Flask(__name__)

# should this be kept in the secrets.sh file?
app.secret_key = "jaofep98urOSAKFDa89"

#Included to make Jinja variables easier to debug:
app.jinja_env.undefined = StrictUndefined


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

    






#Add route to create new user:
# @app.route('/register', methods=['POST'])
# def new_user():
#     """Allows new user to register and adds them to database"""

#     user = request.form["name"]
#     password = request.form["password"]

#     new_user = User(username=user, password=password)

#     db.session.add(new_user)
#     db.session.commit()

#     flash("Thank you for registering as a user")
#     return (where does this go and add them to a current session/log them in)




if __name__ == "__main__":
    # Code below only runs if server file is opened directly

    #Turn this off after debugging
    app.debug = True
    connect_to_db(app)

    DebugToolbarExtension(app)

    app.run(debug=True, host="0.0.0.0")
