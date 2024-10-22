import unittest
from unittest.mock import patch, MagicMock
from parameterized import parameterized
import json
import sys
import os
import time

# Add the project root to the Python path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

# Mock the entire ray.serve module
patch('ray.serve', MagicMock()).start()

# Mock torch
patch('torch.tensor', MagicMock(return_value=MagicMock())).start()
patch('torch.load', MagicMock()).start()

# Mock qiskit
patch('qiskit.Aer', MagicMock()).start()
patch('qiskit.QuantumCircuit', MagicMock()).start()
patch('qiskit.execute', MagicMock()).start()

# Import SwarmBrainService after mocking ray and torch
from src.backend.assistant_api import SwarmBrainService

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
    @parameterized.expand([
        ({"data": [0.1, 0.2, 0.3]}, True),
        ({"data": [0.5, 0.6, 0.7]}, True),
    ])
    def test_call_valid_request(self, request_data, expected_result, mock_quantum_optimize):
        try:
            mock_quantum_optimize.return_value = MagicMock()
            request = MagicMock(json=request_data)

            response = self.service(request)
            self.assertIsInstance(response, dict)
            self.assertIn('result', response)
            self.assertEqual(bool(response['result']), expected_result)
        except Exception as e:
            self.fail(f"test_call_valid_request raised an exception: {e}")

    def test_call_invalid_request(self):
        try:
            request_data = {"wrong_key": [0.1, 0.2, 0.3]}
            request = MagicMock(json=request_data)

            response = self.service(request)
            self.assertIsInstance(response, dict)
            self.assertIn('error', response)
            self.assertEqual(response['error'], "Missing 'data' key in request.")
        except Exception as e:
            self.fail(f"test_call_invalid_request raised an exception: {e}")

    @patch('qiskit.Aer.get_backend')
    @patch('qiskit.execute')
    @patch.object(SwarmBrainService, 'optimizer')
    def test_quantum_optimize(self, mock_optimizer, mock_execute, mock_get_backend):
        try:
            mock_get_backend.return_value = MagicMock()
            mock_execute.return_value.result.return_value.get_counts.return_value = {
                '000': 1024, '001': 512, '010': 256, '011': 256
            }
            mock_optimizer.optimize.return_value = MagicMock()
            data = MagicMock()

            optimized_data = self.service.quantum_optimize(data)
            self.assertIsNotNone(optimized_data)
        except Exception as e:
            self.fail(f"quantum_optimize raised an exception: {e}")

    def test_performance_call(self):
        request_data = json.dumps({"data": [0.1, 0.2, 0.3]})
        request = MagicMock(json=json.loads(request_data))

        start_time = time.time()
        self.service(request)
        duration = time.time() - start_time
        self.assertLess(duration, 1, "Performance issue: service call took too long")

if __name__ == "__main__":
    unittest.main()
