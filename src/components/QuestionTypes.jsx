import { motion } from 'framer-motion';
import styled from '@emotion/styled';
import { useState, useRef, useEffect, Fragment } from 'react';
import { YesThumbsUpIcon, NoThumbsDownIcon } from '../assets/icons';
import { Button as TwigsButton, Flex, Text, styled as TwigsStyled } from '@sparrowengg/twigs-react';
// import { primaryColor, secondaryColor } from '../themes/colors';
import { DeleteIcon, EnterIcon, ResetIcon } from '@sparrowengg/twigs-react-icons';
import { useSelector, useDispatch } from 'react-redux';
import { setTyping } from '../store/slices/surveySlice';
import { PlayIcon, PauseIcon } from '../assets/icons';

const OptionsContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Option = styled(motion.button)`
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

const FileInput = styled.input`
  display: none;
`;

const FileUploadButton = styled(motion.label)`
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

const AlphaNumMapping = {
  a: 1,
  b: 2,
  c: 3,
  d: 4,
  e: 5,
  f: 6,
  g: 7,
  h: 8,
  i: 9,
  j: 10,
  k: 11,
  l: 12,
  m: 13,
  n: 14,
  o: 15,
  p: 16,
  q: 17,
  r: 18,
  s: 19,
  t: 20,
  u: 21,
  v: 22,
  w: 23,
  x: 24,
  y: 25,
  z: 26,
}

const NumAlphaMapping = Object.fromEntries(Object.entries(AlphaNumMapping).map(([key, value]) => [value, key]));

export const MultipleChoice = ({ choices = [], onAnswer }) => {
  const [selected, setSelected] = useState([]);

  const { theme } = useSelector((state) => state.survey);

  const handleSelect = (option) => {
    const newSelected = selected.includes(option)
      ? selected.filter(item => item !== option)
      : [...selected, option];
    setSelected(newSelected);
  };

  const handleSubmit = () => {
    if (selected.length > 0) {
      onAnswer(selected);
    }
  };

  useEffect(() => {
    const handleKeyPress = (e) => {
      const num = AlphaNumMapping[e.key.toLowerCase()];
      if (num >= 1 && num <= choices.length) {
        const newSelected = selected.includes(choices[num - 1])
          ? selected.filter(item => item !== choices[num - 1])
          : [...selected, choices[num - 1]];
        setSelected(newSelected);
      }
      if (e.key.toLowerCase() === 'enter') {
        if (selected.length > 0) {
          onAnswer(selected);
        }
      }
    };

    window.addEventListener('keypress', handleKeyPress);
    
    return () => {
      window.removeEventListener('keypress', handleKeyPress);
    };
  }, [choices, selected, onAnswer]);

  return (
    <OptionsContainer>
      <Flex gap="$4" css={{ flexWrap: 'wrap' }}>
        {choices.map((option, index) => (
          <Option
            key={index}
            selected={selected.includes(option)}
            onClick={() => handleSelect(option)}
            whileTap={{ scale: 0.95 }}
            style={{ color: selected.includes(option) ? theme?.secondaryColor : theme?.primaryColor }}
            primaryColor={theme?.primaryColor}
          >
            {option}
            <ShortcutKey css={{ marginLeft: '$4', textTransform: 'uppercase' }}>{NumAlphaMapping[index + 1]}</ShortcutKey>
          </Option>
        ))}
      </Flex>
      <SubmitButton css={{ height: 'auto' }} disabled={selected.length === 0} handleSubmit={handleSubmit} />
    </OptionsContainer>
  );
};

const SubmitButton = ({ disabled, handleSubmit, css = {}, children }) => {
  return (
    <Button
      onClick={handleSubmit}
      disabled={disabled}
      css={{
        position: 'fixed',
        bottom: '24px',
        left: 'auto',
        right: '24px',
        opacity: !disabled ? 1 : '0 !important',
        ...css,
        '.twigs-button__content': {
          '& > p': {
            maxWidth: '0px',
            opacity: 0,
            transition: 'max-width 0.2s ease',
            ...css?.['.twigs-button__content']?.['& > p'],
          },
          ...css?.['.twigs-button__content'],
        },
        '&, &:hover, &:focus, &:active, &:focus-visible': {
          '.twigs-button__content > p': {
            maxWidth: '60px',
            opacity: 1,
            ...css?.['&:hover, &:focus, &:focus-visible']?.['.twigs-button__content > p'],
          },
          ...css?.['&:hover, &:focus, &:focus-visible'],
        },
      }}
    >
      {children ? children : <Fragment>
        <Text css={{ fontSize: 'inherit', fontWeight: 'inherit', color: 'inherit' }}>Submit&nbsp;</Text>
        {/* Submit */}
        <ShortcutKey css={{
          textTransform: 'uppercase', height: 'auto', width: 'auto',
          'p': { lineHeight: '0' },
          'svg path': { strokeWidth: '2px' },
        }}
        ><EnterIcon size="20"/></ShortcutKey>
      </Fragment>}
    </Button>
  );
};

