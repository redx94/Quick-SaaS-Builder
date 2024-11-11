from typing import Optional, Dict, Any
import os
from transformers import pipeline, AutoModelForSeq2SeqLM, AutoTokenizer

class AIProvider:
    def __init__(self):
        self.model = None
        self.provider = "default"
        self.client = None
        self.initialize_default_model()

    def initialize_default_model(self) -> None:
        """Initialize the default open-source model (Mistral-7B)"""
        try:
            self.model = pipeline(
                "text2text-generation",
                model="google/flan-t5-small",
                device="cpu"
            )
            print("Successfully loaded default AI model (FLAN-T5)")
        except Exception as e:
            print(f"Error loading default model: {str(e)}")
            # Fallback to smaller model if FLAN-T5 fails
            try:
                self.model = pipeline(
                    "text2text-generation",
                    model="TinyLlama/TinyLlama-1.1B-Chat-v1.0",
                    device="cpu"
                )
                print("Successfully loaded fallback model (TinyLlama)")
            except Exception as e:
                print(f"Error loading fallback model: {str(e)}")
                raise

    def generate_response(self, prompt: str, max_length: int = 150) -> str:
        """Generate a response using the current model"""
        try:
            if self.provider == "openai":
                return self._generate_openai_response(prompt)
            
            # Default model (FLAN-T5 or TinyLlama)
            response = self.model(
                prompt,
                max_length=max_length,
                num_return_sequences=1,
                temperature=0.7,
                do_sample=True
            )
            return response[0]['generated_text']
        except Exception as e:
            error_msg = f"Error generating response: {str(e)}"
            print(error_msg)
            return error_msg

    def _generate_openai_response(self, prompt: str) -> str:
        """Generate a response using OpenAI's API"""
        try:
            response = self.client.chat.completions.create(
                model="gpt-3.5-turbo",
                messages=[
                    {"role": "system", "content": "You are a helpful assistant."},
                    {"role": "user", "content": prompt}
                ],
                temperature=0.7,
                max_tokens=150
            )
            return response.choices[0].message.content
        except Exception as e:
            error_msg = f"OpenAI API error: {str(e)}"
            print(error_msg)
            return error_msg

    def set_custom_provider(self, provider_name: str, api_key: str) -> None:
        """Configure a custom AI provider"""
        if not api_key:
            print("No API key provided, using default open-source model")
            return

        if provider_name == "openai":
            try:
                self.client = OpenAI(api_key=api_key)
                self.provider = "openai"
                print("Successfully configured OpenAI provider")
            except Exception as e:
                print(f"Error configuring OpenAI: {str(e)}")
                self.provider = "default"
        else:
            print(f"Unsupported provider: {provider_name}, using default model")
            self.provider = "default"