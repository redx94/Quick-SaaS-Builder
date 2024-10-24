import unittest
from unittest.mock import patch, MagicMock
import sys
import os
import json

# Add src directory to Python path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'src')))

from backend.assistant_api import app

class TestIntegrationAPI(unittest.TestCase):
    def setUp(self):
        self.app = app.test_client()
        self.app.testing = True

    def test_status_endpoint(self):
        response = self.app.get('/status')
        self.assertEqual(response.status_code, 200)
        data = json.loads(response.data)
        self.assertIn('status', data)

    @patch('backend.assistant_api.transformer_model.generate_response')
    @patch('backend.assistant_api.agi_system.reason')
    def test_generate_idea_endpoint(self, mock_agi, mock_transformer):
        mock_transformer.return_value = "Test response"
        mock_agi.return_value = "AGI response"
        
        response = self.app.post('/generate_idea',
                               json={'input': 'test input'})
        self.assertEqual(response.status_code, 200)

if __name__ == '__main__':
    unittest.main()