# test_integration_api.py
# Author: Reece Dixon
# Copyright (c) 2024 Reece Dixon. All Rights Reserved.
# Path: Quick-SaaS-Builder-main/tests/test_integration_api.py

import unittest
from assistant_api import app
import json

class TestIntegrationAPI(unittest.TestCase):

    def setUp(self):
        # Set up the test client for the Flask app
        self.client = app.test_client()
        self.client.testing = True

    def test_generate_idea_valid_input(self):
        # Test the /generate_idea endpoint with valid input
        response = self.client.post('/generate_idea',
                                    data=json.dumps({'input': 'How can I optimize my workflow?'}),
                                    content_type='application/json')
        self.assertEqual(response.status_code, 200)
        data = json.loads(response.data)
        self.assertIn('response', data)
        self.assertIsInstance(data['response'], str)

    def test_generate_idea_invalid_input(self):
        # Test the /generate_idea endpoint with invalid input
        response = self.client.post('/generate_idea',
                                    data=json.dumps({'wrong_key': 'This is incorrect input'}),
                                    content_type='application/json')
        self.assertEqual(response.status_code, 400)
        data = json.loads(response.data)
        self.assertIn('error', data)
        self.assertEqual(data['error'], 'Invalid input')

if __name__ == '__main__':
    unittest.main()