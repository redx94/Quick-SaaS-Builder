import os
import json

# Lepton AI configuration
lepton_ai_config = {
    "api_key": "YOUR_LEPTON_AI_API_KEY",
    "api_secret": "YOUR_LEPTON_AI_API_SECRET",
    "endpoint": "https://api.lepton.ai/v1"
}

# Save the configuration to a file
with open("lepton_ai_config.json", "w") as f:
    json.dump(lepton_ai_config, f)
