import unittest
from unittest.mock import patch, MagicMock
import sys
import os

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
        mock_load_model.return_value = MagicMock()
        model = self.model.load_model()
        self.assertIsNotNone(model)
        mock_load_model.assert_called_once()

    @patch('torch.tensor')
    def test_generate_response(self, mock_tensor):
        mock_tensor.return_value = MagicMock()
        with patch.object(self.model.model, 'generate') as mock_generate:
            mock_generate.return_value = [MagicMock()]
            with patch.object(self.model.tokenizer, 'decode') as mock_decode:
                mock_decode.return_value = "Generated response"
                response = self.model.generate_response(self.input_text)
        self.assertIsInstance(response, str)
        self.assertEqual(response, "Generated response")

if __name__ == "__main__":
    unittest.main()