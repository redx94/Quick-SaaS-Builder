# assistant_api.py
# Author: Reece Dixon
# Copyright (c) 2024 Reece Dixon. All Rights Reserved.
# Path: Quick-SaaS-Builder-main/backend/assistant_api.py

from flask import Flask, request, jsonify
from flask_cors import CORS
import ssl
import certifi
import requests
from urllib3.exceptions import InsecureRequestWarning
import os

# Suppress only the single InsecureRequestWarning in development
if os.environ.get('FLASK_ENV') == 'development':
    requests.packages.urllib3.disable_warnings(category=InsecureRequestWarning)

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

class AdvancedTransformerModel:
    def __init__(self):
        self.model_cache = {}  # Cache for models

    def generate_response(self, input_text, max_length=300):
        # Placeholder for response generation
        return f"Generated response for: {input_text}"

transformer_model = AdvancedTransformerModel()

@app.route('/generate_idea', methods=['POST'])
def generate_idea():
    try:
        data = request.get_json()
        user_input = data.get('input', '')

        if not user_input:
            return jsonify({'error': 'Invalid input'}), 400

        response = transformer_model.generate_response(user_input)
        return jsonify({'response': response}), 200
    except Exception as e:
        app.logger.error(f"Error in generate_idea: {str(e)}")
        return jsonify({'error': 'An internal error occurred'}), 500

@app.route('/status', methods=['GET'])
def status():
    return jsonify({'status': 'online'}), 200

if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5000, debug=True)
