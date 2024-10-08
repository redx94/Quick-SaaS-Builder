# backend_chat_interface.py
# Author: Reece Dixon
# Copyright (c) 2024 Reece Dixon. All Rights Reserved.
# Path: Quick-SaaS-Builder-main/src/backend/backend_chat_interface.py

import subprocess
import threading
from flask import Flask, request, jsonify
from flask_cors import CORS
import requests

dashboard_app = Flask(__name__)
CORS(dashboard_app)

# Thread function to run the Flask API server for assistant_api.py
def run_assistant_api():
    subprocess.run(['python', 'src/backend/assistant_api.py'])

# Route to check the backend status
@dashboard_app.route('/status', methods=['GET'])
def get_status():
    try:
        response = requests.get('http://127.0.0.1:5000/status')
        return jsonify({'backend_status': response.json()}), 200
    except Exception as e:
        return jsonify({'backend_status': 'offline', 'error': str(e)}), 500

# Route to start the backend API server for assistant_api.py
@dashboard_app.route('/start_backend', methods=['GET'])
def start_backend():
    threading.Thread(target=run_assistant_api, daemon=True).start()
    return jsonify({'message': 'Backend server started'}), 200

# Default entrypoint to start the Flask server
if __name__ == '__main__':
    dashboard_app.run(host='127.0.0.1', port=5001, debug=True)