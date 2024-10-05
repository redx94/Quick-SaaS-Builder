import axios from 'axios';

export const getAIResponse = async (message) => {
  try {
    const response = await axios.post('/generate_idea', { input: message });
    return response.data.response;
  } catch (error) {
    console.error('Error fetching AI response:', error);
    return "I apologize, but I'm having trouble processing your request at the moment. Could you please try again?";
  }
};