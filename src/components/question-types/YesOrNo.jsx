import { useState, useEffect, useRef, useCallback } from 'react';
import { YesThumbsUpIcon, NoThumbsDownIcon } from '../../assets/icons';
import { Flex } from '@sparrowengg/twigs-react';
import { useDispatch, useSelector } from 'react-redux';
import { OptionsContainer, StyledTextareaInput } from '../StyledComponents';
import YesOrNoOptionButton from '../buttons/YesOrNoOptionButton';
import SubmitButton from '../buttons/SubmitButton';
import { setTyping } from '../../store/slices/surveySlice';

const YesOrNo = ({ onAnswer }) => {
  const [selected, setSelected] = useState(null);
  const [text, setText] = useState('');
  const inputRef = useRef(null);
  const dispatch = useDispatch();
  
  const typing = useSelector(state => state.survey.typing);
  const theme = useSelector((state) => state.survey.theme);

  const handleSubmit = useCallback(() => {
    if (text.length > 0) {
      onAnswer(text);
    }
  }, [text, onAnswer]);

  const handleSelect = useCallback((option) => {
    setSelected(option);
    setTimeout(() => {
      onAnswer(option);
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
      if (e.key.toLowerCase() === 'y') {
        handleSelect('Yes');
      } else if (e.key.toLowerCase() === 'n') {
        handleSelect('No'); 
      }
    };

    window.addEventListener('keypress', handleKeyPress);
    
    return () => {
      window.removeEventListener('keypress', handleKeyPress);
    };
  }, [handleSelect]);

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
    <OptionsContainer className="yes-or-no-question">
      <Flex gap="$8" className="yes-or-no-option-container">
        <YesOrNoOptionButton className="yes-or-no-option-yes" selected={selected === 'Yes'} onClick={() => handleSelect('Yes')} icon={<YesThumbsUpIcon size="36" />} label="Yes" shortCutKey="Y" />
        <YesOrNoOptionButton className="yes-or-no-option-no" selected={selected === 'No'} onClick={() => handleSelect('No')} icon={<NoThumbsDownIcon size="36" />} label="No" shortCutKey="N" />
      </Flex>
      <StyledTextareaInput
        ref={inputRef}
        placeholder="Type here..." 
        value={text} 
        onKeyDown={onKeyDown}
        onChange={onChange} 
        style={{ color: theme?.primaryColor }}
        className="yes-or-no-textarea answer-input"
      />
      <SubmitButton css={{ height: 'auto' }} disabled={!selected && text.length === 0} handleSubmit={handleSubmit} className="yes-or-no-submit-button submit-button" />
    </OptionsContainer>
  );
};

export default YesOrNo;