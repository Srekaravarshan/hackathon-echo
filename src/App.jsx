import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { ThemeProvider, Tooltip, TooltipProvider, Box, Tabs, TabsList, TabsTrigger, Flex, styled } from '@sparrowengg/twigs-react';
import Question from './pages/standalone-survey/Question';
import { fetchInitialQuestion, resetSurvey } from './store/slices/surveySlice';
import { StandaloneSurveyIcon, ChatSurveyIcon, VoiceSurveyIcon, IVRSurveyIcon, WhatsAppSurveyIcon } from './assets/icons';
import ChatSurvey, { ChatSurveyPreview, ChatProfile } from './pages/chat-survey/ChatSurvey';
import WhatsAppSurvey from './components/whatsapp/WhatsAppSurvey';
import VoiceSurvey, { WebCallPreview } from './pages/voice-survey/VoiceSurvey';
import IVRSurvey from './pages/ivr-survey/IVRSurvey.jsx';
import { BrowserRouter, Routes, Route, useParams } from 'react-router-dom';
import { IVRPreview } from './pages/ivr-survey/IVRSurvey';
import { v4 as uuidv4 } from 'uuid';


function App() {

  useEffect(() => {
    const conversationId = uuidv4();
    console.log("📱 ~ useEffect ~ conversationId:", conversationId)
    localStorage.setItem('conversationId', conversationId);
  },[])

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Survey />} />
        <Route path="/survey/:triggerToken" element={<Survey />} />
        <Route path="/standalone/:triggerToken" element={<StandaloneSurvey />} />
        <Route path="/chat/:triggerToken" element={<ChatSurvey />} />
        <Route path="/voice/:triggerToken" element={<VoiceSurvey />} />
        <Route path="/ivr/:triggerToken" element={<IVRSurvey />} />
        <Route path="/call/:triggerToken" element={<IVRAndWebCall />} />
        <Route path="/whatsapp/:triggerToken" element={<WhatsAppSurvey />} />
        <Route path="/chat-profile/:triggerToken" element={<ChatProfile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;



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
  const [surveyType, setSurveyType] = useState('chat');

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

  const { triggerToken } = useParams();

  useEffect(() => {
    dispatch(fetchInitialQuestion({
      triggerToken: triggerToken
    }));
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