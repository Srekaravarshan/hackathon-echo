import { useState, useEffect, useRef, useCallback } from 'react';
import { Flex } from '@sparrowengg/twigs-react';
import { useDispatch, useSelector } from 'react-redux';
import OpinionScaleButton from '../buttons/OpinionScaleButton';
import { OptionsContainer, StyledTextareaInput } from '../StyledComponents';
import SubmitButton from '../buttons/SubmitButton';
import { setTyping } from '../../store/slices/surveySlice';

const OpinionScale = ({ onAnswer, currentQuestion }) => {
  const [selected, setSelected] = useState(null);
  const [text, setText] = useState('');
  const inputRef = useRef(null);
  const dispatch = useDispatch();

  const typing = useSelector(state => state.survey.typing);
  const theme = useSelector((state) => state.survey.theme);

  const { min = 1, max = 5 } = currentQuestion.scale ?? { min: 1, max: 5 };

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
      if (!isNaN(num) && num >= min && num <= max) {
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
    <OptionsContainer>
      <Flex flexDirection="column" gap="$8" css={{ width: '100%', maxWidth: '400px' }}>
        <Flex gap="$4" css={{ flexWrap: 'wrap' }}>
          {Array.from({ length: max - min + 1 }, (_, i) => (
            <OpinionScaleButton
              key={i}
              selected={selected === min + i}
              onClick={() => handleSelect(min + i)}
            >
              {min + i}
            </OpinionScaleButton>
          ))}
        </Flex>
        <StyledTextareaInput
          ref={inputRef}
          placeholder="Type here..." 
          value={text} 
          onKeyDown={onKeyDown}
          onChange={onChange} 
          style={{ color: theme?.primaryColor }}
        />
        <SubmitButton 
          css={{ height: 'auto' }} 
          disabled={!selected && text.length === 0} 
          handleSubmit={handleSubmit} 
        />
      </Flex>
    </OptionsContainer>
  );
};

export default OpinionScale;