import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { ThemeProvider, Tooltip, TooltipProvider, Box, Tabs, TabsList, TabsTrigger, Flex, styled, Text, IconButton, DialogTrigger, Dialog, DialogContent, DialogHeader, DialogTitle, DialogBody, FormLabel, Slider, SliderTrack, SliderRange, SliderThumb, DialogFooter, DialogClose, Button, Select, Switch, Input, Chip } from '@sparrowengg/twigs-react';
import Question from './pages/standalone-survey/Question';
import { fetchInitialQuestion, resetSurvey } from './store/slices/surveySlice';
import { StandaloneSurveyIcon, ChatSurveyIcon, VoiceSurveyIcon, IVRSurveyIcon, WhatsAppSurveyIcon, PlayIcon, PauseIcon } from './assets/icons';
import ChatSurvey, { ChatSurveyPreview } from './pages/chat-survey/ChatSurvey';
import WhatsAppSurvey from './components/whatsapp/WhatsAppSurvey';
import VoiceSurvey, { WebCallPreview } from './pages/voice-survey/VoiceSurvey';
import IVRSurvey from './pages/ivr-survey/IVRSurvey.jsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { IVRPreview } from './pages/ivr-survey/IVRSurvey';
import { CloseIcon, SettingsIcon } from '@sparrowengg/twigs-react-icons';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Survey />} />
        <Route path="/sample" element={<Sample />} />
        <Route path="/survey/:triggerToken" element={<Survey />} />
        <Route path="/standalone/:triggerToken" element={<StandaloneSurvey />} />
        <Route path="/chat/:triggerToken" element={<ChatSurvey />} />
        <Route path="/voice/:triggerToken" element={<VoiceSurvey />} />
        <Route path="/ivr/:triggerToken" element={<IVRSurvey />} />
        <Route path="/call/:triggerToken" element={<IVRAndWebCall />} />
        <Route path="/whatsapp/:triggerToken" element={<WhatsAppSurvey />} />
        {/* <Route path="/standalone" element={<StandaloneSurvey />} />
        <Route path="/chat" element={<ChatSurvey />} />
        <Route path="/voice" element={<VoiceSurvey />} />
        <Route path="/ivr" element={<IVRSurvey />} />
        <Route path="/whatsapp" element={<WhatsAppSurvey />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;

const voice = {
  "voice_id": "21m00Tcm4TlvDq8ikWAM",
  "name": "Rachel",
  "category": "professional",
  "labels": {
    "accent": "American",
    "age": "middle-aged",
    "description": "expressive",
    "gender": "female",
    "use_case": "social media"
  },
  "available_for_tiers": [
    "creator",
    "enterprise"
  ],
  "high_quality_base_model_ids": [
    "eleven_v2_flash",
    "eleven_flash_v2",
    "eleven_turbo_v2_5",
    "eleven_multilingual_v2",
    "eleven_v2_5_flash",
    "eleven_flash_v2_5",
    "eleven_turbo_v2"
  ],
  "samples": [
    {
      "sample_id": "DCwhRBWXzGAHq8TQ4Fs18",
      "file_name": "sample.mp3",
      "mime_type": "audio/mpeg",
      "size_bytes": 1000000,
      "hash": "1234567890"
    }
  ],
  "fine_tuning": {
    "is_allowed_to_fine_tune": true,
    "state": {
      "eleven_multilingual_v2": "fine_tuned"
    },
    "verification_failures": [
      "verification_failures"
    ],
    "verification_attempts_count": 2,
    "manual_verification_requested": false
  },
  "description": "A warm, expressive voice with a touch of humor.",
  "preview_url": "https://storage.googleapis.com/eleven-public-prod/premade/voices/9BWtsMINqrJLrRacOk9x/405766b8-1f4e-4d3c-aba1-6f25333823ec.mp3",
  "settings": {
    "stability": 1,
    "similarity_boost": 1,
    "style": 0,
    "use_speaker_boost": true,
    "speed": 1
  },
  "sharing": {
    "status": "enabled",
    "date_unix": 1714204800,
    "whitelisted_emails": [
      "example@example.com"
    ],
    "public_owner_id": "DCwhRBWXzGAHq8TQ4Fs18",
    "original_voice_id": "DCwhRBWXzGAHq8TQ4Fs18",
    "financial_rewards_enabled": true,
    "free_users_allowed": true,
    "live_moderation_enabled": true,
    "notice_period": 30,
    "voice_mixing_allowed": false,
    "featured": true,
    "category": "professional",
    "liked_by_count": 100,
    "cloned_by_count": 50,
    "name": "Rachel",
    "labels": {
      "accent": "American",
      "gender": "female"
    },
    "review_status": "allowed",
    "enabled_in_library": true,
    "history_item_sample_id": "DCwhRBWXzGAHq8TQ4Fs18",
    "rate": 0.05,
    "disable_at_unix": 1714204800,
    "reader_app_enabled": true,
    "description": "A female voice with a soft and friendly tone.",
    "moderation_check": {
      "date_checked_unix": 1714204800,
      "name_value": "Rachel",
      "name_check": true,
      "description_value": "A female voice with a soft and friendly tone.",
      "description_check": true,
      "sample_ids": [
        "sample1",
        "sample2"
      ],
      "sample_checks": [
        0.95,
        0.98
      ],
      "captcha_ids": [
        "captcha1",
        "captcha2"
      ],
      "captcha_checks": [
        0.95,
        0.98
      ]
    },
    "reader_restricted_on": [
      {
        "resource_type": "read",
        "resource_id": "FCwhRBWXzGAHq8TQ4Fs18"
      }
    ]
  },
  "verified_languages": [
    {
      "language": "en",
      "model_id": "eleven_turbo_v2_5",
      "accent": "American"
    }
  ],
  "safety_control": "NONE",
  "voice_verification": {
    "requires_verification": false,
    "is_verified": true,
    "verification_failures": [
      "verification_failures"
    ],
    "verification_attempts_count": 0,
    "language": "en",
    "verification_attempts": [
      {
        "text": "Hello, how are you?",
        "date_unix": 1714204800,
        "accepted": true,
        "similarity": 0.95,
        "levenshtein_distance": 2,
        "recording": {
          "recording_id": "CwhRBWXzGAHq8TQ4Fs17",
          "mime_type": "audio/mpeg",
          "size_bytes": 1000000,
          "upload_date_unix": 1714204800,
          "transcription": "Hello, how are you?"
        }
      }
    ]
  },
  "permission_on_resource": "permission_on_resource",
  "is_owner": false,
  "is_legacy": false,
  "is_mixed": false,
  "created_at_unix": 1
};
const voices = {
  "voices": [
    voice,
  ]
};


const Sample = () => {
  return (
    <ThemeProvider>
      <TooltipProvider>
      <Box css={{ width: '100%', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }} className="dm-sans">
        <Box>
          <Dialog size="xs">
            <DialogTrigger asChild>
            <Button size="sm" css={{ height: 'auto', padding: 0 }} variant="ghost">Change Voice</Button>
            </DialogTrigger>
            <DialogContent className="dm-sans">
              <DialogHeader
                css={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  justifyContent: "center",
                }}
              >
                <DialogTitle size="lg">All Voices</DialogTitle>
              </DialogHeader>
              <DialogBody>
                {voices.voices.map((voice) => (
                  <Flex key={voice.name} alignItems="center" justifyContent="space-between" gap="$4">
                    <Box>
                      <Text css={{ marginBottom: "0", color: '$neutral900' }}>{voice.name}</Text>
                      {/* <Text css={{ marginBottom: "0", color: '$neutral700' }}>{voice.labels.accent}&nbsp;•&nbsp;{voice.labels.gender}</Text> */}
                      <Flex gap="$2" css={{ flexWrap: 'wrap' }}>
                        <Chip size="sm" color="default">{voice.labels.accent}</Chip>
                        <Chip size="sm" color="default">{voice.labels.gender}</Chip>
                        <Chip size="sm" color="default">{voice.labels.age}</Chip>
                        <Chip size="sm" color="default">{voice.labels.use_case}</Chip>
                      </Flex>
                    </Box>
                    <PlayButton url={voice.preview_url} />
                  </Flex>
                ))}
              </DialogBody>
              <DialogFooter>
                <Flex justifyContent="flex-end" css={{ justifyContent: "flex-end" }}>
                  <DialogClose asChild>
                    <Button size="lg" color="primary">
                      Save changes
                    </Button>
                  </DialogClose>
                </Flex>
              </DialogFooter>
              <Box css={{ position: "absolute", top: "$8", right: "$8" }}>
                <DialogClose asChild>
                  <IconButton
                    size="lg"
                    icon={<CloseIcon />}
                    variant="ghost"
                    aria-label="Close"
                    color="default"
                  />
                </DialogClose>
              </Box>
            </DialogContent>
          </Dialog>
          <Flex css={{ border: '1px solid $neutral200', borderRadius: '8px', padding: '12px', margin: 'auto' }} gap="$4">
            <Box>
              <Text weight="medium" css={{ color: '$neutral900', marginBottom: '0' }}>{voice.name}</Text>
              <Text size="xs" css={{ color: '$neutral700', marginBottom: '0' }}>{voice.labels.accent}&nbsp;•&nbsp;{voice.labels.gender}</Text>
            </Box>
            <Flex gap="$2">
              <Dialog size="xs">
                <DialogTrigger asChild>
                  <IconButton icon={<SettingsIcon />} css={{ padding: '0', flexShrink: '0', flexGrow: '0', height: '32px', width: '32px' }} size="md" color="default" />
                </DialogTrigger>
                <DialogContent className="dm-sans">
                  <DialogHeader
                    css={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      justifyContent: "center",
                    }}
                  >
                    <DialogTitle size="lg">Speech Settings</DialogTitle>
                  </DialogHeader>
                  <DialogBody>
                    <Flex flexDirection="column" gap="$2" css={{ marginBottom: "$12" }}>
                      <FormLabel css={{ color: '$neutral900', fontSize: '$xs', lineHeight: '$xs' }}>Speech Rate</FormLabel>
                      <CustomSlider />
                    </Flex>
                    <Flex flexDirection="column" gap="$2">
                      <FormLabel css={{ color: '$neutral900', fontSize: '$xs', lineHeight: '$xs' }}>Assistant&apos;s Response Behaviour</FormLabel>
                      <Select
                        css={{ marginBottom: '$12', width: '100%' }}
                        size="lg"
                        options={[{
                          label: 'Rapid Response',
                          value: 'rapid',
                        }, {
                          label: 'Thoughtful Response',
                          value: 'thoughtful',
                        }, {
                          label: 'Casual Response',
                          value: 'casual',
                        }]}
                      />
                    </Flex>
                    <Flex alignItems="center" justifyContent="space-between" gap="$4" css={{ marginBottom: '$12' }}>
                      <Box>
                        <Text size="xs" css={{ color: '$neutral900' }}>Allow Assistant Interruption</Text>
                        <Text size="xs" css={{ color: '$neutral700' }}>If turned on, we are allowing callers to interrupt the assistant while the assistant is speaking. Once interrupted the assistant.</Text>
                      </Box>
                      <Switch size="md"  css={{ flexShrink: '0' }} />
                    </Flex>
                    <Flex flexDirection="column" gap="$2">
                      <FormLabel css={{ color: '$neutral900', fontSize: '$xs', lineHeight: '$xs' }}>Assistant&apos;s Response Behaviour</FormLabel>
                      <Select
                        css={{ marginBottom: '$12', width: '100%' }}
                        size="lg"
                        options={[{
                          label: 'Rapid Response',
                          value: 'rapid',
                        }, {
                          label: 'Thoughtful Response',
                          value: 'thoughtful',
                        }, {
                          label: 'Casual Response',
                          value: 'casual',
                        }]}
                      />
                    </Flex>
                    <Flex alignItems="center" justifyContent="space-between" gap="$4" css={{ marginBottom: '$12' }}>
                      <Box>
                        <Text size="xs" css={{ color: '$neutral900', marginBottom: '0' }}>Re-engage</Text>
                        <Text size="xs" css={{ color: '$neutral700', marginBottom: '0' }}>Enable this setting to allow the assistant to re-engage with the user if the user has not responded.</Text>
                      </Box>
                      <Switch size="md"  css={{ flexShrink: '0' }} />
                    </Flex>
                    <Flex flexDirection="column" gap="$2" css={{ marginBottom: "$12" }}>
                      <FormLabel css={{ color: '$neutral900', fontSize: '$xs', lineHeight: '$xs' }}>Re-engage Count</FormLabel>
                      <Input size="lg" />
                    </Flex>
                    <Flex flexDirection="column" gap="$2" css={{ marginBottom: "$12" }}>
                      <FormLabel css={{ color: '$neutral900', fontSize: '$xs', lineHeight: '$xs' }}>Re-engage Count</FormLabel>
                      <CustomSlider />
                    </Flex>
                    <Flex flexDirection="column" gap="$2" css={{ marginBottom: "$12" }}>
                      <FormLabel css={{ color: '$neutral900', fontSize: '$xs', lineHeight: '$xs' }}>Max Call Duration</FormLabel>
                      <CustomSlider />
                    </Flex>
                  </DialogBody>
                  <DialogFooter>
                    <Flex justifyContent="flex-end" css={{ justifyContent: "flex-end" }}>
                      <DialogClose asChild>
                        <Button size="lg" color="primary">
                          Save changes
                        </Button>
                      </DialogClose>
                    </Flex>
                  </DialogFooter>
                  <Box css={{ position: "absolute", top: "$8", right: "$8" }}>
                    <DialogClose asChild>
                      <IconButton
                        size="lg"
                        icon={<CloseIcon />}
                        variant="ghost"
                        aria-label="Close"
                        color="default"
                      />
                    </DialogClose>
                  </Box>
                </DialogContent>
              </Dialog>
              <PlayButton url={voice.preview_url} />
              {/* <IconButton icon={<PlayIcon />} css={{ padding: '0', flexShrink: '0', flexGrow: '0', height: '32px', width: '32px' }} size="md" color="default" /> */}
            </Flex>
          </Flex>
        </Box>
      </Box>
      </TooltipProvider>
    </ThemeProvider>
  )
}


