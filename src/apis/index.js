import axios from 'axios';

const BASE_URL = 'http://localhost:3000';
const SPARROW_BASE_URL = 'http://caseactivitylogs2.surveysparrow.test';

export const makeChatQuery = async (userId, query, tokenId) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/chat`, {
      userId,
      query,
      tokenId
    });
    return response.data;
  } catch (error) {
    console.error('Error making query:', error);
    throw error;
  }
};



export const makeSubmissionEntry = async (conversationId, tokenId) => {
  try {
    const response = await axios.post(`${SPARROW_BASE_URL}/api/internal/echo/submission/answers/${tokenId}`, {
      conversationId: conversationId,
    });
    return response.data;
  } catch (error) {
    console.error('Error making query:', error);
    throw error;
  }
};


export const getWelcomeMessage = async (tokenId) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/chat/getWelcomeMessage`, {
      tokenId: tokenId,
    });
    return response.data;
  } catch (error) {
    console.error('Error making query:', error);
    throw error;
  }
};

export const executeAction = async ({
  action,
  actionMeta,
  userId
}) => {
  const response = await axios.post(`${BASE_URL}/api/chat/executeAction`, {
    action,
    actionMeta,
    userId
  });
  return response.data;
}