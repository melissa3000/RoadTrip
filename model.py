from flask_sqlalchemy import SQLAlchemy


#Allows connection to PostgreSQL db and use of session object.

db = SQLAlchemy()


class User(db.Model):
    """User"""

    __tablename__ = "users"

    user_id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), unique=True)
    password = db.Column(db.String(20))



    def __repr__(self):
        """Provides more helpful output when printed"""

        return "<User user_id: %s username: %s>" % (self.user_id, self.username)

class Trip(db.Model):
    """Trip"""

    __tablename__ = "trips"

    trip_id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.user_id'))
    trip_name = db.Column(db.String(100))
    start = db.Column(db.String(75))
    end = db.Column(db.String(75))

    # Define relationship to user
    user = db.relationship("User",
                            backref=db.backref("trips", order_by=trip_id))

    def __repr__(self):
        """Provides helpful representation when printed"""

        return "<Trip trip_id=%s trip_name=%s user_id=%s start=%s end=%s" % (
            self.trip_id, self.trip_name, self.user_id, self.start, self.end)




def connect_to_db(app):
    """Connects db to Flask app"""

    #Configure to PostgreSQL db
    app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///roadtrip'
    #app.config['SQLALCHEMY_ECHO'] = True
    # app.config['SQLALCHEMY_DATABASE_URI'] = db_uri
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    db.app = app
    db.init_app(app)


if __name__ == "__main__":

    from server import app
    connect_to_db(app)
    print "Connected to DB."
