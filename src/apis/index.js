import axios from 'axios';

const BASE_URL = 'http://localhost:3000';

export const makeChatQuery = async (userId, query, triggerToken) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/chat/${triggerToken}`, {
      userId,
      query
    });
    console.log("🚀 ~ makeChatQuery ~ response:", response)
    return response.data;
  } catch (error) {
    console.error('Error making query:', error);
    throw error;
  }
};
