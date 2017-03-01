from selenium import webdriver


def testSearch():
    browser = webdriver.Firefox()
    browser.get('http://localhost:5000')
    assert browser.title == 'Log in'

    user = browser.find_element_by_id('user_name')
    user.send_keys('test_user')
    password = browser.find_element_by_id('password')
    password.send_keys("abc123")

    btn = browser.find_element_by_id('submit-btn')
    btn.click()


    assert browser.title == 'Search'
    browser.quit()


def testResultMap():
    browser = webdriver.Firefox()
    browser.get('http://localhost:5000')
    assert browser.title == 'Log in'

    user = browser.find_element_by_id('user_name')
    user.send_keys('test_user')
    password = browser.find_element_by_id('password')
    password.send_keys("abc123")

    btn = browser.find_element_by_id('submit-btn')
    btn.click()

    start = browser.find_element_by_id('start')
    start.send_keys('Oakland')
    end = browser.find_element_by_id('end')
    end.send_keys('Petaluma')

    btn = browser.find_element_by_id('search-btn')
    btn.click()

    assert browser.title == 'Road Trip Map'





testSearch()
testResultMap()
