import axios from 'axios';

const BASE_URL = 'http://localhost:3000';
const SPARROW_BASE_URL = 'http://caseactivitylogs2.surveysparrow.test';

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



export const makeSubmissionEntry = async (conversationId) => {
  try {
    const response = await axios.post(`${SPARROW_BASE_URL}/api/internal/echo/submission/answers/tt-YAJiSiTku6`, {
      conversationId: conversationId,
    });
    return response.data;
  } catch (error) {
    console.error('Error making query:', error);
    throw error;
  }
};