from flask import Flask, request, jsonify
from flask_cors import CORS
import ssl
import certifi
import requests
from urllib3.exceptions import InsecureRequestWarning
import os
from src.modules.ai_provider import AIProvider

# Suppress only the single InsecureRequestWarning in development
requests.packages.urllib3.disable_warnings(category=InsecureRequestWarning)

app = Flask(__name__)
CORS(app)

# Initialize the AI provider with default open-source model
ai_provider = AIProvider()

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

@app.route('/generate_idea', methods=['POST'])
def generate_idea():
    try:
        data = request.get_json()
        user_input = data.get('input', '')

        if not user_input:
            return jsonify({'error': 'Invalid input'}), 400

        # Generate response using the AI provider
        response = ai_provider.generate_response(user_input)
        
        return jsonify({'response': response}), 200
    except Exception as e:
        app.logger.error(f"Error in generate_idea: {str(e)}")
        return jsonify({'error': 'An internal error occurred'}), 500

@app.route('/configure_ai', methods=['POST'])
def configure_ai():
    try:
        data = request.get_json()
        provider = data.get('provider', '')
        api_key = data.get('api_key', '')
        
        ai_provider.set_custom_provider(provider, api_key)
        return jsonify({'message': 'AI provider configured successfully'}), 200
    except Exception as e:
        return jsonify({'error': f'Failed to configure AI provider: {str(e)}'}), 500

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