import { motion } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import { Flex, Text } from '@sparrowengg/twigs-react';
import { DeleteIcon } from '@sparrowengg/twigs-react-icons';
import { useSelector } from 'react-redux';
import { OptionsContainer, FileInput, FileUploadButton } from '../StyledComponents';
import Button from '../buttons/Button';
import SubmitButton from '../buttons/SubmitButton';

const FileUpload = ({ onAnswer }) => {
  const [selected, setSelected] = useState(null);
  const fileInputRef = useRef(null);

  const { theme } = useSelector((state) => state.survey);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelected(file);
    }
  };

  const handleSubmit = () => {
    if (selected) {
      onAnswer({
        name: selected.name,
        type: selected.type,
        size: selected.size
      });
    }
  };

  const handleDelete = () => {
    fileInputRef.current.value = null;
    setSelected(null);
  };
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (!selected) {
        if (e.key === ' ' || e.key === 'Enter') {
          e.preventDefault();
          fileInputRef.current.click();
        }
      } else {
        if (e.key === 'd') {
          handleDelete();
        } else if (e.key === 'Enter') {
          handleSubmit();
        }
      }
    };

    window.addEventListener('keypress', handleKeyPress);

    return () => {
      window.removeEventListener('keypress', handleKeyPress);
    };
  }, [selected]);

  return (
    <OptionsContainer>
      <FileInput
        type="file"
        id="file-upload"
        onChange={handleFileChange}
        ref={fileInputRef}
      />
      {!selected && <FileUploadButton
        htmlFor="file-upload"
        as={motion.label}
        whileTap={{ scale: 0.95 }}
        primaryColor={theme?.primaryColor}
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
        >
          <Text css={{ color: theme?.primaryColor }} truncate>{selected.name}</Text>
          <Button 
            size="sm"
            variant="ghost"
            onClick={handleDelete}
            css={{ 
              height: 'auto',
            }}
          >
            <DeleteIcon size="20" />
          </Button>
        </Flex>
      )}

      <SubmitButton
        disabled={!selected} 
        handleSubmit={handleSubmit}
        css={{
          height: 'auto',
          position: 'unset',
        }}
      />
    </OptionsContainer>
  );
};

export default FileUpload;