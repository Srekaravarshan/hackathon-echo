import { useState, useRef, useEffect, Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setTyping } from '../../store/slices/surveySlice';
import { StyledTextareaInput } from '../StyledComponents';
import SubmitButton from '../buttons/SubmitButton';

const TextInput = ({ onAnswer }) => {
  const [text, setText] = useState('');
  const inputRef = useRef(null);
  const dispatch = useDispatch();

  const { theme } = useSelector((state) => state.survey);

  const typing = useSelector(state => state.survey.typing);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const onChange = (e) => {
    setText(e.target.value);
    if (e.target.value.length === 0) dispatch(setTyping(false));
    if (e.target.value.length > 0 && !typing) dispatch(setTyping(true));
    
    // Auto-adjust height
    e.target.style.height = 'auto';
    e.target.style.height = e.target.scrollHeight + 'px';
  }

  const onKeyDown = (e) => {
    if (e.key === 'Enter') {
      if (e.shiftKey) {
        return; // Allow new line with Shift+Enter
      }
      e.preventDefault();
      if (text.trim().length > 0) {
        onAnswer(text);
      }
    }
  }

  return (
    <Fragment>
      <StyledTextareaInput
        ref={inputRef}
        placeholder="Type here..." 
        value={text} 
        onKeyDown={onKeyDown}
        onChange={onChange} 
        style={{ color: theme?.primaryColor }}
      />
      <SubmitButton css={{ height: 'auto' }} disabled={text.trim().length === 0} handleSubmit={() => {
        if (text.trim().length > 0) {
          onAnswer(text);
        }
      }} />
    </Fragment>
  );
}

export default TextInput;