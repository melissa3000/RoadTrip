from unittest import TestCase
from model import connect_to_db, db
from server import app
from flask import session
import server
import os
from selenium import webdriver


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

    def tearDown(self):
        """Do at end of test"""

        db.session.close()


    def test_new_search(self):
        """tests route that displays search map results"""

        # with self.client as c:
        #     with c.session_transaction() as sess:
        #         sess['user_id'] = 1

        result = self.client.post('/map',
                                data={'start': 'Oakland', 'end': 'Petaluma',
                                'key': os.environ['PLACES_SECRET_KEY']})
        # print result
        self.assertEqual(result.status_code, 200)
        self.assertIn('Trip Name', result.data)

# ---------------- Selenium tests ---------------------------------------

# class TestLogIn(TestCase):

#     def setUp(self):
#         self.browser = webdriver.Firefox()

#     def tearDown(self):
#         self.browser.quit()

#     def test_title(self):
#         self.browser.get('http://localhost:5000/')
#         self.assertEqual(self.browser.title, 'Log in')

#     def testLogInSelenium(self):
#         self.browser.get('http://localhost:5000/')

#         user = self.browser.find_element_by_id('user_name')
#         user.send_keys('test_user')
#         password = self.browser.find_element_by_id('password')
#         password.send_keys("abc123")

#         btn = self.browser.find_element_by_id('submit-btn')
#         btn.click()

#         self.assertEqual(self.browser.title, 'Search')

# -------------------------------------------------------------------------

# class MockFlaskTests(TestCase):
    # """Mocking to test functions that involve an API call"""

    # def setUp(self):
    #     """Things to do before each test is run"""

    #     # Get Flask test client
    #     self.client = app.test_client()

    #     # Show errors that occur during test
    #     app.config['TESTING'] = True

    #     # Create mock
    #     def _mock_yelpRestaurantSearch():
    #         return ["https://www.yelp.com/biz/olompali-state-historic-park-novato?adjust_creative=wD5upf9uIdPCXIOmzLrNww&utm_campaign=yelp_api&utm_medium=api_v2_search&utm_source=wD5upf9uIdPCXIOmzLrNww", "https://s3-media2.fl.yelpcdn.com/assets/2/www/img/99493c12711e/ico/stars/v1/stars_4_half.png", "Olompali State Historic Park"]

    #     server.yelpRestaurantSearch = _mock_yelpRestaurantSearch

    # def tearDown(self):
    #     """Do this at the end of each test"""

    #     pass

    # def test_yelp_search_with_mock(self):
    #     """Ensure result returns park name"""

    #     result = self.client.get()





if __name__ == "__main__":
    import unittest
    connect_to_db(app)
    unittest.main()
