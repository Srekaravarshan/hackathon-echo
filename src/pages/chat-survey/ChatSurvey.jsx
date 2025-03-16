import { Box, Flex, IconButton, Text } from '@sparrowengg/twigs-react';
import { CloseIcon } from '@sparrowengg/twigs-react-icons';
import { ChatSurveyContainer, QuestionContainer } from '../../components/StyledComponents';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useCallback, Fragment, useEffect } from 'react';
import { fetchInitialQuestion, fetchNextQuestion, resetSurvey } from '../../store/slices/surveySlice';
import Typewriter from 'typewriter-effect';
import ResponseComponent from '../standalone-survey/ResponseQuestion';
import QuestionAnswerTypes from '../../components/question-answer-types/QuestionAnswerTypes';

const ChatSurvey = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchInitialQuestion({ theme: { primaryColor: '#000000', secondaryColor: '#ffffff' } }));

    return () => {
      dispatch(resetSurvey());
    }
  }, [dispatch]);

  return (
    <Flex flexDirection="column" css={{ height: '100vh', width: '100vw', backgroundColor: '#f2f5f8' }} alignItems="center" justifyContent="center" className="dm-sans">
      <Flex flexDirection="column" css={{ height: '85vh', width: '350px' }} alignItems="end" gap="$4">
        <Flex flexDirection="column" css={{ height: '100%', boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px;', backgroundColor: 'white', width: '100%', borderRadius: '$3xl' }}>
          <Flex css={{
            height: '50px',
            backgroundColor: '#e3f2fd',
            borderTopLeftRadius: '$3xl',
            borderTopRightRadius: '$3xl',
            overflow: 'hidden',
          }} alignItems="center">
            <Box
              css={{
                marginTop: 'auto',
                marginLeft: '20px',
                width: '40px',
                height: '40px',
                backgroundColor: '#e3f2fd',
                backgroundImage: 'url(https://static.surveysparrow.com/application/production/1742064379689__9086c18ce55cb2ef57d40d3bfb9160f9faa48865d67c4341b5db44e62aca__pngegg.png)',
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
          <Box css={{ width: '100%', flex: '1', overflow: 'scroll', borderBottomLeftRadius: '$3xl', borderBottomRightRadius: '$3xl' }}>
            <Questions />
          </Box>
        </Flex>
        {/* <Box css={{
          width: '50px',
          border: '1px solid white',
          backgroundColor: '#e3f2fd',
          boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;',
          backgroundImage: 'url(https://static.surveysparrow.com/application/production/1742064379689__9086c18ce55cb2ef57d40d3bfb9160f9faa48865d67c4341b5db44e62aca__pngegg.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          flexShrink: 0,
          height: '50px',
          borderRadius: '$round' }}></Box> */}
      </Flex>
    </Flex>
  )
}

export default ChatSurvey;

const Questions = () => {
 
  const dispatch = useDispatch();
  
  const { currentQuestion, loading, loadingNextQuestion, typing, theme, answers } = useSelector((state) => state.survey);
  
  const [animationComplete, setAnimationComplete] = useState(false);

  const handleResponse = useCallback(async (answer) => {
    dispatch(fetchNextQuestion(answer));
  }, [dispatch]);
  
  return (
    <ChatSurveyContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{ backgroundColor: theme?.secondaryColor }}
    >
      <Flex flexDirection="column" gap="$4" css={{
        minHeight: '350px', width: '100%',
        padding: '30px 8%',
        '[data-testid="typewriter-wrapper"]': {
          fontSize: '14px',
          lineHeight: '18.2px',
          fontWeight: '$5',
          color: theme?.primaryColor
        },
      }} className='dm-sans'>
        {answers.map((answer, index) => (
          <Box key={index}>
            <Box css={{ backgroundColor: '#f2f5f8', width: '100%', padding: '$4', borderRadius: '0 $lg $lg $lg', marginBottom: '$2' }}>
              <Text css={{ overflowWrap: 'anywhere' }}>{answer.question.question}</Text>
            </Box>
            <QuestionAnswerTypes answer={answer} />
          </Box>
        ))}
        {(loading || loadingNextQuestion) ? (
          <QuestionContainer style={{ padding: '8px', backgroundColor: '#f2f5f8', width: '100%', borderRadius: '0 0.5rem 0.5rem 0.5rem' }}>
            <Typewriter
              key={currentQuestion.question}
              options={{
                strings: [''],
              }}
            />
          </QuestionContainer>
        ) : (
          <Fragment>
            <Box css={{
              marginBottom: '1.2rem',
              '.Typewriter__cursor': {
                ...(currentQuestion.question === animationComplete && { display: 'none' }),
                ...(typing && { display: 'none' })
              },
              '[data-testid="typewriter-wrapper"]': {
                transition: 'opacity 0.2s ease-in-out',
                ...(typing && { opacity: '0.5' })
              },
              padding: '$4', backgroundColor: '#f2f5f8', width: '100%', borderRadius: '0 0.5rem 0.5rem 0.5rem'
            }}>
              <Typewriter
                key={currentQuestion.question}
                onInit={(typewriter) => {
                  typewriter.changeDelay(15).typeString(currentQuestion.question).callFunction(() => {
                    return setAnimationComplete(currentQuestion.question);
                  }).start();
                }}
              />
            </Box>
            <ResponseComponent
              currentQuestion={currentQuestion} 
              handleResponse={handleResponse} 
              animationComplete={animationComplete === currentQuestion.question}
            />
          </Fragment>
        )}
      </Flex>
    </ChatSurveyContainer>
  );
}