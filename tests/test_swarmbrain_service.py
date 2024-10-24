import unittest
from unittest.mock import patch, MagicMock
import sys
import os

# Add src directory to Python path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'src')))

from backend.assistant_api import SwarmBrainService

class TestSwarmBrainService(unittest.TestCase):
    def setUp(self):
        self.service = SwarmBrainService()

    @patch.object(SwarmBrainService, 'load_model')
    def test_load_model(self, mock_load_model):
        try:
            self.service.load_model()
            mock_load_model.assert_called_once()
        except Exception as e:
            self.fail(f"load_model raised an exception: {e}")

    @patch.object(SwarmBrainService, 'quantum_optimize')
    def test_call_valid_request(self, mock_quantum_optimize):
        try:
            mock_quantum_optimize.return_value = MagicMock()
            request = MagicMock(json={"data": [0.1, 0.2, 0.3]})

            response = self.service(request)
            self.assertIsInstance(response, dict)
            self.assertIn('result', response)
        except Exception as e:
            self.fail(f"test_call_valid_request raised an exception: {e}")

if __name__ == '__main__':
    unittest.main()