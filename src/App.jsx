import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { ThemeProvider, Tooltip, TooltipProvider, Box, Tabs, TabsList, TabsTrigger } from '@sparrowengg/twigs-react';
import Question from './pages/standalone-survey/Question';
import { fetchInitialQuestion, resetSurvey } from './store/slices/surveySlice';
import { StandaloneSurveyIcon, ChatSurveyIcon, VoiceSurveyIcon, IVRSurveyIcon, WhatsAppSurveyIcon } from './assets/icons';
import ChatSurvey, { ChatSurveyPreview } from './pages/chat-survey/ChatSurvey';
import WhatsAppSurvey from './components/whatsapp/WhatsAppSurvey';
import VoiceSurvey from './pages/voice-survey/VoiceSurvey';
import IVRSurvey from './pages/ivr-survey/IVRSurvey.jsx';
import { BrowserRouter, Routes, Route, useParams } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Survey />} />
        <Route path="/standalone/:triggerToken" element={<StandaloneSurvey />} />
        <Route path="/chat/:triggerToken" element={<ChatSurvey />} />
        <Route path="/voice/:triggerToken" element={<VoiceSurvey />} />
        <Route path="/ivr/:triggerToken" element={<IVRSurvey />} />
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

const Survey = () => {
  const [surveyType, setSurveyType] = useState('whatsapp');

  return (
    <ThemeProvider>
      <Box css={{ position: 'relative', height: '100vh', width: '100vw' }}>
        {surveyType === 'standalone' && <StandaloneSurvey />}
        {surveyType === 'chat' && <ChatSurveyPreview />}
        {surveyType === 'voice' && <VoiceSurvey />}
        {surveyType === 'ivr' && <IVRSurvey />}
        {surveyType === 'whatsapp' && <WhatsAppSurvey />}
        <SurveyTypeTabs surveyType={surveyType} setSurveyType={setSurveyType} />
      </Box>
    </ThemeProvider>
  );
}

const StandaloneSurvey = () => {
  const dispatch = useDispatch();
  const { triggerToken } = useParams();
  console.log("🚀 ~ StandaloneSurvey ~ triggerToken:", triggerToken)

  useEffect(() => {
    dispatch(fetchInitialQuestion({ theme: { primaryColor: '#000000', secondaryColor: '#ffffff' }, triggerToken }));
    return () => {
      dispatch(resetSurvey());
    }
  }, [dispatch]);

  return (
    <Question />
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