const IVRAndWebCall = () => {
  const [device, setDevice] = useState('ivr');

  return (
    <ThemeProvider>
      
        <Flex flexDirection="column" css={{ height: '100vh', width: '100vw', backgroundColor: '#f2f5f8' }} alignItems="center" justifyContent="center" className="dm-sans">
          <Flex
            flexDirection="column"
            // css={{ height: '85vh', width: '350px' }}
            alignItems="center"
            gap="$8"
          >
            <DeviceSwitcher value={device} onValueChange={setDevice} />
            {device === 'ivr' && <IVRPreview />}
            {device === 'web' && <WebCallPreview />}
          </Flex>
        </Flex>
    </ThemeProvider>
  )
}


const StyledTabsTrigger = styled(TabsTrigger, {
  svg: { height: '$6', width: '$6', 'path, rect': { stroke: '$secondary500' } },
  padding: '6.5px 14.5',
  '&[data-state="active"]': {
    border: '1.5px solid #64748B26 !important', backgroundColor: '$white900',
    'svg path, svg rect': { stroke: '$secondary700' }
  },
  border: '1.5px solid transparent !important',
  borderRadius: '$pill', backgroundColor: 'transparent'
});


const DeviceSwitcher = ({
  value, onValueChange, defaultValue, css = {}
}) => {
  return (
    <Tabs defaultValue={defaultValue} value={value} onValueChange={onValueChange} css={{ border: '1px solid $neutral200', borderRadius: '$pill' }}>
      <TabsList css={{
        border: '2.5px solid #F6F7F8', borderRadius: '$pill', width: 'fit-content', backgroundColor: '#F6F7F8', ...css,
      }}>
          <StyledTabsTrigger value="ivr" aria-label="IVR">
            IVR
          </StyledTabsTrigger>
          <StyledTabsTrigger value="web" aria-label="Web">
            Test with Web
          </StyledTabsTrigger>
      </TabsList>
    </Tabs>
  );
};


