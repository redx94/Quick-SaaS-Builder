import unittest
from unittest.mock import patch, MagicMock
from parameterized import parameterized
import sys
import os
import time

# Add the project root to the Python path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

# Mock the entire transformers module
patch('transformers.AutoTokenizer', MagicMock()).start()
patch('transformers.AutoModelForCausalLM', MagicMock()).start()
patch('torch.tensor', MagicMock()).start()

# Import AdvancedTransformerModel after mocking transformers
from src.backend.assistant_api import AdvancedTransformerModel

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

    @patch('torch.tensor')
    @parameterized.expand([
        ("Hello, how are you?", "Generated response"),
        ("What is the weather today?", "Generated response"),
    ])
    def test_generate_response(self, input_text, expected_response, mock_tensor):
        try:
            mock_tensor.return_value = MagicMock()
            with patch.object(self.model.model, 'generate') as mock_generate:
                mock_generate.return_value = [MagicMock()]
                with patch.object(self.model.tokenizer, 'decode') as mock_decode:
                    mock_decode.return_value = expected_response
                    response = self.model.generate_response(input_text)
            self.assertIsInstance(response, str)
            self.assertEqual(response, expected_response)
        except Exception as e:
            self.fail(f"generate_response raised an exception: {e}")

    def test_performance_generate_response(self):
        start_time = time.time()
        self.model.generate_response(self.input_text)
        duration = time.time() - start_time
        self.assertLess(duration, 1, "Performance issue: generate_response took too long")

if __name__ == "__main__":
    unittest.main()
