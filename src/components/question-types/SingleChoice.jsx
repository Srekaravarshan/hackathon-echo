import { useState, useEffect, useRef, useCallback } from 'react';
import { Flex } from '@sparrowengg/twigs-react';
import { useDispatch, useSelector } from 'react-redux';
import { OptionsContainer, Option, StyledTextareaInput } from '../StyledComponents';
import SubmitButton from '../buttons/SubmitButton';
import { setTyping } from '../../store/slices/surveySlice';

const SingleChoice = ({ choices = [], onAnswer }) => {
  const [selected, setSelected] = useState(null);
  const dispatch = useDispatch();
  
  const inputRef = useRef(null);
  
  const [text, setText] = useState('');

  const typing = useSelector(state => state.survey.typing);
  const theme = useSelector((state) => state.survey.theme);

  const handleSelect = (option) => {
    setSelected(option);
    setTimeout(() => {
      onAnswer(option);
    }, 300);
  };

  const handleSubmit = useCallback(() => {
    if (text.length > 0) {
      onAnswer(text);
    }
  }, [text, onAnswer]);

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
    <OptionsContainer className="single-choice-question">
      <Flex gap="$4" css={{ flexWrap: 'wrap' }} className="single-choice-option-container">
        {choices.map((option, index) => (
          <Option
            key={index}
            selected={selected === option}
            onClick={() => handleSelect(option)}
            whileTap={{ scale: 0.95 }}
            style={{ color: selected === option ? theme?.secondaryColor : theme?.primaryColor }}
            primaryColor={theme?.primaryColor}
            className="single-choice-option choice-option"
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
        className="single-choice-textarea answer-input"
      />
      <SubmitButton css={{ height: 'auto' }} disabled={!selected && text.length === 0} handleSubmit={handleSubmit} className="single-choice-submit-button submit-button" />
    </OptionsContainer>
  );
};

export default SingleChoice;