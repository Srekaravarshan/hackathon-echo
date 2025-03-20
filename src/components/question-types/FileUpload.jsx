import { motion } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import { Flex, Text } from '@sparrowengg/twigs-react';
import { DeleteIcon } from '@sparrowengg/twigs-react-icons';
import { useDispatch, useSelector } from 'react-redux';
import { OptionsContainer, FileInput, FileUploadButton, StyledTextareaInput } from '../StyledComponents';
import Button from '../buttons/Button';
import SubmitButton from '../buttons/SubmitButton';
import { setTyping } from '../../store/slices/surveySlice';

const FileUpload = ({ onAnswer }) => {
  const [selected, setSelected] = useState(null);
  const [text, setText] = useState('');
  const fileInputRef = useRef(null);
  const inputRef = useRef(null);
  const dispatch = useDispatch();

  const theme = useSelector((state) => state.survey.theme);
  const typing = useSelector(state => state.survey.typing);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelected(file);
    }
  };

  const handleSubmit = () => {
    if (selected || text.length > 0) {
      if (selected) {
        onAnswer(selected);
      } else {
        onAnswer(text);
      }
      // onAnswer({
      //   file: selected ? {
      //     name: selected.name,
      //     type: selected.type,
      //     size: selected.size
      //   } : null,
      //   text
      // });
    }
  };

  const handleDelete = () => {
    fileInputRef.current.value = null;
    setSelected(null);
  };

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

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.target.tagName === 'TEXTAREA') {
        return;
      }
      if (!selected) {
        if (e.key === ' ' || e.key === 'Enter') {
          e.preventDefault();
          fileInputRef.current.click();
        }
      } else {
        if (e.key === 'd') {
          handleDelete();
        }
      }
    };

    window.addEventListener('keypress', handleKeyPress);

    return () => {
      window.removeEventListener('keypress', handleKeyPress);
    };
  }, [selected]);

  return (
    <OptionsContainer className="file-upload-question">
      <Flex flexDirection="column" gap="$8" css={{ width: '100%', maxWidth: '400px' }} className="file-upload-question-container">
        <FileInput
          type="file"
          id="file-upload"
          onChange={handleFileChange}
          ref={fileInputRef}
          className="file-upload-input"
        />
        {!selected && <FileUploadButton
          htmlFor="file-upload"
          as={motion.label}
          whileTap={{ scale: 0.95 }}
          primaryColor={theme?.primaryColor}
          className="file-upload-button"
        >
          Click or drag to upload file
        </FileUploadButton>}
        
        {selected && (
          <Flex 
            css={{
              padding: '1rem',
              border: `2px solid ${theme?.primaryColor}`,
              borderRadius: '8px',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '100%',
              height: '100px',
              maxWidth: '260px',
            }}
            className="file-upload-file-container"
          >
            <Text css={{ color: theme?.primaryColor }} truncate>{selected.name}</Text>
            <Button 
              size="sm"
              variant="ghost"
              onClick={handleDelete}
              css={{ 
                height: 'auto',
              }}
              className="file-upload-delete-button"
            >
              <DeleteIcon size="20" />
            </Button>
          </Flex>
        )}

        {!selected && <StyledTextareaInput
          ref={inputRef}
          placeholder="Type here..." 
          value={text} 
          onKeyDown={onKeyDown}
          onChange={onChange} 
          style={{ color: theme?.primaryColor }}
          className="file-upload-textarea answer-input"
        />}

        <SubmitButton
          className="file-upload-submit-button submit-button"
          disabled={!selected && text.length === 0} 
          handleSubmit={handleSubmit}
          css={{
            height: 'auto',
            position: 'unset',
          }}
        />
      </Flex>
    </OptionsContainer>
  );
};

export default FileUpload;