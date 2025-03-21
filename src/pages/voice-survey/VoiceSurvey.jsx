import { Box, Button, Flex, IconButton, Text, ThemeProvider } from '@sparrowengg/twigs-react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, forwardRef, useState, useRef } from 'react';
import { fetchInitialQuestion, resetSurvey } from '../../store/slices/surveySlice';
import './VoiceSurvey.css';
import { CloseIcon } from '@sparrowengg/twigs-react-icons';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { makeChatQuery, makeSubmissionEntry, getWelcomeMessage } from "../../apis";

const VoiceSurvey = () => {
  const dispatch = useDispatch();
  const { triggerToken } = useParams();

  const [callingView, setCallingView] = useState(false);

  const profileImage = 'https://static.surveysparrow.com/application/production/1742317383073__695b1268fdc427427b32db00e0f87aeb06c23d6b670a1ea147124b54966a__Frame-removebg-preview.png';
  const accentColor = '#F5D161';
  const secondaryColor = '#ffffff';
  const primaryColor = '#000000';

  useEffect(() => {
    dispatch(fetchInitialQuestion({ theme: { primaryColor: primaryColor, secondaryColor: secondaryColor, actionColor: accentColor, profileImage: profileImage }, triggerToken }));

    return () => {
      dispatch(resetSurvey());
    }
  }, [dispatch, triggerToken]);

  return (
    <ThemeProvider>
      <Flex flexDirection="column" css={{ height: '100vh', width: '100vw', backgroundColor: '#f2f5f8' }} alignItems="center" justifyContent="center" className="dm-sans">
        <Flex flexDirection="column" css={{ 
          height: '100%',
          
          paddingTop: '20px',
          paddingBottom: '86px',
        }} alignItems="end" gap="$4" justifyContent="center">
          <WebCallPreview />
        </Flex>
      </Flex>
    </ThemeProvider>
  )
}

export default VoiceSurvey;