const Button = ({ children, onClick, disabled, css, ...props }) => {
  const { theme } = useSelector((state) => state.survey);

  return (
    <TwigsButton
      onClick={onClick}
      disabled={disabled}
      {...props}
      css={{
        width: 'fit-content',
        // height: 'auto',
        border: 'none',
        padding: '$4',
        borderRadius: '8px',
        ...css,
        '.twigs-button__content': {
          flexDirection: 'row',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '$1',
          ...css?.['.twigs-button__content'],
        },
        ...(props.variant === 'ghost' ? {
          backgroundColor: css?.['backgroundColor'] || 'transparent !important',
          color: css?.['color'] || `${theme?.primaryColor} !important`,
        } : {
          backgroundColor: css?.['backgroundColor'] || `${theme?.primaryColor} !important`,
          color: css?.['color'] || `${theme?.secondaryColor} !important`,
        }),

        '&:hover, &:focus, &:active, &:focus-visible': {
          scale: 1.05,
          ...(props.variant === 'ghost' ? {
            backgroundColor: `${theme?.primaryColor}1a !important`,
            color: `${theme?.primaryColor} !important`,
          } : {
            // backgroundColor: css?.['backgroundColor'] || `${primaryColor} !important`,
            // color: css?.['color'] || `${secondaryColor} !important`,
          }),
          ...css?.['&:hover, &:focus, &:active, &:focus-visible'],
        },
      }}
    >
    {children}
    </TwigsButton>
  );
}
export const SingleChoice = ({ choices = [], onAnswer }) => {
  const [selected, setSelected] = useState(null);

  const { theme } = useSelector((state) => state.survey);

  const handleSelect = (option) => {
    setSelected(option === selected ? null : option);
  };

  const handleSubmit = () => {
    if (selected) {
      onAnswer(selected);
    }
  };

  useEffect(() => {
    const handleKeyPress = (e) => {
      const num = AlphaNumMapping[e.key.toLowerCase()];
      if (num >= 1 && num <= choices.length) {
        const option = choices[num - 1];
        setSelected(option === selected ? null : option);
      }
      if (e.key.toLowerCase() === 'enter') {
        if (selected) {
          onAnswer(selected);
        }
      }
    };

    window.addEventListener('keypress', handleKeyPress);
    
    return () => {
      window.removeEventListener('keypress', handleKeyPress);
    };
  }, [choices, selected, onAnswer]);

  return (
    <OptionsContainer>
      <Flex gap="$4" css={{ flexWrap: 'wrap' }}>
        {choices.map((option, index) => (
          <Option
            key={index}
            selected={selected === option}
            onClick={() => handleSelect(option)}
            whileTap={{ scale: 0.95 }}
            style={{ color: selected === option ? theme?.secondaryColor : theme?.primaryColor }}
            primaryColor={theme?.primaryColor}
          >
            {option}
            <ShortcutKey css={{ marginLeft: '$4', textTransform: 'uppercase' }}>{NumAlphaMapping[index + 1]}</ShortcutKey>
          </Option>
        ))}
      </Flex>
      <SubmitButton css={{ height: 'auto' }} disabled={!selected} handleSubmit={handleSubmit} />
    </OptionsContainer>
  );
};

