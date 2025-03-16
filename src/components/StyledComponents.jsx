import { motion } from 'framer-motion';
import styled from '@emotion/styled';

// Styled components
export const SurveyContainer = styled(motion.div)`
  height: 100%;
  width: 100%;
  overflow: scroll;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const ChatSurveyContainer = styled(motion.div)`
  height: 100%;
  width: 100%;
  overflow: scroll;
  ${'' /* display: flex; */}
  ${'' /* flex-direction: column; */}
`;

export const QuestionContainer = styled(motion.div)`
  margin-bottom: 2rem;
  font-size: 1.2rem;
`;

export const OptionsContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const Button = styled(motion.button)`
  padding: 1rem 2rem;
  border: none;
  border-radius: 8px;
  background: #007AFF;
  color: white;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #0056b3;
  }
`;

export const ChatInput = styled.input`
  width: 100%;
  padding: 1rem;
  border: 2px solid #ddd;
  border-radius: 8px;
  margin-top: 1rem;
  font-size: 1rem;
`;

export const LoadingContainer = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
  font-size: 1.2rem;
  color: #007AFF;
`;
