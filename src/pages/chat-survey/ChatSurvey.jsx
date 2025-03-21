import { Box, Flex, IconButton, Tabs, TabsList, TabsTrigger, Text, ThemeProvider, Tooltip, TooltipProvider, keyframes } from '@sparrowengg/twigs-react';
import { CloseIcon } from '@sparrowengg/twigs-react-icons';
import { ChatSurveyContainer } from '../../components/StyledComponents';
import { useDispatch, useSelector } from 'react-redux';
import { Fragment, useEffect, forwardRef, useRef, useState } from 'react';
import { fetchInitialQuestion, resetSurvey } from '../../store/slices/surveySlice';
import QuestionAnswerTypes from '../../components/question-answer-types/QuestionAnswerTypes';
import QuestionsAndResponseComponent from '../standalone-survey/QuestionsAndResponseComponent';
import { useParams } from 'react-router-dom';
import { ChatSurveyIcon, VoiceSurveyIcon } from '../../assets/icons';
import { WebCallPreview } from '../voice-survey/VoiceSurvey';

export const ChatProfile = () => {

  const dispatch = useDispatch();

  const profileImage = 'https://static.surveysparrow.com/application/production/1742317383073__695b1268fdc427427b32db00e0f87aeb06c23d6b670a1ea147124b54966a__Frame-removebg-preview.png';
  const accentColor = '#F5D161';

  useEffect(() => {
    dispatch(fetchInitialQuestion({ theme: { primaryColor: '#000000', secondaryColor: '#ffffff', actionColor: '#F5D161', profileImage: profileImage } }));

    return () => {
      dispatch(resetSurvey());
    }
  }, [dispatch]);

  return (
    <Box css={{
      width: '50px',
      border: '1px solid white',
      backgroundColor: accentColor,
      backgroundImage: `url(${profileImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      flexShrink: 0,
      height: '50px',
      borderRadius: '$round' }}  
    />
  )
}

const ChatSurvey = () => {
  const dispatch = useDispatch();

  const { currentQuestion } = useSelector((state) => state.survey);

  const [surveyType, setSurveyType] = useState('chat');


  const profileImage = 'https://static.surveysparrow.com/application/production/1742317383073__695b1268fdc427427b32db00e0f87aeb06c23d6b670a1ea147124b54966a__Frame-removebg-preview.png';
  const primaryColor = '#000000';
  const secondaryColor = '#ffffff';
  const accentColor = '#F5D161';
  const actionColor = '#F5D161';


  useEffect(() => {
    dispatch(fetchInitialQuestion({ theme: { primaryColor, secondaryColor: '#ffffff', actionColor: '#F5D161', profileImage: profileImage } }));

    return () => {
      dispatch(resetSurvey());
    }
  }, [dispatch]);

  return (
    <ThemeProvider>
      <Flex
        flexDirection="column"
        css={{
          height: '100vh',
          width: '100vw',
          backgroundColor: '#f2f5f8',
          boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px;',
          '.choice-option': {
            fontSize: '14px !important',
            lineHeight: '18.2px !important',
            padding: '8px !important',
          },

          '.answer-input': {
            fontSize: '14px !important',
            lineHeight: '18.2px !important',
          },

          '.opinion-scale-option': {
            fontSize: '14px !important',
            lineHeight: '18.2px !important',
            padding: '4px !important',
            height: '32px !important',
            width: '32px !important',
          },

          '.yes-no-option-container :global(.twigs-button__content) > div > p': {
            fontSize: '14px !important',
            lineHeight: '18.2px !important',
          },

          '.yes-no-option-container button': {
            width: '90px !important',
          },

          '.yes-no-option-container :global(.twigs-button__content) > svg': {
            width: '24px !important',
            height: '24px !important',
          },

          '.yes-no-option-container :global(.twigs-button__content) > div > div > p': {
            fontSize: '12px !important',
            lineHeight: '15.6px !important',
          },

          '.yes-no-option-container :global(.twigs-button__content) > div > div': {
            height: '20px !important',
            width: '20px !important',
          },

          // '.questions-and-response-component':{
          //   display: 'flex',
          //   flexDirection: 'column',
          //   flex: '1',
          // },

          '[data-question-type="welcomeMessage"] .chat-survey-messages-body': {
            position: 'relative'
          },

          '.welcome-message': {
            flex: '1',
            display: 'flex',
            flexDirection: 'column',
            position: 'absolute',
            top: '0',
            left: '0',
            right: '0',
            bottom: '0',
            justifyContent: 'start',
            alignItems: 'start',
            zIndex: '99',
            padding: '32px 32px 32px 32px',
            width: '100%',
            textAlign: 'start',
            background: `linear-gradient(to bottom, ${actionColor ?? 'white'}, ${secondaryColor ?? 'white'})`,
          },
          '.welcome-message-question-container': {
            marginTop: 'auto',
            marginBottom: 'auto',
          },
          '.welcome-message-answer': {
            marginTop: 'auto',
            width: '100%',
          },

          '.welcome-message-question .Typewriter': {
            fontSize: '$2xl',
            lineHeight: '$2xl',
          },

          '.welcome-message-description .Typewriter': {
            fontSize: '$xl',
            lineHeight: '$xl',
          },

          // '.welcome-message-options button': {
          //   width: '100%',
          // },
          '.welcome-message-option': {
            width: '100%',
            fontSize: '$md',
            lineHeight: '$md',
            minHeight: '48px',
            height: 'auto'
          },
          '.question-component-typewriter, .action-question-text': {
            padding: '$4', position: 'relative', backgroundColor: `${actionColor}4d`, width: '100%', borderRadius: '0 0.5rem 0.5rem 0.5rem',
            '&::before': {
              content: ' ',
              position: 'absolute',
              top: '0',
              left: 'auto',
              right: 'calc(100% + $3)',
              width: '$4',
              height: '$4',
              backgroundColor: `${actionColor}`,
              borderRadius: '$round',
              backgroundImage: `url(${profileImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
            }
          },

          '.action-question-text': {
            marginBottom: '0.5rem',
          },
          '.action-question-text.ACTION_COMPLETED [data-testid="typewriter-wrapper"]': {
            opacity: '1',
          },
          '.buttons-options': {
            button: {
              flexShrink: '0',
              height: '38px',
              padding: '8px 16px',
              fontSize: '$sm',
              lineHeight: '$sm',
            }
          },
          '.rating-option': {
            gap: '$4'
          },
          '.rating-option svg': {
            height: '32px',
            width: '32px',
          },
          '.submit-button': {
            // position: 'fixed',
            bottom: '10px',
            // left: 'auto',
            right: '50px',
          },
          overflow: 'hidden',
        }}
        alignItems="center"
        justifyContent="center"
        className="dm-sans chat-survey-wrapper"
      >
        <Flex
          css={{
            height: '100vh', width: '100vw', overflow: 'scroll', maxHeight: '100vh',
            backgroundColor: secondaryColor,
            ...(surveyType === 'chat' && {
              display: 'none',
            }),
          }}
        >
          <WebCallPreview css={{ height: '100%', width: '100%', boxShadow: 'none' }} />
        </Flex>
        <Flex
          className="chat-survey"
          css={{
            height: '100vh', width: '100vw', overflow: 'scroll', maxHeight: '100vh',
            ...(surveyType === 'voice' && {
              display: 'none',
            }),
          }}
          flexDirection="column"
          data-question-type={currentQuestion?.type}
        >
          <Flex css={{
            height: '50px',
            backgroundColor: accentColor,
            overflow: 'hidden',
            width: '100%',
            position: 'sticky',
            top: '0',
            zIndex: '99',
          }} alignItems="center" className="chat-survey-header">
            <Box
              css={{
                marginTop: 'auto',
                marginLeft: '20px',
                width: '40px',
                height: '40px',
                backgroundColor: accentColor,
                backgroundImage: `url(${profileImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                flexShrink: 0,
              }}
            >
            </Box>
            <Box>
              <Text size="sm" weight="medium" css={{ color: '$neutral900', marginLeft: '10px' }} truncate>Leo</Text>
              <Text size="xs" css={{ color: '$neutral800', marginLeft: '10px' }} truncate>Personalized Travel Booking Agent</Text>
            </Box>
            <IconButton icon={<CloseIcon />} color="default" css={{ marginRight: '$6', marginLeft: 'auto', opacity: '0', pointerEvents: 'none' }} />
          </Flex>
          <Box css={{
            width: '100%', flex: '1', overflow: 'scroll',
          }} className="chat-survey-body">
            <Questions />
          </Box>
        </Flex>
        <Fab surveyType={surveyType} setSurveyType={setSurveyType} />
      </Flex>
    </ThemeProvider>
  )
}
export const ChatSurveyPreview = () => {

  const triggerToken = useParams().triggerToken ?? '23';

  return (
    <ThemeProvider>
      <Flex flexDirection="column" css={{ height: '100vh', width: '100vw', backgroundColor: '#f2f5f8' }} alignItems="center" justifyContent="center" className="dm-sans">
        <Flex flexDirection="column" css={{ 
          height: '100%',
          width: '350px',
          paddingTop: '20px',
          paddingBottom: '86px',
        }} alignItems="end" gap="$4" justifyContent="center">
          <Flex flexDirection="column" css={{ height: '100%', maxHeight: '580px', borderRadius: '$3xl', overflow: 'hidden', backgroundColor: 'white', width: '100%' }}>
            <Box as="iframe" src={`http://localhost:5173/chat/${triggerToken}`} css={{ height: '100%', width: '100%' }} />
          </Flex>
        </Flex>
      </Flex>
    </ThemeProvider>
  )
}

export default ChatSurvey;


const Questions = () => {
  const { loading, loadingNextQuestion, theme, currentQuestion, actionData } = useSelector((state) => state.survey);
  const containerRef = useRef(null);

  const loadingDot = keyframes({
    '0%': {
      backgroundColor: theme?.primaryColor,
    },
    '50%, 100%': {
      backgroundColor: `${theme?.primaryColor}33`,
    }
  })

  useEffect(() => {
    if (containerRef.current && currentQuestion) {
      containerRef.current.scrollTo({
        top: containerRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [currentQuestion, loadingNextQuestion, actionData]);

  return (
    <ChatSurveyContainer
      ref={containerRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{ backgroundColor: theme?.secondaryColor }}
      className="chat-survey-container"
    >
      <Flex
        flexDirection="column"
        gap="$6"
        css={{
          minHeight: '100%',
          padding: '30px 8%',
          paddingBottom: '60px',
          '[data-testid="typewriter-wrapper"]': {
            fontSize: '14px',
            lineHeight: '18.2px',
            fontWeight: '$5',
            color: theme?.primaryColor
          },
          ...(loading || loadingNextQuestion && {
            '.questions-and-response-component':{
              display: 'none',
            }
          })
        }}
        className='dm-sans chat-survey-messages-body'
      >
        <ChatHistory />
        <QuestionsAndResponseComponent surveyType="chat"/>
        {loadingNextQuestion && (
          <Box
            css={{
              padding: '$4',
              position: 'relative', backgroundColor: `${theme?.actionColor}4d`, width: 'fit-content',
              borderRadius: '0 0.5rem 0.5rem 0.5rem'
            }}
          >

            <Box css={{
              position: 'relative',
              marginLeft: '9px',
              marginRight: '9px',
              width: '7px',
              height: '7px',
              borderRadius: '5px',
              backgroundColor: theme?.primaryColor,
              color: theme?.primaryColor,
              animation: `${loadingDot} 0.5s infinite linear alternate`,
              animationDelay: '0.25s',
              '&::before, &::after': {
                content: '""',
                display: 'inline-block',
                position: 'absolute',
                top: '0',
              },
              '&::before': {
                left: '-9px',
                width: '7px',
                height: '7px',
                borderRadius: '5px',
                backgroundColor: theme?.primaryColor,
                color: theme?.primaryColor,
                animation: `${loadingDot} 0.5s infinite alternate`,
                animationDelay: '0s',
              },
              '&::after': {
                left: '9px',
                width: '7px',
                height: '7px',
                borderRadius: '5px',
                backgroundColor: theme?.primaryColor,
                color: theme?.primaryColor,
                animation: `${loadingDot} 0.5s infinite alternate`,
                animationDelay: '0.5s',
              },
            }}>

            </Box>
          </Box>
        )}
      </Flex>
    </ChatSurveyContainer>
  );
}

const Fab = ({ surveyType, setSurveyType }) => {
  
  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip content={surveyType === 'voice' ? 'Switch to Chat' : 'Switch to Voice'} className="dm-sans" side="left">
        <Box
          as="button"
          variant="ghost"
          color="default"
          size="md"
          css={{
            // height: '42px',
            // zIndex: '1000',
            cursor: 'pointer',
            position: 'fixed',
            bottom: '10px',
            right: '10px',
            left: 'auto',
            borderRadius: '$round',
            padding: '$4',
            gap: '$4',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            width: 'fit-content',
            lineHeight: '0',
            '&, &:hover, &:focus, &:active': {
              backgroundColor: '$neutral900 !important',
              border: '1px solid #717171 !important',
              color: '$neutral700 !important',
            },
            // backgroundColor: '$neutral900',
            // border: '1px solid #717171',
            // color: '$neutral700',
          }}
          onClick={() => setSurveyType(surveyType === 'chat' ? 'voice' : 'chat')}
        >
          {surveyType === 'voice' ? <ChatSurveyIcon size="18" /> : <VoiceSurveyIcon size="18" />}
        </Box>
      </Tooltip>
    </TooltipProvider>
  )
}

const BottomBar = () => {
  const [surveyType, setSurveyType] = useState('chat');
  return (
    <TooltipProvider delayDuration={0}>
      <Tabs defaultValue={surveyType} onValueChange={setSurveyType} css={{
        // position: 'absolute', 
        borderRadius: '16px', 
        // bottom: '0px', 
        // width: '100%', 
        // left: '50%', 
        // transform: 'translateX(-50%)', 
        zIndex: '100'
      }}>
        <TabsList
          aria-label="tabs example"
          css={{
            backgroundColor: '$neutral900',
            border: '1px solid #717171',
            borderRadius: '$pill',
            padding: '$4 $5',
            gap: '$4',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
          }}
        >
          <SurveyTypeTab value="chat" tooltip="Chat Survey">
            <ChatSurveyIcon size="22" />
          </SurveyTypeTab>
          <Box css={{ width: '1px', height: '$4', borderRadius: '$pill', margin: 'auto', backgroundColor: '$neutral700' }} />
          <SurveyTypeTab value="voice" tooltip="Voice Survey">
            <VoiceSurveyIcon size="22" />
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

const ChatHistory = () => {
  const { answers, theme } = useSelector((state) => state.survey);

  return (
    <Fragment>
      {answers.map((answer, index) => (
        <Box key={index} className="chat-survey-message-container">
          <AIPill css={{  marginBottom: '$2', opacity: '1' }}>
            <Text css={{ overflowWrap: 'anywhere', color: `${theme?.primaryColor}` }}>{answer.question.question}</Text>
          </AIPill>
          <QuestionAnswerTypes answer={answer} />
        </Box>
      ))}
    </Fragment>
  )
}

const AIPill = forwardRef(({ children, css }, ref) => {
  const theme = useSelector((state) => state.survey.theme);

  const profileImage = theme?.profileImage;

  return (
    <Box css={{ padding: '$4', position: 'relative', backgroundColor: `${theme?.actionColor}4d`, width: '100%', borderRadius: '0 0.5rem 0.5rem 0.5rem', ...css }} ref={ref}>
      <Box css={{ position: 'absolute', top: '0', left: 'auto', right: 'calc(100% + $3)', width: '$4', height: '$4', backgroundColor: `${theme?.actionColor}`, borderRadius: '$round', backgroundImage: `url(${profileImage})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }} />
      {children}
    </Box>
  )
});

AIPill.displayName = 'AIPill';