export const Message = ({ onAnswer }) => {

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'Enter') {
        onAnswer();
      }
    };

    window.addEventListener('keypress', handleKeyPress);

    return () => {
      window.removeEventListener('keypress', handleKeyPress);
    };
  }, [onAnswer]);

  return (
    <OptionsContainer>
      <Button onClick={() => onAnswer()} css={{
        position: 'unset',
        height: 'auto',
      }}>
        <Text css={{ fontSize: 'inherit', fontWeight: 'inherit', color: 'inherit' }}>Next&nbsp;</Text>
        {/* Submit */}
        <ShortcutKey css={{
          textTransform: 'uppercase', height: 'auto', width: 'auto',
          'p': { lineHeight: '0' },
          'svg path': { strokeWidth: '2px' },
        }}
        ><EnterIcon size="20"/></ShortcutKey>
      </Button>
    </OptionsContainer>
  );
};
export const FileUpload = ({ onAnswer }) => {
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
export const Audio = ({ onAnswer }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [hasRecording, setHasRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const mediaRecorder = useRef(null);
  const chunks = useRef([]);
  const audioRef = useRef(null);
  const progressInterval = useRef(null);

  const { theme } = useSelector((state) => state.survey);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorder.current = new MediaRecorder(stream);
      chunks.current = [];
      
      mediaRecorder.current.ondataavailable = (e) => {
        chunks.current.push(e.data);
      };

      mediaRecorder.current.onstop = () => {
        const blob = new Blob(chunks.current, { type: 'audio/webm' });
        const audioUrl = URL.createObjectURL(blob);
        audioRef.current = document.createElement('audio');
        audioRef.current.src = audioUrl;
        setHasRecording(true);
      };

      mediaRecorder.current.start();
      setIsRecording(true);
    } catch (err) {
      console.error('Error accessing microphone:', err);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder.current && isRecording) {
      mediaRecorder.current.stop();
      setIsRecording(false);
      mediaRecorder.current.stream.getTracks().forEach(track => track.stop());
      setHasRecording(true);
    }
  };

  const playRecording = () => {
    if (audioRef.current) {
      audioRef.current.play();
      setIsPlaying(true);
      
      progressInterval.current = setInterval(() => {
        const progress = (audioRef.current.currentTime / audioRef.current.duration) * 100;
        setProgress(progress);
      }, 100);

      audioRef.current.onended = () => {
        setIsPlaying(false);
        setProgress(0);
        clearInterval(progressInterval.current);
      };
    }
  };

  const pauseRecording = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
      clearInterval(progressInterval.current);
    }
  };

  const resetRecording = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
      chunks.current = [];
      setHasRecording(false);
      setIsPlaying(false);
      setProgress(0);
      clearInterval(progressInterval.current);
    }
  };

  const handleProgressChange = (e) => {
    if (audioRef.current) {
      const newTime = (e.target.value / 100) * audioRef.current.duration;
      audioRef.current.currentTime = newTime;
      setProgress(e.target.value);
    }
  };

  const handleSubmit = () => {
    const blob = new Blob(chunks.current, { type: 'audio/webm' });
    onAnswer(blob);
  };

  useEffect(() => {
    const handleKeyPress = (e) => {
      // Prevent triggering if user is typing in an input
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
        return;
      }

      if (!hasRecording) {
        // Space or Enter to start/stop recording
        if (e.code === 'Space' || e.code === 'Enter') {
          e.preventDefault();
          if (isRecording) {
            stopRecording();
          } else {
            startRecording();
          }
        }
      } else {
        // Space to play/pause
        if (e.code === 'Space') {
          e.preventDefault();
          if (isPlaying) {
            pauseRecording();
          } else {
            playRecording();
          }
        }
        // R to reset
        if (e.code === 'KeyR') {
          e.preventDefault();
          resetRecording();
        }
        // Enter to submit
        if (e.code === 'Enter') {
          e.preventDefault();
          handleSubmit();
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [hasRecording, isRecording, isPlaying]);

  return (
    <OptionsContainer>
      {!hasRecording ? (
        <Button
          onClick={isRecording ? stopRecording : startRecording}
          css={{
            height: 'auto',
            ...(isRecording && {
              '&, &:hover, &:focus, &:active, &:focus-visible': {
                backgroundColor: '#ff4444 !important',
                color: theme?.primaryColor,
              }
            })
          }}
        >
          {isRecording ? '⏹ Stop Recording' : '🎤 Start Recording'}
        </Button>
      ) : (
        <>
          <Flex flexDirection="column" gap="$8" css={{ width: '100%', maxWidth: '400px' }}>
            <Flex gap="$4" css={{ width: '100%', backgroundColor: `${theme?.primaryColor}1A`, borderRadius: '$pill' }} alignItems="center">
              <Button
                onClick={isPlaying ? pauseRecording : playRecording}
                css={{ height: 'auto', flex: '0 0 auto', borderRadius: '$pill', color: theme?.primaryColor, backgroundColor: 'transparent !important' }}
              >
                {isPlaying ? <PauseIcon size="24" /> : <PlayIcon size="24" />}
              </Button>
              <input
                type="range"
                min="0"
                max="100"
                value={progress}
                onChange={handleProgressChange}
                style={{
                  flex: '1',
                  height: '10px',
                  borderRadius: '5px',
                  accentColor: theme?.primaryColor
                }}
              />
              <Button
                onClick={resetRecording}
                css={{ height: 'auto', flex: '0 0 auto', borderRadius: '$pill', color: theme?.primaryColor, backgroundColor: 'transparent !important' }}
              >
                <ResetIcon size="24" />
              </Button>
            </Flex>
            <SubmitButton 
              handleSubmit={handleSubmit}
              css={{
                height: 'auto',
                '.twigs-button__content': {
                  '& > p': {
                    maxWidth: 'auto',
                  }
                },
                position: 'unset',
              }}
            />
          </Flex>
        </>
      )}
    </OptionsContainer>
  );
};

export const YesOrNo = ({ onAnswer }) => {

  const [selected, setSelected] = useState(null);

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key.toLowerCase() === 'y') {
        setSelected('Yes');
      } else if (e.key.toLowerCase() === 'n') {
        setSelected('No'); 
      }
      if (e.key === 'Enter') {
        if (selected) {
          onAnswer(selected);
        }
      }
    };

    window.addEventListener('keypress', handleKeyPress);
    
    return () => {
      window.removeEventListener('keypress', handleKeyPress);
    };
  }, [onAnswer, selected]);

  return (
    <OptionsContainer>
      <Flex gap="$8">
        <YesOrNoOptionButton selected={selected === 'Yes'} onClick={() => setSelected('Yes')} icon={<YesThumbsUpIcon size="36" />} label="Yes" shortCutKey="Y" />
        <YesOrNoOptionButton selected={selected === 'No'} onClick={() => setSelected('No')} icon={<NoThumbsDownIcon size="36" />} label="No" shortCutKey="N" />
      </Flex>
      <SubmitButton css={{ height: 'auto' }} disabled={!selected} handleSubmit={() => {
        if (selected) {
          onAnswer(selected);
        }
      }} />
    </OptionsContainer>
  );
};


