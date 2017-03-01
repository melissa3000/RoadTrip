from unittest import TestCase
from model import connect_to_db, db
from server import app
from flask import session
import server
import os



class FlaskTests(TestCase):
    """Flask tests"""

    def setUp(self):
        """Tasks done before every test"""

        # gets the Flask test client
        self.client = app.test_client()

        # shows Flask errors that happen during testing
        app.config['TESTING'] = True
        app.config['SECRET_KEY'] = 'key'


    def test_index(self):
        """test homepage"""

        result = self.client.get("/")
        self.assertIn("Please log in", result.data)

    def test_registration_form(self):
        """test new user route"""

        result = self.client.get("/new-user")
        self.assertIn("Register below", result.data)

    def test_displayD3Map(self):
        """tests route that displays D3 map"""

        result = self.client.get("/d3map")
        self.assertEqual(result.status_code, 200)
        self.assertIn('Road Trip Planner', result.data)



class FlaskLoginTest(TestCase):
    """Flask tests that require user to be logged in"""

    def setUp(self):
        """Do these things before every test"""

        app.config['TESTING'] = True
        self.client = app.test_client()


    def test_login_page(self):
        """Tests login page"""

        with self.client as c:
            result = c.post('/login',
                            data={'name': 'test_user', 'password': 'abc123'},
                            follow_redirects=True
                            )
            self.assertEqual(session['user_id'], 3)
            self.assertIn("You are logged in", result.data)



class FlaskTestsLoggedIn(TestCase):
    """Flask tests with user logged in to session"""

    def setUp(self):
        """Do this before each test"""

        app.config['TESTING'] = True
        app.config['SECRET_KEY'] = 'key'
        self.client = app.test_client()

        with self.client as c:
            with c.session_transaction() as sess:
                sess['user_id'] = 1



    def test_new_search(self):
        """tests route that displays search map results"""

        result = self.client.post('/map',
                                data={'start': 'Oakland', 'end': 'Petaluma',
                                'key': os.environ['PLACES_SECRET_KEY']})
        # print result
        self.assertEqual(result.status_code, 200)
        self.assertIn('Trip Name', result.data)


# ---------------- Selenium tests ---------------------------------------

# Selenium tests kept a different file: selenium-tests.py

# -------------------------------------------------------------------------






if __name__ == "__main__":
    import unittest
    connect_to_db(app)
    unittest.main()
