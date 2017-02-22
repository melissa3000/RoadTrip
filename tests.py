from unittest import TestCase
from model import connect_to_db, db #, example_data
from server import app
from flask import session

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
            self.assertEqual(session['user_id'], 2)
            self.assertIn("You are logged in", result.data)


if __name__ == "__main__":
    import unittest
    connect_to_db(app)
    unittest.main()
