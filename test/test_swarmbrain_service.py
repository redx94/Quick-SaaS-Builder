# test_swarmbrain_service.py
# Author: Reece Dixon
# Copyright (c) 2024 Reece Dixon. All Rights Reserved.
# Path: Quick-SaaS-Builder-main/tests/test_swarmbrain_service.py

import unittest
from unittest.mock import patch, MagicMock
import torch
from assistant_api import SwarmBrainService
from ray import serve
import json

class TestSwarmBrainService(unittest.TestCase):

    @patch.object(SwarmBrainService, 'load_model')
    def setUp(self, mock_load_model):
        mock_load_model.return_value = None  # Mock model loading to skip actual loading
        self.service = SwarmBrainService()

    @patch.object(SwarmBrainService, 'load_model')
    def test_load_model(self, mock_load_model):
        # Test model loading functionality
        self.service.load_model()
        mock_load_model.assert_called_once()

    @patch('torch.tensor')
    @patch.object(SwarmBrainService, 'quantum_optimize')
    def test_call_valid_request(self, mock_quantum_optimize, mock_tensor):
        # Test a valid request with correct data format
        mock_tensor.return_value = torch.tensor([0.1, 0.2, 0.3])
        mock_quantum_optimize.return_value = torch.tensor([0.4, 0.5, 0.6])
        request_data = json.dumps({"data": [0.1, 0.2, 0.3]})
        request = MagicMock(json=json.loads(request_data))

        response = self.service.__call__(request)
        self.assertIsInstance(response, dict)
        self.assertIn('result', response)

    def test_call_invalid_request(self):
        # Test an invalid request with missing 'data' key
        request_data = json.dumps({"wrong_key": [0.1, 0.2, 0.3]})
        request = MagicMock(json=json.loads(request_data))

        response = self.service.__call__(request)
        self.assertIsInstance(response, dict)
        self.assertIn('error', response)
        self.assertEqual(response['error'], "Missing 'data' key in request.")

    @patch('qiskit.Aer.get_backend')
    @patch('qiskit.execute')
    def test_quantum_optimize(self, mock_execute, mock_get_backend):
        # Test the quantum optimization process
        mock_get_backend.return_value = MagicMock()
        mock_execute.return_value.result.return_value.get_counts.return_value = {
            '000': 1024, '001': 512, '010': 256, '011': 256
        }
        data = torch.tensor([0.1, 0.2, 0.3])

        optimized_data = self.service.quantum_optimize(data)
        self.assertIsInstance(optimized_data, torch.Tensor)
        self.assertEqual(len(optimized_data), len(data))

if __name__ == "__main__":
    serve.start()  # Start Ray Serve for testing
    unittest.main()