const YesOrNoOptionButton = ({ onClick, icon, label, shortCutKey, selected }) => {
  const { theme } = useSelector((state) => state.survey);

  return (
    <TwigsButton
      color="default"
      onClick={onClick}
      css={{
        height: 'auto',
        maxWidth: '100px',
        width: '100%',
        padding: '$8 $6 $6 $6',
        '.twigs-button__content': {
          flexDirection: 'column',
          width: '100%',
        },
        // padding: 1rem 2rem;
        border: `2px solid ${theme?.primaryColor}`,
        borderRadius: '8px',
        backgroundColor: selected ? `${theme?.primaryColor}e6` : 'transparent',
        color: selected ? theme?.secondaryColor : theme?.primaryColor,
        fontSize: '1rem',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        
        '&:hover, &:focus, &:active, &:focus-visible': {
          backgroundColor: selected ? `${theme?.primaryColor} !important` : `${theme?.primaryColor}1a`,
          color: selected ? `${theme?.secondaryColor} !important` : `${theme?.primaryColor} !important`,
        },
      }}
    >
      {icon}
      <Flex alignItems="center" justifyContent="space-between" css={{ marginTop: '$4', width: '100%' }}>
        <Text weight="medium" size="md">
          {label}
        </Text>
        <ShortcutKey>{shortCutKey}</ShortcutKey>
      </Flex>
    </TwigsButton>
  )
}
const ShortcutKey = ({ children, css }) => {
  const { theme } = useSelector((state) => state.survey);

  return (
    <Flex css={{ backgroundColor: `${theme?.primaryColor}`, borderRadius: '$round', height: '24px', width: '24px', ...css }} alignItems="center" justifyContent="center">
      <Text weight="bold" size="sm" className="dm-mono" css={{ color: theme?.secondaryColor, lineHeight: '1' }}>
        {children}
      </Text>
    </Flex>
  )
}
export const TextInput = ({ onAnswer }) => {
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
        primaryColor={theme?.primaryColor}
      />
      <SubmitButton css={{ height: 'auto' }} disabled={text.trim().length === 0} handleSubmit={() => {
        if (text.trim().length > 0) {
          onAnswer(text);
        }
      }} />
    </Fragment>
  );
}

const StyledTextareaInput = TwigsStyled('textarea', {
  width: '100%',
  resize: 'none',
  fontSize: '24px',
  color: (props) => props.primaryColor,
  backgroundColor: 'transparent',
  '&, &:focus, &:active, &:focus-visible': {
    border: 'none',
    outline: 'none',
  }
})

