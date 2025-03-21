import { Box, Flex, IconButton, Text, ThemeProvider } from '@sparrowengg/twigs-react';
import { CloseIcon } from '@sparrowengg/twigs-react-icons';
import { ChatSurveyContainer } from '../../components/StyledComponents';
import { useDispatch, useSelector } from 'react-redux';
import { Fragment, useEffect, forwardRef } from 'react';
import { fetchInitialQuestion, resetSurvey } from '../../store/slices/surveySlice';
import QuestionAnswerTypes from '../../components/question-answer-types/QuestionAnswerTypes';
import QuestionsAndResponseComponent from '../standalone-survey/QuestionsAndResponseComponent';

const ChatSurvey = () => {
  const dispatch = useDispatch();

  const profileImage = 'https://static.surveysparrow.com/application/production/1742317383073__695b1268fdc427427b32db00e0f87aeb06c23d6b670a1ea147124b54966a__Frame-removebg-preview.png';
  const accentColor = '#F5D161';
  const actionColor = '#F5D161';


  useEffect(() => {
    dispatch(fetchInitialQuestion({ theme: { primaryColor: '#000000', secondaryColor: '#ffffff', actionColor: '#F5D161', profileImage: profileImage } }));

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

        '.questions-and-response-component':{
          display: 'flex',
          flexDirection: 'column',
          flex: '1',
        },

        '.welcome-message': {
          flex: '1',
          display: 'flex',
          flexDirection: 'column',
        },
        '.welcome-message-answer': {
          marginTop: 'auto',
        },

        '.welcome-message-question .Typewriter': {
          fontSize: '$2xl',
          lineHeight: '$2xl',
        },

        '.welcome-message-description .Typewriter': {
          fontSize: '$xl',
          lineHeight: '$xl',
        },

        '.welcome-message-options button': {
          width: '100%',
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
        }
      }}
      alignItems="center"
      justifyContent="center"
      className="dm-sans"
    >
      <Flex css={{
        height: '50px',
        backgroundColor: accentColor,
        overflow: 'hidden',
        width: '100%',
        position: 'sticky',
        top: '0',
        zIndex: '99',
      }} alignItems="center">
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
        <IconButton icon={<CloseIcon />} color="default" css={{ marginRight: '$6', marginLeft: 'auto' }} />
      </Flex>
      <Box css={{
        width: '100%', flex: '1', overflow: 'scroll',
      }}>
        <Questions />
      </Box>
    </Flex>
    </ThemeProvider>
  )
}
export const ChatSurveyPreview = () => {

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
            <Box as="iframe" src="http://localhost:5173/chat/23" css={{ height: '100%', width: '100%' }} />
          </Flex>
          {/* <Box css={{
            width: '50px',
            border: '1px solid white',
            backgroundColor: accentColor,
            boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;',
            backgroundImage: `url(${profileImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            flexShrink: 0,
            height: '50px',
            borderRadius: '$round' }}></Box> */}
        </Flex>
      </Flex>
    </ThemeProvider>
  )
}

export default ChatSurvey;

const Questions = () => {
  const { loading, loadingNextQuestion, theme } = useSelector((state) => state.survey);
  
  return (
    <ChatSurveyContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{ backgroundColor: theme?.secondaryColor }}
    >
      <Flex flexDirection="column" gap="$6" css={{
        minHeight: '100%',
        padding: '30px 8%',
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
      }} className='dm-sans'>
        <ChatHistory />
        <QuestionsAndResponseComponent />
        {/* {(loading || loadingNextQuestion) ? (
          <AIPill>
            <Typewriter
              key={currentQuestion.question}
              options={{
                strings: [''],
              }}
            />
          </AIPill>
        ) : (
          <ChatQuestion handleResponse={handleResponse} animationComplete={animationComplete} typing={typing} setAnimationComplete={setAnimationComplete} />
        )} */}
        {/* <Box css={{ height: '50px' }}/> */}
      </Flex>
    </ChatSurveyContainer>
  );
}

const ChatHistory = () => {
  const { answers, theme } = useSelector((state) => state.survey);

  return (
    <Fragment>
      {answers.map((answer, index) => (
        <Box key={index}>
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

