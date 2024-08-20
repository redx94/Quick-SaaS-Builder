const topics = {
  backend: [
    "Let's start by setting up your backend infrastructure. What's your preferred programming language?",
    "For your API, would you like to use REST or GraphQL?",
    "Let's discuss database options. Are you leaning towards SQL or NoSQL?",
  ],
  frontend: [
    "For the frontend, are you interested in using React, Vue, or Angular?",
    "Let's talk about state management. Do you prefer Redux, MobX, or something else?",
    "Would you like to use a UI component library like Material-UI or Tailwind CSS?",
  ],
  payment: [
    "For payment processing, shall we integrate Stripe, PayPal, or another provider?",
    "Do you need to handle recurring subscriptions or just one-time payments?",
    "Let's discuss currency options. Will you be operating internationally?",
  ],
  marketing: [
    "For marketing, would you like to integrate email campaigns, social media, or both?",
    "Let's talk about analytics. Are you familiar with tools like Google Analytics or Mixpanel?",
    "Do you want to implement a referral program for your SaaS?",
  ],
};

export const getAIResponse = (message) => {
  const lowercaseMessage = message.toLowerCase();
  let category = null;

  if (lowercaseMessage.includes('backend') || lowercaseMessage.includes('api') || lowercaseMessage.includes('database')) {
    category = 'backend';
  } else if (lowercaseMessage.includes('frontend') || lowercaseMessage.includes('ui') || lowercaseMessage.includes('design')) {
    category = 'frontend';
  } else if (lowercaseMessage.includes('payment') || lowercaseMessage.includes('billing') || lowercaseMessage.includes('subscription')) {
    category = 'payment';
  } else if (lowercaseMessage.includes('marketing') || lowercaseMessage.includes('advertising') || lowercaseMessage.includes('promotion')) {
    category = 'marketing';
  }

  if (category) {
    const responses = topics[category];
    return responses[Math.floor(Math.random() * responses.length)];
  }

  return "I understand you're looking to build a SaaS product. Could you provide more details about which aspect you'd like to focus on? Backend, frontend, payment processing, or marketing?";
};