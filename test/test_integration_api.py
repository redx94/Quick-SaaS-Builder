import unittest
from unittest.mock import patch, MagicMock
from parameterized import parameterized
import json
import sys
import os
import time

# Add the project root to the Python path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

# Mock the entire flask module
patch('flask.Flask', MagicMock()).start()
patch('ray.serve', MagicMock()).start()
patch('ray.get', MagicMock()).start()

# Import app after mocking flask
from src.backend.assistant_api import app

class TestIntegrationAPI(unittest.TestCase):

    def setUp(self):
        self.client = app.test_client()
        self.client.testing = True

    @patch('src.backend.assistant_api.transformer_model.generate_response')
    @patch('src.backend.assistant_api.agi_system.reason')
    @patch('src.backend.assistant_api.hive_mind.enhance_response')
    @patch('src.backend.assistant_api.quantum_assistant.optimize')
    @patch('src.backend.assistant_api.SwarmBrainService.get_handle')
    @patch('ray.get')
    @parameterized.expand([
        ('How can I optimize my workflow?', 200, 'response'),
        ('What is the best AI model?', 200, 'response'),
    ])
    def test_generate_idea_valid_input(self, input_text, expected_status, expected_key, mock_ray_get, mock_swarm, mock_quantum, mock_hive, mock_agi, mock_transformer):
        try:
            mock_transformer.return_value = "Initial response"
            mock_agi.return_value = "AGI response"
            mock_hive.return_value = "Hive response"
            mock_quantum.return_value = "Quantum response"
            mock_swarm.return_value.remote.return_value = MagicMock()
            mock_ray_get.return_value = {"result": ["Final response"]}

            response = self.client.post('/generate_idea',
                                        data=json.dumps({'input': input_text}),
                                        content_type='application/json')
            self.assertEqual(response.status_code, expected_status)
            data = json.loads(response.data)
            self.assertIn(expected_key, data)
            self.assertIsInstance(data[expected_key], list)
        except Exception as e:
            self.fail(f"test_generate_idea_valid_input raised an exception: {e}")

    def test_generate_idea_invalid_input(self):
        try:
            response = self.client.post('/generate_idea',
                                        data=json.dumps({'wrong_key': 'This is incorrect input'}),
                                        content_type='application/json')
            self.assertEqual(response.status_code, 400)
            data = json.loads(response.data)
            self.assertIn('error', data)
            self.assertEqual(data['error'], 'Invalid input')
        except Exception as e:
            self.fail(f"test_generate_idea_invalid_input raised an exception: {e}")

    def test_performance_generate_idea(self):
        start_time = time.time()
        self.client.post('/generate_idea',
                         data=json.dumps({'input': 'How can I optimize my workflow?'}),
                         content_type='application/json')
        duration = time.time() - start_time
        self.assertLess(duration, 1, "Performance issue: generate_idea took too long")

if __name__ == '__main__':
    unittest.main()