export const WebCallPreview = () => {
  const dispatch = useDispatch();
  const { triggerToken } = useParams();

  const [callingView, setCallingView] = useState(false);

  const profileImage =
    "https://static.surveysparrow.com/application/production/1742317383073__695b1268fdc427427b32db00e0f87aeb06c23d6b670a1ea147124b54966a__Frame-removebg-preview.png";
  const accentColor = "#F5D161";
  const secondaryColor = "#ffffff";
  const primaryColor = "#000000";

  useEffect(() => {
    dispatch(
      fetchInitialQuestion({
        theme: {
          primaryColor: primaryColor,
          secondaryColor: secondaryColor,
          actionColor: accentColor,
          profileImage: profileImage,
        },
        triggerToken
      })
    );

    return () => {
      dispatch(resetSurvey());
    };
  }, [dispatch, triggerToken]);

  return (
    <Flex flexDirection="column" css={{
      height: '480px', maxHeight: '580px', boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px;', backgroundColor: 'white', borderRadius: '$3xl',
      width: '350px',
    }} justifyContent="center" alignItems="center">
      <Box css={{
        width: '100px',
        height: '100px',
        backgroundColor: accentColor,
        backgroundImage: `url(${profileImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        flexShrink: 0,
        borderRadius: '$round'
      }}/>
      <Text size="md" weight="bold" css={{ color: '$neutral900', marginTop: '10px' }} truncate>Leo</Text>
      <Text size="xs" css={{ color: '$neutral800', textAlign: 'center', maxWidth: '70%' }}>Personalized Travel<br/>Booking Agent</Text>
      {!callingView && <CallButton primaryColor={primaryColor} accentColor={accentColor} setCallingView={setCallingView} />}
      {callingView && <CallingView />}
    </Flex>
  )
}

/* HTML: <div class="loader"></div> */

const animateWaves = async () => {
  const canvas = document.getElementById("waveCanvas");
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const turbulenceFactor = 0.25;
  const maxAmplitude = canvas.height / 3.5; // Max amplitude of the wave
  const baseLine = canvas.height / 2; // Vertical center of the canvas
  const numberOfWaves = 10;
  let globalTime = 0;

  function createGradient() {
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
    gradient.addColorStop(0, "rgba(255, 25, 255, 0.2)");
    gradient.addColorStop(0.5, "rgb(251, 222, 0)");
    gradient.addColorStop(1, "rgba(255, 132, 25, 0.75)");
    return gradient;
  }

  const gradient = createGradient();

  function generateSmoothWave(dataArray, frequency = 0.1, amplitude = 64) {
    const array = new Uint8Array(100);
    for (let i = 0; i < array.length; i++) {
      array[i] = (Math.sin(i * frequency + globalTime) + 1) * amplitude;
    }

    return array;
  }

  function drawWave(dataArray, analyser) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    globalTime += 0.05;

    for (let j = 0; j < numberOfWaves; j++) {
      ctx.beginPath();
      ctx.lineWidth = 2;
      ctx.strokeStyle = gradient;

      let x = 0;

      let sliceWidth = (canvas.width * 1.0) / dataArray.length;

      let lastX = 0;
      let lastY = baseLine;

      for (let i = 0; i < dataArray.length; i++) {
        const v = dataArray[i] / 96.0;
        const mid = dataArray.length / 2;
        const distanceFromMid = Math.abs(i - mid) / mid;
        const dampFactor = 1 - Math.pow((2 * i) / dataArray.length - 1, 2); // Creates a parabolic falloff

        const amplitude = maxAmplitude * dampFactor * (1 - distanceFromMid);
        const isWaveInverted = j % 2 ? 1 : -1;
        const frequency = isWaveInverted * (0.05 + turbulenceFactor);

        const y =
          baseLine + Math.sin(i * frequency + globalTime + j) * amplitude * v;

        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          let xc = (x + lastX) / 2;
          let yc = (y + lastY) / 2;
          ctx.quadraticCurveTo(lastX, lastY, xc, yc);
        }

        lastX = x;
        lastY = y;
        x += sliceWidth;
      }

      ctx.lineTo(canvas.width, lastY);
      ctx.stroke();
    }

    return requestAnimationFrame(() => animateWaves(dataArray, analyser));
  }

  function animateWaves(dataArray, analyser) {
    const isSpeaking = dataArray.some((value) => value > 0);
    if (isSpeaking) {
      // Speaking
      analyser.getByteFrequencyData(dataArray);
    } else {
      // Thinking Mode
      dataArray = generateSmoothWave(dataArray, 0.05, 16);
    }
    return drawWave(dataArray, analyser);
  }

  let animationFrame = null;

  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
    const audioContext = new (window.AudioContext ||
      window.webkitAudioContext)();
    const analyser = audioContext.createAnalyser();
    const microphone = audioContext.createMediaStreamSource(stream);
    microphone.connect(analyser);
    const dataArray = new Uint8Array(analyser.frequencyBinCount);
    const waves = dataArray.slice(0, 250);
    animationFrame = animateWaves(waves, analyser);
  } catch (error) {
    console.error("Access to microphone denied", error);
  }

  return animationFrame;
};

const AudioVisualizer = () => {
  useEffect(() => {
    const animationFrame = animateWaves();

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, []);

  return (
    <Box
      className="container"
      css={{
        "&, & > canvas": {
          width: "100%",
          height: "100%",
          maxWidth: "100%",
          maxHeight: "100%",
        },
      }}
    >
      <canvas id="waveCanvas"></canvas>
    </Box>
  );
};

// const AudioVisualizer1 = ({ mediaStream, accentColor }) => {
//   const canvasRef = useRef(null);
//   const animationFrameRef = useRef(null);
//   const audioContextRef = useRef(null);
//   const analyserRef = useRef(null);
//   const dataArrayRef = useRef(null);
//   const previousHeightsRef = useRef(null);
//   const lastUpdateRef = useRef(0);

//   useEffect(() => {
//     if (!mediaStream) return;

//     const canvas = canvasRef.current;
//     const ctx = canvas.getContext('2d');
//     const width = canvas.width;
//     const height = canvas.height;

//     // Set up Web Audio API
//     audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
//     const source = audioContextRef.current.createMediaStreamSource(mediaStream);
//     analyserRef.current = audioContextRef.current.createAnalyser();
//     analyserRef.current.fftSize = 128;
//     analyserRef.current.smoothingTimeConstant = 0.4; // Reduced for faster response
//     source.connect(analyserRef.current);

//     const bufferLength = analyserRef.current.frequencyBinCount;
//     dataArrayRef.current = new Uint8Array(bufferLength);
//     previousHeightsRef.current = new Array(bufferLength).fill(0);

//     const draw = (timestamp) => {
//       animationFrameRef.current = requestAnimationFrame(draw);

//       // Limit updates to 30fps
//       if (timestamp - lastUpdateRef.current < 33) return;
//       lastUpdateRef.current = timestamp;

//       // Get frequency data
//       analyserRef.current.getByteFrequencyData(dataArrayRef.current);

//       // Clear canvas
//       ctx.fillStyle = 'transparent';
//       ctx.fillRect(0, 0, width, height);

//       // Draw frequency bars
//       const barWidth = 3;
//       const barGap = 2;
//       const bars = 24;
//       const barHeightScale = height / 255;
//       const smoothingFactor = 0.4; // Increased for faster response
//       const decayFactor = 0.85; // Faster decay when not speaking

//       ctx.fillStyle = accentColor;
//       for (let i = 0; i < bars; i++) {
//         // Get current height
//         const currentHeight = dataArrayRef.current[i] * barHeightScale;

//         // Apply threshold to detect silence
//         const isSilent = currentHeight < 10;

//         // Apply different smoothing based on whether there's sound
//         if (isSilent) {
//           // Faster decay when silent
//           previousHeightsRef.current[i] *= decayFactor;
//         } else {
//           // Normal smoothing when speaking
//           previousHeightsRef.current[i] = previousHeightsRef.current[i] * (1 - smoothingFactor) +
//                                          currentHeight * smoothingFactor;
//         }

//         // Apply minimum threshold
//         const barHeight = previousHeightsRef.current[i] > 2 ? previousHeightsRef.current[i] : 0;

//         const x = i * (barWidth + barGap);
//         ctx.fillRect(x, height - barHeight, barWidth, barHeight);
//       }
//     };

//     draw(0);

//     return () => {
//       if (animationFrameRef.current) {
//         cancelAnimationFrame(animationFrameRef.current);
//       }
//       if (audioContextRef.current) {
//         audioContextRef.current.close();
//       }
//     };
//   }, [mediaStream, accentColor]);

//   return (
//     <canvas
//       ref={canvasRef}
//       width={300}
//       height={60}
//       style={{ width: '100%', height: '100%' }}
//     />
//   );
// };

const CallingView = () => {
  const [status, setStatus] = useState("Connecting");
  const [showLoader, setShowLoader] = useState(true);
  const [time, setTime] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isCallActive, setIsCallActive] = useState(true);
  const mediaStreamRef = useRef(null);
  const { triggerToken } = useParams();


  const currentAudioPlayer = useRef(null);

  useEffect(() => {
    let timer;
    if (isCallActive) {
      timer = setInterval(() => {
        setTime((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isCallActive]);


  const cancelAudio = () => {
    console.log("📱 ~ CallingView ~ currentAudioPlayer: In  cancelAudio", currentAudioPlayer.current)

    if (currentAudioPlayer.current) {
      currentAudioPlayer.current.pause();
      currentAudioPlayer.current.currentTime = 0;
    }
  };

  const startStream = async (transcript) => {
    console.log("📱 ~ CallingView ~ currentAudioPlayer: In  startStream", currentAudioPlayer.current)

    cancelAudio();

    const requestBody = {
      text: transcript,
      voice_settings: {},
    };

    const baseUrl = "https://api.elevenlabs.io/v1/text-to-speech";
    const headers = {
      "Content-Type": "application/json",
      "xi-api-key": "sk_45aec40cb329dd52563aa0be1b393a76d1ef324ba169fc8b",
    };

    const response = await axios.post(
      `${baseUrl}/bIHbv24MWmeRgasZH58o`,
      requestBody,
      {
        headers,
        responseType: "blob",
      }
    );

    const audio = new Audio(URL.createObjectURL(response.data));
    currentAudioPlayer.current = audio;
    audio.play();
  };


  // const {
  //   transcript,
  //   listening,
  //   resetTranscript,
  //   browserSupportsSpeechRecognition
  // } = useSpeechRecognition();

  // useEffect(() => {
  //   SpeechRecognition.startListening()
  // }, []);

  // useEffect(() => {
  //   if (transcript) {
  //     console.log("📱 ~ useEffect ~ transcript:", transcript)
  //     // startStream(transcript);
  //   }
  // }, [transcript]);

  const handleAudioStream = async () => {


    const welcomeMessage = "Hello, how can I help you today?";
    await startStream(welcomeMessage);

    await navigator.mediaDevices
      .getUserMedia({ audio: true, video: false })
      .then(async (stream) => {
        if (!MediaRecorder.isTypeSupported("audio/webm")) {
          return alert("Browser not supported");
        }

        var options = { mimeType: "video/webm" };
        const mediaRecorder = new MediaRecorder(stream, options);

        const socket = new WebSocket(`wss://api.deepgram.com/v1/listen?model=nova-3`, [
          "token",
          "d830852caa0c9a10d0c0559d0303706841ae98e6",
        ]);

        socket.onopen = () => {
          mediaRecorder.addEventListener("dataavailable", async (event) => {
            if (event.data.size > 0 && socket.readyState == 1) {
              socket.send(event.data);
            }
          });
        };

        mediaRecorder.start(1100);
        console.log("started");

        socket.onmessage = async (message) => {
          const received = JSON.parse(message.data);
          console.log("📱 ~ socket.onmessage= ~ received:", received)
          const transcript = received.channel.alternatives[0].transcript;
          if (transcript && received.is_final) {
            cancelAudio();
            console.log("📱 ~ socket.onmessage= ~ transcript:", transcript);
            // currentText = currentText.concat(' ' + transcript);
            // audioText = currentText;

            const response = await makeChatQuery(
              "state.userId_2abcdfgki",
              `User response -> ${transcript}`,
              triggerToken
            );
            console.log("📱 ~ response:", response.jsonRes.question);

            await startStream(response.jsonRes.question);
            
          }
        };
      });
  };

  useEffect(() => {
    handleAudioStream();
  }, []);

  useEffect(() => {
    const initializeCall = async () => {
      try {
        // Simulate connecting status
        setStatus("Connecting");
        await new Promise((resolve) => setTimeout(resolve, 2000));

        // Request microphone access
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: {
            echoCancellation: true,
            noiseSuppression: true,
            autoGainControl: true,
          },
        });
        mediaStreamRef.current = stream;

        setStatus("Listening");
        setShowLoader(false);
      } catch (error) {
        console.error("Error accessing microphone:", error);
        setStatus("Error");
        setShowLoader(false);
      }
    };

    initializeCall();

    return () => {
      if (mediaStreamRef.current) {
        mediaStreamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  const handleEndCall = () => {
    setStatus("Ending");
    setIsCallActive(false);
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach((track) => track.stop());
    }
    setTimeout(() => {
      setStatus("Ended");
    }, 1000);
  };

  const handleMuteToggle = () => {
    if (mediaStreamRef.current) {
      const audioTrack = mediaStreamRef.current.getAudioTracks()[0];
      audioTrack.enabled = !audioTrack.enabled;
      setIsMuted(!isMuted);
    }
  };

  return (
    <Box css={{ marginTop: "20px", width: "100%" }}>
      <Flex alignItems="center" justifyContent="center">
        <Text
          size="xs"
          css={{
            color: "$neutral800",
            textAlign: "center",
            marginRight: "10px",
          }}
        >
          {status}
        </Text>
        {showLoader && <Box className="loader" css={{ scale: "0.25" }}></Box>}
        <Text
          size="xs"
          css={{
            color: "$neutral800",
            textAlign: "center",
            marginLeft: "10px",
          }}
        >
          {String(Math.floor(time / 60)).padStart(2, "0")}:
          {String(time % 60).padStart(2, "0")}
        </Text>
      </Flex>

      {status === "Listening" && (
        <Box css={{ marginTop: "20px", width: "100%", height: "60px" }}>
          <AudioVisualizer
            mediaStream={mediaStreamRef.current}
            accentColor="#F5D161"
          />
        </Box>
      )}

      <Flex
        alignItems="center"
        justifyContent="center"
        css={{ marginTop: "30px" }}
        gap="$16"
      >
        <Box>
          <IconButton
            icon={<MicIcon />}
            size="md"
            css={{
              borderRadius: "$round",
              backgroundColor: isMuted ? "#DC2625" : "transparent",
            }}
            color="default"
            onClick={handleMuteToggle}
          />
          <Text
            size="xxs"
            css={{
              color: "$neutral700",
              textAlign: "center",
              marginTop: "4px",
            }}
          >
            {isMuted ? "Unmute" : "Mute"}
          </Text>
        </Box>
        <Box>
          <IconButton
            icon={<CloseIcon size={24} />}
            size="md"
            css={{
              borderRadius: "$round",
              "&, &:hover, &:focus, &:active": {
                backgroundColor: "#DC2625 !important",
              },
              ".twigs-button__icon-box": { height: "$6", width: "$6" },
            }}
            onClick={handleEndCall}
          />
          <Text
            size="xxs"
            css={{
              color: "$neutral700",
              textAlign: "center",
              marginTop: "4px",
            }}
          >
            End
          </Text>
        </Box>
      </Flex>
    </Box>
  );
};

