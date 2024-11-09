from transformers import pipeline, AutoModelForCausalLM, AutoTokenizer
import os
import torch

class AIProvider:
    def __init__(self):
        self.model = None
        self.tokenizer = None
        self.initialize_default_model()

    def initialize_default_model(self):
        """Initialize the default open-source model (FLAN-T5-small)"""
        try:
            model_name = "google/flan-t5-small"
            self.tokenizer = AutoTokenizer.from_pretrained(model_name)
            self.model = AutoModelForCausalLM.from_pretrained(model_name)
            print("Successfully loaded default AI model")
        except Exception as e:
            print(f"Error loading default model: {str(e)}")
            raise

    def generate_response(self, prompt, max_length=150):
        """Generate a response using the current model"""
        try:
            inputs = self.tokenizer(prompt, return_tensors="pt", max_length=512, truncation=True)
            outputs = self.model.generate(
                inputs["input_ids"],
                max_length=max_length,
                num_return_sequences=1,
                temperature=0.7,
                do_sample=True
            )
            response = self.tokenizer.decode(outputs[0], skip_special_tokens=True)
            return response
        except Exception as e:
            print(f"Error generating response: {str(e)}")
            return f"Error generating response: {str(e)}"

    def set_custom_provider(self, provider_name, api_key):
        """
        Configure a custom AI provider if user provides API key
        Currently supports: 'openai', 'anthropic'
        """
        if not api_key:
            print("No API key provided, using default open-source model")
            return

        if provider_name == "openai":
            # Implementation for OpenAI
            pass
        elif provider_name == "anthropic":
            # Implementation for Anthropic
            pass
        else:
            print(f"Unsupported provider: {provider_name}, using default model")