const Survey = () => {
  const [surveyType, setSurveyType] = useState('standalone');

  return (
    <Box css={{ position: 'relative', height: '100vh', width: '100vw' }}>
      {surveyType === 'standalone' && <StandaloneSurvey />}
      {surveyType === 'chat' && <ChatSurveyPreview />}
      {surveyType === 'voice' && <VoiceSurvey />}
      {surveyType === 'ivr' && <IVRSurvey />}
      {surveyType === 'whatsapp' && <WhatsAppSurvey />}
      <SurveyTypeTabs surveyType={surveyType} setSurveyType={setSurveyType} />
    </Box>
  );
}

const StandaloneSurvey = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchInitialQuestion({ theme: { primaryColor: '#000000', secondaryColor: '#ffffff' } }));
    return () => {
      dispatch(resetSurvey());
    }
  }, [dispatch]);

  return (
    <ThemeProvider>
      <Question />
    </ThemeProvider>
  );
};

const SurveyTypeTabs = ({ surveyType, setSurveyType }) => {
  return (
    <TooltipProvider delayDuration={0}>
      <Tabs defaultValue={surveyType} onValueChange={setSurveyType} css={{ position: 'absolute', borderRadius: '16px', bottom: '24px', left: '50%', transform: 'translateX(-50%)', zIndex: '100' }}>
        <TabsList
          aria-label="tabs example"
          css={{
            backgroundColor: '$neutral900',
            border: '1px solid #717171',
            borderRadius: '$lg',
            padding: '12px',
            gap: '$5',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
          }}
        >
          <SurveyTypeTab value="standalone" tooltip="Standalone Survey">
            <StandaloneSurveyIcon size="36" />
          </SurveyTypeTab>
          <SurveyTypeTab value="chat" tooltip="Chat Survey">
            <ChatSurveyIcon size="36" />
          </SurveyTypeTab>
          <SurveyTypeTab value="voice" tooltip="Voice Survey">
            <VoiceSurveyIcon size="36" />
          </SurveyTypeTab>
          <SurveyTypeTab value="ivr" tooltip="IVR Survey">
            <IVRSurveyIcon size="36" />
          </SurveyTypeTab>
          <SurveyTypeTab value="whatsapp" tooltip="WhatsApp Survey">
            <WhatsAppSurveyIcon size="36" />
          </SurveyTypeTab>
        </TabsList>
      </Tabs>
    </TooltipProvider>
  )
}