const MicIcon = ({ size = 24, color = "currentColor" }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill={color}
      height={size}
      width={size}
      viewBox="0 0 24 24"
      className="magnet-button-icon shrink-0 w-6 h-6"
    >
      <path
        fillRule="evenodd"
        d="M8 5a4 4 0 1 1 8 0v7a4 4 0 0 1-8 0V5Zm5 13.928A7.001 7.001 0 0 0 19 12a1 1 0 1 0-2 0 5 5 0 1 1-10 0 1 1 0 1 0-2 0 7 7 0 0 0 6 6.928V21H9a1 1 0 1 0 0 2h6a1 1 0 1 0 0-2h-2v-2.072Z"
        clipRule="evenodd"
      ></path>
    </svg>
  );
};

const CallButton = ({ primaryColor, accentColor, setCallingView }) => {
  return (
    <Button
      size="lg"
      leftIcon={<VoiceIcon size={24} color={primaryColor} />}
      css={{
        marginTop: "20px",
        "&:hover": { scale: "1.03" },
        "&:active": { scale: "1.01" },
        "&, &:hover, &:focus, &:active": {
          backgroundColor: `${accentColor} !important`,
          color: primaryColor,
        },
      }}
      onClick={() => setCallingView(true)}
    >
      Talk to Leo
    </Button>
  );
};
const AIPill = forwardRef(({ children, css }, ref) => {
  const theme = useSelector((state) => state.survey.theme);

  const profileImage = theme?.profileImage;

  return (
    <Box
      css={{
        padding: "$4",
        position: "relative",
        backgroundColor: `${theme?.actionColor}4d`,
        width: "100%",
        borderRadius: "0 0.5rem 0.5rem 0.5rem",
        ...css,
      }}
      ref={ref}
    >
      <Box
        css={{
          position: "absolute",
          top: "0",
          left: "auto",
          right: "calc(100% + $3)",
          width: "$4",
          height: "$4",
          backgroundColor: `${theme?.actionColor}`,
          borderRadius: "$round",
          backgroundImage: `url(${profileImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />
      {children}
    </Box>
  );
});

AIPill.displayName = "AIPill";

const VoiceIcon = ({ size = 24, color = "currentColor" }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height={size}
      width={size}
      fill={color}
      viewBox="0 0 24 24"
      className="magnet-button-icon shrink-0 w-5 h-5"
    >
      <path
        fillRule="evenodd"
        d="M9.5 4a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2V4ZM2 11a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-6Zm17-4.5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-10a2 2 0 0 0-2-2h-1Z"
        clipRule="evenodd"
      ></path>
    </svg>
  );
};
