import unittest
from unittest.mock import patch, MagicMock
import json
import sys
import os

# Add the project root to the Python path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

# Mock the entire flask module
patch('flask.Flask', MagicMock()).start()
patch('ray', MagicMock()).start()

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
    def test_generate_idea_valid_input(self, mock_ray_get, mock_swarm, mock_quantum, mock_hive, mock_agi, mock_transformer):
        mock_transformer.return_value = "Initial response"
        mock_agi.return_value = "AGI response"
        mock_hive.return_value = "Hive response"
        mock_quantum.return_value = "Quantum response"
        mock_swarm.return_value.remote.return_value = MagicMock()
        mock_ray_get.return_value = {"result": "Final response"}

        response = self.client.post('/generate_idea',
                                    data=json.dumps({'input': 'How can I optimize my workflow?'}),
                                    content_type='application/json')
        self.assertEqual(response.status_code, 200)
        data = json.loads(response.data)
        self.assertIn('response', data)
        self.assertIsInstance(data['response'], list)

    def test_generate_idea_invalid_input(self):
        response = self.client.post('/generate_idea',
                                    data=json.dumps({'wrong_key': 'This is incorrect input'}),
                                    content_type='application/json')
        self.assertEqual(response.status_code, 400)
        data = json.loads(response.data)
        self.assertIn('error', data)
        self.assertEqual(data['error'], 'Invalid input')

if __name__ == '__main__':
    unittest.main()
