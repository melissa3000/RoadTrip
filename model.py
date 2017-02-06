from flask_sqlalchemy import SQLAlchemy


#Allows connection to PostgreSQL db and use of session object.

db = SQLAlchemy()


class User(db.Model):
    """User"""

    __tablename__ = "users"

    user_id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), unique=True)
    password = db.Column(db.String(20), unique=True)



    def __repr__(self):
        """Provides more helpful output when printed"""

        return "<User user_id: %s username: %s" % (self.user_id, self.username)




def connect_to_db(app):
    """Connects db to Flask app"""

    #Configure to PostgreSQL db
    app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///roadtrip'
    #app.config['SQLALCHEMY_ECHO'] = True
    db.app = app
    db.init_app(app)


if __name__ == "__main__":

    from server import app
    connect_to_db(app)
    print "Connected to DB."
