import unittest
from unittest.mock import patch, MagicMock
import torch

# Mock the entire transformers module
patch('transformers.AutoTokenizer', MagicMock()).start()
patch('transformers.AutoModelForCausalLM', MagicMock()).start()

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
            mock_generate.return_value = [torch.tensor([1, 2, 3])]
            response = self.model.generate_response(self.input_text)
        self.assertIsInstance(response, str)

    @patch('psutil.virtual_memory')
    def test_get_dynamic_workers(self, mock_virtual_memory):
        mock_virtual_memory.return_value = MagicMock(available=10 * 1024 ** 3)  # 10 GB available
        max_workers = self.model.get_dynamic_workers(32)
        self.assertGreaterEqual(max_workers, 1)
        self.assertLessEqual(max_workers, 32)

if __name__ == "__main__":
    unittest.main()