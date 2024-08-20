const topics = [
  'product idea',
  'target audience',
  'key features',
  'monetization',
  'tech stack',
  'marketing strategy',
  'user onboarding',
  'scalability',
  'security',
  'customer support',
  'analytics',
  'legal considerations',
];

const responses = {
  'product idea': [
    "Ooh, that's such a cool idea, bestie! 🌟 Have you thought about how it might solve a specific problem for your users?",
    "Love where you're going with this! 💖 What inspired you to come up with this particular SaaS product?",
    "Yasss! This could be huge! 🚀 How do you see it standing out from similar products in the market?",
  ],
  'target audience': [
    "Smart thinking about your audience! 🎯 Have you considered creating user personas to really get to know your potential customers?",
    "Ooh, interesting target market! 🧐 What kind of research have you done (or plan to do) to understand their needs better?",
    "You're so on point with your audience choice! 👏 How do you think their needs might evolve in the future?",
  ],
  'key features': [
    "These features sound amazing, bestie! 🌈 Which one do you think will be your product's biggest selling point?",
    "Wow, you've really thought this through! 🤓 Have you considered how these features might work together to create a seamless user experience?",
    "Your feature list is fire! 🔥 Are there any additional features you're considering for future updates?",
  ],
  'monetization': [
    "Ooh, let's talk money, honey! 💰 Have you thought about different pricing tiers for different types of users?",
    "Your monetization strategy is looking good! 🤑 Have you considered offering a free trial to hook potential customers?",
    "Smart thinking on the money front! 💸 How do you plan to communicate the value of your product to justify the pricing?",
  ],
  'tech stack': [
    "Tech talk time! 🖥️ How did you choose these particular technologies for your stack?",
    "Your tech choices are so cool! 😎 Have you thought about how they'll help you scale in the future?",
    "Ooh, I love your tech stack! 🚀 Are there any new technologies you're excited to incorporate as you grow?",
  ],
  'marketing strategy': [
    "Your marketing ideas are brilliant! ✨ Have you thought about using influencer partnerships to spread the word?",
    "Love your marketing approach! 📣 How do you plan to measure the success of your different marketing channels?",
    "Your marketing strategy is on point! 🎯 Have you considered content marketing to establish your brand as a thought leader?",
  ],
  'user onboarding': [
    "Onboarding is so crucial, and you're nailing it! 🌟 Have you thought about creating interactive tutorials to guide new users?",
    "Your onboarding process sounds smooth! 😎 How do you plan to gather feedback from users to keep improving it?",
    "I'm loving your onboarding ideas! 🚀 Have you considered personalizing the onboarding experience based on user roles or needs?",
  ],
  'scalability': [
    "Thinking about scalability already? You're so smart! 🧠 Have you considered using microservices architecture for easier scaling?",
    "Your scalability plan is looking solid! 💪 How do you plan to handle sudden spikes in user activity?",
    "You're really thinking ahead with scalability! 🚀 Have you looked into auto-scaling solutions to manage resources efficiently?",
  ],
  'security': [
    "Security is so important, and you're on top of it! 🛡️ Have you considered implementing two-factor authentication?",
    "Your security measures sound robust! 🔒 How do you plan to keep user data encrypted both in transit and at rest?",
    "I'm impressed with your security thinking! 🕵️‍♀️ Have you thought about regular security audits and penetration testing?",
  ],
  'customer support': [
    "Your customer support ideas are so thoughtful! 💖 Have you considered implementing a chatbot for 24/7 basic support?",
    "Love your approach to customer support! 🌟 How do you plan to gather and act on customer feedback?",
    "You're really prioritizing your customers, I love it! 🙌 Have you thought about creating a knowledge base or FAQ section?",
  ],
  'analytics': [
    "Ooh, let's talk data! 📊 Have you considered which key performance indicators (KPIs) you'll be tracking?",
    "Your analytics approach is so smart! 🧠 How do you plan to use the data you collect to improve your product?",
    "I'm loving your focus on analytics! 🔍 Have you thought about implementing A/B testing to optimize your features?",
  ],
  'legal considerations': [
    "You're so on top of the legal stuff, I'm impressed! ⚖️ Have you looked into GDPR compliance for handling user data?",
    "Great thinking on the legal front! 📜 How do you plan to handle intellectual property protection for your SaaS?",
    "You're really covering all the bases with legal considerations! 🏛️ Have you thought about creating clear terms of service and privacy policies?",
  ],
};

let currentTopicIndex = 0;

export const getBrainstormResponse = (message, previousMessages) => {
  const lowercaseMessage = message.toLowerCase();
  const currentTopic = topics[currentTopicIndex];
  const topicResponses = responses[currentTopic];
  
  let response = topicResponses[Math.floor(Math.random() * topicResponses.length)];
  
  currentTopicIndex++;
  
  if (currentTopicIndex < topics.length) {
    const nextTopic = topics[currentTopicIndex];
    response += `\n\nNow, let's chat about ${nextTopic}! ${getTopicPrompt(nextTopic)}`;
  }
  
  const isComplete = currentTopicIndex >= topics.length;
  
  if (isComplete) {
    response += "\n\nWow, bestie! We've covered so much ground together! 🎉 I think we've got a solid plan for your SaaS product. Are you ready to submit this amazing plan and join our waitlist? Hit that 'Submit My SaaS Plan!' button when you're ready!";
    currentTopicIndex = 0; // Reset for next session
  }
  
  return { message: response, isComplete };
};

const getTopicPrompt = (topic) => {
  switch (topic) {
    case 'product idea':
      return "What's the main problem your SaaS is going to solve?";
    case 'target audience':
      return "Who do you see as the primary users of your product?";
    case 'key features':
      return "What are the must-have features for your MVP (Minimum Viable Product)?";
    case 'monetization':
      return "How are you thinking of pricing your product?";
    case 'tech stack':
      return "What technologies are you considering for building your SaaS?";
    case 'marketing strategy':
      return "How do you plan to get the word out about your awesome product?";
    case 'user onboarding':
      return "How will you introduce new users to your product?";
    case 'scalability':
      return "How do you see your product growing and scaling over time?";
    case 'security':
      return "What measures are you considering to keep your users' data safe?";
    case 'customer support':
      return "How do you plan to provide support to your users?";
    case 'analytics':
      return "What kind of data do you want to track to measure your product's success?";
    case 'legal considerations':
      return "Have you thought about any legal aspects of running your SaaS?";
    default:
      return "What are your thoughts on this?";
  }
};