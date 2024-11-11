import unittest
from unittest.mock import patch, MagicMock
from parameterized import parameterized
import sys
import os

# Add src directory to Python path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'src')))

from backend.assistant_api import AdvancedTransformerModel

class TestAdvancedTransformerModel(unittest.TestCase):
    def setUp(self):
        self.model = AdvancedTransformerModel()
        self.input_text = "Hello, how are you?"

    @patch.object(AdvancedTransformerModel, 'load_model')
    def test_load_model(self, mock_load_model):
        try:
            mock_load_model.return_value = MagicMock()
            model = self.model.load_model()
            self.assertIsNotNone(model)
            mock_load_model.assert_called_once()
        except Exception as e:
            self.fail(f"load_model raised an exception: {e}")

    def test_generate_response(self):
        try:
            response = self.model.generate_response(self.input_text)
            self.assertIsInstance(response, str)
            self.assertTrue(len(response) > 0)
        except Exception as e:
            self.fail(f"generate_response raised an exception: {e}")

if __name__ == "__main__":
    unittest.main()