export const OpinionScale = ({ onAnswer, currentQuestion }) => {
  const [selected, setSelected] = useState(null);

  const { min = 1, max = 5 } = currentQuestion.scale ?? { min: 1, max: 5 };

  useEffect(() => {
    const handleKeyPress = (e) => {
      const num = parseInt(e.key);
      if (!isNaN(num) && num >= 1 && num <= 5) {
        setSelected(num);
        setTimeout(() => {
          onAnswer(selected);
        }, 300);
      }
      if (e.key === 'Enter' && selected) {
        onAnswer(selected);
      }
    };

    window.addEventListener('keypress', handleKeyPress);
    
    return () => {
      window.removeEventListener('keypress', handleKeyPress);
    };
  }, [selected, onAnswer]);
  return (
    <Flex gap="$4" css={{ flexWrap: 'wrap' }}>
      {Array.from({ length: max - min + 1 }, (_, i) => (
        <OpinionScaleButton
          key={i}
          selected={selected === min + i}
          onClick={() => {
            setSelected(min + i);
            setTimeout(() => {
              onAnswer(min + i);
            }, 300);
          }}
        >
          {min + i}
        </OpinionScaleButton>
      ))}
      {/* <OpinionScaleButton selected={selected === 1} onClick={() => setSelected(1)}>1</OpinionScaleButton>
      <OpinionScaleButton selected={selected === 2} onClick={() => setSelected(2)}>2</OpinionScaleButton>
      <OpinionScaleButton selected={selected === 3} onClick={() => setSelected(3)}>3</OpinionScaleButton>
      <OpinionScaleButton selected={selected === 4} onClick={() => setSelected(4)}>4</OpinionScaleButton>
      <OpinionScaleButton selected={selected === 5} onClick={() => setSelected(5)}>5</OpinionScaleButton> */}
    </Flex>
  )
};

const OpinionScaleButton = ({ children, css = {}, selected, ...props }) => {
  const { theme } = useSelector((state) => state.survey);

  return (
    <Button
      size="lg" color="default" variant="ghost"
      {...props}
      css={{
        ...css,
        flexShrink: 0,
        backgroundColor: selected ? `${theme?.primaryColor} !important` : 'transparent',
        color: selected ? `${theme?.secondaryColor} !important` : `${theme?.primaryColor}`,
        border: `1px solid ${theme?.primaryColor}80`,
        width: '40px',
        '&:hover, &:focus, &:active, &:focus-visible': {
          backgroundColor: selected ? `${theme?.primaryColor} !important` : `${theme?.primaryColor}1a !important`,
          color: selected ? `${theme?.secondaryColor} !important` : `${theme?.primaryColor} !important`,
        },
      }}
    >
      {children}
    </Button>
  )
}

export const EndMessage = ({ onAnswer }) => {

  const { theme } = useSelector((state) => state.survey);

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'Enter') {
        onAnswer(e.target.value);
      }
      if (e.key === 'X') {
        window.location.href = "https://surveysparrow.com";
      }
    };

    window.addEventListener('keypress', handleKeyPress);

    return () => {
      window.removeEventListener('keypress', handleKeyPress);
    };
  }, [onAnswer]);

  return (
    <OptionsContainer>
      <Flex gap="$4">
        <Button onClick={onAnswer} css={{
          position: 'unset',
          height: 'auto',
        }}>
          <Text css={{ fontSize: 'inherit', fontWeight: 'inherit', color: 'inherit' }}>Keep Chatting...&nbsp;</Text>
          {/* Submit */}
          <ShortcutKey css={{
            textTransform: 'uppercase', height: 'auto', width: 'auto',
            'p': { lineHeight: '0' },
            'svg path': { strokeWidth: '2px' },
          }}
          ><EnterIcon size="20"/></ShortcutKey>
        </Button>
        <Button onClick={() => {
          window.location.href = "https://surveysparrow.com";
        }} css={{
          position: 'unset',
          height: 'auto',
          backgroundColor: 'transparent !important',
          color: `${theme?.primaryColor} !important`,
        }}>
          <Text css={{ fontSize: 'inherit', fontWeight: 'inherit', color: 'inherit' }}>End Survey&nbsp;</Text>
          {/* Submit */}
          <ShortcutKey css={{
            textTransform: 'uppercase',
            // height: 'auto', width: 'auto',
            backgroundColor: `${theme?.secondaryColor} !important`,
            'p': {
              lineHeight: '0',
            color: `${theme?.primaryColor} !important`,
            },
            // 'svg path': { strokeWidth: '2px' },
          }}
          >X</ShortcutKey>
        </Button>
      </Flex>
    </OptionsContainer>
  );
};