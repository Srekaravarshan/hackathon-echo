import { useState, useRef, useEffect } from 'react';
import { Flex } from '@sparrowengg/twigs-react';
import { ResetIcon } from '@sparrowengg/twigs-react-icons';
import { useSelector } from 'react-redux';
import { PlayIcon, PauseIcon } from '../../assets/icons';
import { OptionsContainer } from '../StyledComponents';
import Button from '../buttons/Button';
import SubmitButton from '../buttons/SubmitButton';

const Audio = ({ onAnswer }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [hasRecording, setHasRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const mediaRecorder = useRef(null);
  const chunks = useRef([]);
  const audioRef = useRef(null);
  const progressInterval = useRef(null);

  const theme = useSelector((state) => state.survey.theme);

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
      )}
    </OptionsContainer>
  );
};

export default Audio;