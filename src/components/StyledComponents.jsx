import { motion } from 'framer-motion';
import styled from '@emotion/styled';
import { styled as TwigsStyled } from '@sparrowengg/twigs-react';

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
  flex-wrap: wrap;
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

export const Option = styled(motion.button)`
  padding: 1rem;
  border: 2px solid ${props => props.primaryColor};
  border-radius: 8px;
  background: ${props => props.selected ? `${props.primaryColor}e6` : 'transparent'};
  color: ${props => props.selected ? 'white' : props.primaryColor};
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-weight: 500;
  opacity: ${props => props.disabled ? 0 : 1};
  text-align: left;
  &:hover {
    background: ${props => props.selected ? `${props.primaryColor}` : `${props.primaryColor}1A`};
    color: ${props => props.selected ? 'white' : props.primaryColor};
  }

  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
`;

export const FileInput = styled.input`
  display: none;
`;

export const FileUploadButton = styled(motion.label)`
  display: inline-block;
  padding: 1rem 0;
  border: 2px dashed ${props => props.primaryColor};
  border-radius: 8px;
  background: transparent;
  color: ${props => props.primaryColor};
  font-size: 1rem;
  cursor: pointer;
  text-align: center;
  transition: all 0.2s ease;
  width: 100%;
  max-width: 260px;
  height: 100px;
  align-content: center;

  &:hover {
    background: rgba(${props => props.primaryColor}, 0.1);
  }
`;


export const StyledTextareaInput = TwigsStyled('textarea', {
  width: '100%',
  resize: 'none',
  fontSize: '24px',
  backgroundColor: 'transparent',
  '&, &:focus, &:active, &:focus-visible': {
    border: 'none',
    outline: 'none',
  }
})