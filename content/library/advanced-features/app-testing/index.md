---
title: Getting started with app testing
slug: /library/advanced-features/app-testing
---

# Getting started with app testing

Streamlit app testing enables developers to build and run automated tests. Bring your favorite test automation software and enjoy simple syntax to simulate user input and inspect rendered output.

The provided class, AppTest, simulates a running app and provides methods to set up, manipulate, and inspect the app contents via API instead of a browser UI. AppTest provides similar functionality to browser automation tools like Selenium or Playwright, but with less overhead to write and execute tests. Use our testing framework with a tool like [pytest](https://docs.pytest.org/) to execute or automate your tests. A typical pattern is to build a suite of tests for an app to ensure consistent functionality as the app evolves. The tests run locally and/or in a CI environment like Github Actions.

If you aren't familiar with testing frameworks or you'd like a little refresher using a Streamlit example, start with [Introduction to `pytest`](/library/advanced-features/app-testing/pytest-intro). This will explain the basics of running a test locally using `pytest`.

If you are already well-versed in `pytest` or testing in general, you may prefer to start with [Introduction to Streamlit app testing](/library/advanced-features/app-testing/app-testing-intro) and follow with [Beyond the basics](/library/advanced-features/app-testing/beyond-the-basics).