const SurveyTypeTab = ({ value, children, tooltip, ...props }) => {
  return (
    <TabsTrigger
      value={value} {...props}
      css={{
        backgroundColor: 'transparent',
        padding: '0',
        borderBottom: 'none !important',
        color: '$neutral800',
        transition: 'color 0.2s ease-in-out',
        '&[data-state="inactive"]:hover': {
          color: '$neutral800',
        },
        '&[data-state="inactive"] svg path[fill="white"]': {
          fill: '$white700',
          transition: 'fill 0.2s ease-in-out',
        },
        '&[data-state="inactive"]:hover svg path[fill="white"]': {
          fill: '$white900',
        },
      }}
    >
      <Tooltip content={tooltip} className="dm-sans" css={{ backgroundColor: '$white900', color: '$neutral900', svg: { fill: '$white900' } }}>
        <Box css={{ lineHeight: '0' }}>
          {children}
        </Box>
      </Tooltip>
    </TabsTrigger>
  )
}
const CustomSliderThumb = () => {
  const [open, setOpen] = useState(false);

  return (
    <Tooltip content="Hello" delayDuration={0} open={open}>
      <SliderThumb
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        css={{
          cursor: 'pointer',
          backgroundColor: '$white900',
          '&:hover, &:focus, &:active': {
            backgroundColor: '$white900 !important',
            boxShadow: 'none !important',
            '&::before': {
              opacity: '0.5 !important',
            },
          },
          '&::before': {
            content: ' ',
            position: 'absolute',
            top: '50%',
            left: '50%',
            borderRadius: '$round',
            transform: 'translate(-50%, -50%)',
            height: '38px !important',
            width: '38px !important',
            backgroundColor: 'rgb(100 116 139 / 8%)',
            boxShadow: '-2.91px 2.91px 8.73px 0px #0000001A, 0px 3.2px 6.4px 0px #00000033',
            opacity: '0',
            transition: 'opacity 0.1s ease-in-out',
          },
          '&::after': {
            content: ' ',
            position: 'absolute',
            top: '50%',
            left: '50%',
            borderRadius: '$round',
            transform: 'translate(-50%, -50%)',
            height: '18.73px !important',
            width: '18.73px !important',
            border: '3.27px solid $secondary500',
            backgroundColor: '$white900',
            boxShadow: '-2.18px 2.18px 6.55px 0px #0000001A, 0px 2.4px 4.8px 0px #00000033',
          },
        }}
      />
    </Tooltip>
  )
}
const CustomSlider = () => {
  return (

    <Slider
    css={{
      // margin: '$14 0 $7 0',
    }}
    components={{
      Track: () => (
        <SliderTrack
          css={{  
            backgroundColor: '$secondary100',
            height: "$4",
            position: "relative",
          }}
        >
          <SliderRange
            css={{
              backgroundColor: '$secondary500',
              borderTopRightRadius: "0px",
              borderBottomRightRadius: "0px",
            }}
          />
          <Flex css={{ position: 'absolute', top: '0', left: '0', right: '0', bottom: '0', width: '100%', height: '100%' }} alignItems='center' justifyContent='space-evenly'>
            <Box css={{ width: '2px', height: '6px', backgroundColor: '$secondary300', borderRadius: '$pill' }} />
            <Box css={{ width: '2px', height: '6px', backgroundColor: '$secondary300', borderRadius: '$pill' }} />
            <Box css={{ width: '2px', height: '6px', backgroundColor: '$secondary300', borderRadius: '$pill' }} />
            <Box css={{ width: '2px', height: '6px', backgroundColor: '$secondary300', borderRadius: '$pill' }} />
            <Box css={{ width: '2px', height: '6px', backgroundColor: '$secondary300', borderRadius: '$pill' }} />
            <Box css={{ width: '2px', height: '6px', backgroundColor: '$secondary300', borderRadius: '$pill' }} />
            <Box css={{ width: '2px', height: '6px', backgroundColor: '$secondary300', borderRadius: '$pill' }} />
            <Box css={{ width: '2px', height: '6px', backgroundColor: '$secondary300', borderRadius: '$pill' }} />
          </Flex>
        </SliderTrack>
      ),
      Thumb: () => (
        <CustomSliderThumb />
      ),
    }}
  />
  );
};

const PlayButton = ({ url, css = {} }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(new Audio(url));
  
  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    audioRef.current.addEventListener('ended', () => setIsPlaying(false));
    return () => {
      audioRef.current.removeEventListener('ended', () => setIsPlaying(false));
      audioRef.current.pause();
    };
  }, []);

  return (
    <IconButton 
      icon={isPlaying ? <PauseIcon /> : <PlayIcon />}
      css={{ padding: '0', flexShrink: '0', flexGrow: '0', height: '32px', width: '32px', ...css }} 
      size="md" 
      color="default"
      onClick={togglePlay}
    />
  );
};