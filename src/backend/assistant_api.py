from flask import Flask, request, jsonify
from flask_cors import CORS
import ssl
import certifi
import requests
from urllib3.exceptions import InsecureRequestWarning
import os

# Suppress only the single InsecureRequestWarning in development
requests.packages.urllib3.disable_warnings(category=InsecureRequestWarning)

app = Flask(__name__)
CORS(app)

# Configure SSL context based on environment
def create_ssl_context():
    if os.environ.get('FLASK_ENV') == 'development':
        context = ssl.create_default_context()
        context.check_hostname = False
        context.verify_mode = ssl.CERT_NONE
        return context
    else:
        context = ssl.create_default_context(cafile=certifi.where())
        if os.environ.get('SSL_CERT_PATH') and os.environ.get('SSL_KEY_PATH'):
            context.load_cert_chain(
                os.environ.get('SSL_CERT_PATH'),
                os.environ.get('SSL_KEY_PATH')
            )
        return context

# ... keep existing code (transformer model and other class definitions)

@app.route('/generate_idea', methods=['POST'])
def generate_idea():
    try:
        data = request.get_json()
        user_input = data.get('input', '')

        if not user_input:
            return jsonify({'error': 'Invalid input'}), 400

        initial_response = transformer_model.generate_response(user_input)
        agi_response = agi_system.reason(initial_response)
        hive_response = hive_mind.enhance_response(agi_response)
        quantum_optimized = quantum_assistant.optimize(hive_response)
        
        return jsonify({'response': quantum_optimized}), 200
    except Exception as e:
        app.logger.error(f"Error in generate_idea: {str(e)}")
        return jsonify({'error': 'An internal error occurred'}), 500

@app.route('/status', methods=['GET'])
def status():
    return jsonify({'status': 'online'}), 200

if __name__ == '__main__':
    ssl_context = create_ssl_context()
    port = int(os.environ.get('PORT', 5000))
    
    if os.environ.get('FLASK_ENV') == 'development':
        app.run(host='0.0.0.0', port=port, debug=True, ssl_context=None)
    else:
        app.run(host='0.0.0.0', port=port, ssl_context=ssl_context)