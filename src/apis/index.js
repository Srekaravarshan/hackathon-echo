import axios from 'axios';

const BASE_URL = 'http://localhost:3000';

export const makeChatQuery = async (userId, query) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/chat`, {
      userId,
      query
    });
    return response.data;
  } catch (error) {
    console.error('Error making query:', error);
    throw error;
  }
};
