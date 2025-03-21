import { useState, useRef, useEffect, Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setTyping } from '../../store/slices/surveySlice';
import { StyledTextareaInput } from '../StyledComponents';
import SubmitButton from '../buttons/SubmitButton';

const TextInput = ({ onAnswer, additionalMeta }) => {
  console.log("📱 ~ TextInput ~ additionalMeta:", additionalMeta);
  const [text, setText] = useState("");
  const inputRef = useRef(null);
  const dispatch = useDispatch();

  const theme = useSelector((state) => state.survey.theme);

  const typing = useSelector((state) => state.survey.typing);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === "Enter") {
        if (text.trim().length > 0) {
          onAnswer(text);
        }
      }
    };

    window.addEventListener("keypress", handleKeyPress);

    return () => {
      window.removeEventListener("keypress", handleKeyPress);
    };
  }, [text, onAnswer]);

  const onChange = (e) => {
    setText(e.target.value);
    if (e.target.value.length === 0) dispatch(setTyping(false));
    if (e.target.value.length > 0 && !typing) dispatch(setTyping(true));

    // Auto-adjust height
    e.target.style.height = "auto";
    e.target.style.height = e.target.scrollHeight + "px";
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter") {
      if (e.shiftKey) {
        return; // Allow new line with Shift+Enter
      }
      e.preventDefault();
      if (text.trim().length > 0) {
        let finalAnswer = text;
        if (additionalMeta?.actionSuccessMessage?.actionExecutedMessage) {
          finalAnswer = `
          The action was executed successfully.
          And the user has replied ${text} for the question ${additionalMeta?.question}
        `;
        }
        onAnswer(finalAnswer);
      }
    }
  };

  return (
    <Fragment>
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
        css={{ height: "auto" }}
        disabled={text.trim().length === 0}
        handleSubmit={() => {
          if (text.trim().length > 0) {
            //   {
            //     "actionSuccessMessage": {
            //         "actionExecutedMessage": "The availability check was successful and the item is available to book."
            //     },
            //     "hasNextQuestion": true,
            //     "question": "Do you want to schedule the booking to doctor?",
            //     "type": "text"
            // }
            console.log(
              "📱 ~ <SubmitButtoncss={{height:'auto'}}disabled={text.trim ~ additionalMeta:",
              additionalMeta
            );

            let finalAnswer = text;
            if (additionalMeta?.actionSuccessMessage?.actionExecutedMessage) {
              finalAnswer = `
              The action was executed successfully.
              And the user has replied ${text} for the question ${additionalMeta?.question}
            `;
            }

            console.log(
              "📱 ~ <SubmitButtoncss={{height:'auto'}}disabled={text.trim ~ finalAnswer:",
              finalAnswer
            );

            onAnswer(finalAnswer);
          }
        }}
        className="text-input-submit-button submit-button"
      />
    </Fragment>
  );
};

export default TextInput;
