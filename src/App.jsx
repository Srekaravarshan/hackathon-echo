import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { ThemeProvider, Tooltip, TooltipProvider } from '@sparrowengg/twigs-react';
import Question from './pages/standalone-survey/Question';
import { fetchInitialQuestion } from './store/slices/surveySlice';
import { Box, Tabs, TabsList, TabsTrigger } from '@sparrowengg/twigs-react';
import { StandaloneSurveyIcon, ChatSurveyIcon, VoiceSurveyIcon, IVRSurveyIcon, WhatsAppSurveyIcon } from './assets/icons';
import ChatSurvey from './pages/chat-survey/ChatSurvey';

function App() {
  const [surveyType, setSurveyType] = useState('chat');
  return (
    <ThemeProvider>
      <Box css={{ position: 'relative', height: '100vh', width: '100vw' }}>
        {surveyType === 'standalone' && <StandaloneSurvey />}
        {surveyType === 'chat' && <ChatSurvey />}
        {/* {surveyType === 'voice' && <VoiceSurvey />} */}
        {/* {surveyType === 'ivr' && <IVRSurvey />} */}
        {/* {surveyType === 'whatsapp' && <WhatsAppSurvey />} */}
        <SurveyTypeTabs surveyType={surveyType} setSurveyType={setSurveyType} />
      </Box>
    </ThemeProvider>
  );
}

export default App;

const StandaloneSurvey = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchInitialQuestion({ theme: { primaryColor: '#000000', secondaryColor: '#ffffff' } }));
  }, [dispatch]);

  return (
    <Question />
  );
};

const SurveyTypeTabs = ({ surveyType, setSurveyType }) => {
  return (
    <TooltipProvider delayDuration={0}>
      <Tabs defaultValue={surveyType} onValueChange={setSurveyType} css={{ position: 'absolute', borderRadius: '16px', bottom: '24px', left: '50%', transform: 'translateX(-50%)' }}>
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