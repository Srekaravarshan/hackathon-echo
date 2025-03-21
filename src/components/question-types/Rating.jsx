import { useState, useEffect, useRef, useCallback } from 'react';
import { Flex, Box } from '@sparrowengg/twigs-react';
import { useDispatch, useSelector } from 'react-redux';
import { OptionsContainer, StyledTextareaInput } from '../StyledComponents';
import SubmitButton from '../buttons/SubmitButton';
import { setTyping } from '../../store/slices/surveySlice';

const Rating = ({ onAnswer, currentQuestion }) => {
  const [selected, setSelected] = useState(null);
  const [text, setText] = useState('');
  const inputRef = useRef(null);
  const dispatch = useDispatch();

  const typing = useSelector(state => state.survey.typing);
  const theme = useSelector((state) => state.survey.theme);

  const steps = currentQuestion.steps ?? 5;

  const handleSubmit = useCallback(() => {
    if (text.length > 0) {
      onAnswer(text);
    }
  }, [text, onAnswer]);

  const handleSelect = useCallback((num) => {
    setSelected(num);
    setTimeout(() => {
      onAnswer(num);
    }, 300);
  }, [text, onAnswer]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.target.tagName === 'TEXTAREA') {
        return;
      }
      const num = parseInt(e.key);
      if (!isNaN(num) && num >= 1 && num <= steps) {
        handleSelect(num);
      }
      if (e.key === 'Enter') {
        handleSubmit();
      }
    };

    window.addEventListener('keypress', handleKeyPress);
    
    return () => {
      window.removeEventListener('keypress', handleKeyPress);
    };
  }, [handleSubmit, handleSelect]);

  const onKeyDown = (e) => {
    if (e.key === 'Enter') {
      if (e.shiftKey) {
        return; // Allow new line with Shift+Enter
      }
      e.preventDefault();
      handleSubmit();
    }
  }

  const onChange = (e) => {
    setText(e.target.value);
    if (e.target.value.length === 0) dispatch(setTyping(false));
    if (e.target.value.length > 0 && !typing) dispatch(setTyping(true));
  }

  return (
    <OptionsContainer className="rating-question">
      <Flex flexDirection="column" gap="$8" css={{ width: '100%', maxWidth: '400px' }} className="rating-question-container">
        <Flex gap="$6" css={{ flexWrap: 'wrap' }} className='rating-option-container'>
          {Array.from({ length: steps }, (_, i) => (
            <RatingButton
              key={i}
              selected={selected === i + 1}
              onClick={() => handleSelect(i + 1)}
              className='rating-option'
            />
          ))}
        </Flex>
        <StyledTextareaInput
          ref={inputRef}
          placeholder="Type here..." 
          value={text} 
          onKeyDown={onKeyDown}
          onChange={onChange} 
          style={{ color: theme?.primaryColor }}
          className='answer-input'
        />
        <SubmitButton 
          className="rating-submit-button submit-button"
          css={{ height: 'auto' }} 
          disabled={!selected && text.length === 0} 
          handleSubmit={handleSubmit} 
        />
      </Flex>
    </OptionsContainer>
  );
};

export default Rating;

const RatingButton = ({ selected, onClick, className }) => {
  const theme = useSelector((state) => state.survey.theme);

  return (
    <Box as="button"
      onClick={onClick}
      className={className}
      css={{
        '&, &:hover, &:focus, &:active': {
          backgroundColor: 'transparent',
          border: 'none'
        },
        cursor: 'pointer',
        color: theme?.primaryColor,
        '&:hover svg path': {
          fill: selected ? theme?.primaryColor : `${theme?.primaryColor}33`
        },
        '&:active svg path': {
          fill: theme?.primaryColor
        },
        ...(selected && {
          'svg path': {
            fill: theme?.primaryColor
          }
        })
      }}
    >
      <svg width="48" height="48" viewBox="0 0 44 44">
        <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M21.108 2.09a.955.955 0 011.787 0l4.832 13.7h13.646a.955.955 0 01.62 1.68l-11.402 9.454 4.773 14.337a.955.955 0 01-1.47 1.07L22 33.606l-11.9 8.727a.955.955 0 01-1.464-1.071l4.773-14.337L2.004 17.47a.955.955 0 01.62-1.68h13.649l4.835-13.7z"></path>
      </svg>
    </Box>
  );
};