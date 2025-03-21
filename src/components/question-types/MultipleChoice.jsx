import { useState, useEffect, useRef, useCallback } from 'react';
import { Flex } from '@sparrowengg/twigs-react';
import { useDispatch, useSelector } from 'react-redux';
import { OptionsContainer, Option, StyledTextareaInput } from '../StyledComponents';
import SubmitButton from '../buttons/SubmitButton';
import { setTyping } from '../../store/slices/surveySlice';

const MultipleChoice = ({ choices = [], onAnswer }) => {
  const dispatch = useDispatch();
  
  const inputRef = useRef(null);
  
  const [selected, setSelected] = useState([]);
  const [text, setText] = useState('');

  const theme = useSelector((state) => state.survey.theme);
  const typing = useSelector(state => state.survey.typing);

  const handleSelect = (option) => {
    const newSelected = selected.includes(option)
      ? selected.filter(item => item !== option)
      : [...selected, option];
    setSelected(newSelected);
  };

  const handleSubmit = useCallback(() => {
    if (text.length > 0 || selected.length > 0) {
      onAnswer(selected.join(', ') + ((selected.length > 0 && text) ? ', ' : '') + text);
    }
  }, [text, onAnswer, selected]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'Enter') {
        handleSubmit();
      }
    };

    window.addEventListener('keypress', handleKeyPress);

    return () => {
      window.removeEventListener('keypress', handleKeyPress);
    };
  }, [handleSubmit]);

  const onChange = (e) => {
    setText(e.target.value);
    if (e.target.value.length === 0) dispatch(setTyping(false));
    if (e.target.value.length > 0 && !typing) dispatch(setTyping(true));
  }

  const onKeyDown = (e) => {
    if (e.key === 'Enter') {
      if (e.shiftKey) {
        return; // Allow new line with Shift+Enter
      }
      e.preventDefault();
      handleSubmit();
    }
  }

  return (
    <OptionsContainer className="multiple-choice-question">
      <Flex gap="$4" css={{ flexWrap: 'wrap' }} className="multiple-choice-option-container">
        {choices.map((option, index) => (
          <Option
            key={index}
            className={`choice-option ${selected.includes(option) ? 'selected-choice-option' : ''}`}
            selected={selected.includes(option)}
            onClick={() => handleSelect(option)}
            whileTap={{ scale: 0.95 }}
            style={{ color: selected.includes(option) ? theme?.secondaryColor : theme?.primaryColor }}
            primaryColor={theme?.primaryColor}
          >
            {option}
            {/* <ShortcutKey css={{ marginLeft: '$4', textTransform: 'uppercase' }}>{NumAlphaMapping[index + 1]}</ShortcutKey> */}
          </Option>
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
      <SubmitButton css={{ height: 'auto' }} disabled={selected.length === 0 && text.length === 0} handleSubmit={handleSubmit} className="multiple-choice-submit-button submit-button" />
    </OptionsContainer>
  );
};

export default MultipleChoice;