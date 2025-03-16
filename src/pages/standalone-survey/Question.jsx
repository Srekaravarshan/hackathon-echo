import { useState, Fragment, useCallback } from 'react';
import Typewriter from 'typewriter-effect';
import { SurveyContainer, QuestionContainer } from '../../components/StyledComponents';
import { YesOrNo, MultipleChoice, SingleChoice, Message, FileUpload, Audio, TextInput, OpinionScale, EndMessage } from '../../components/QuestionTypes';
import { Box } from '@sparrowengg/twigs-react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchNextQuestion } from '../../store/slices/surveySlice';
import ResponseComponent from './ResponseQuestion';

const Question = () => {

  const dispatch = useDispatch();
  
  const { currentQuestion, loading, loadingNextQuestion, typing, theme } = useSelector((state) => state.survey);
  
  const [animationComplete, setAnimationComplete] = useState(false);

  const handleResponse = useCallback(async (answer) => {
    dispatch(fetchNextQuestion(answer));
  }, [dispatch]);
  
  return (
    <SurveyContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{ backgroundColor: theme?.secondaryColor }}
    >
      <Box css={{
        minHeight: '350px', width: '100%', paddingLeft: '18%', paddingRight: '18%', paddingTop: '50px', paddingBottom: '50px',
        '[data-testid="typewriter-wrapper"]': {
          fontSize: '24px', lineHeight: '30px', fontWeight: '$5',
          color: theme?.primaryColor
        }
      }} className='dm-sans'>
        {(loading || loadingNextQuestion) ? (
          <Fragment>
            <QuestionContainer>
              <Typewriter
                key={currentQuestion.question}
                options={{
                  strings: [''],
                }}
              />
            </QuestionContainer>
          </Fragment>
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
              }
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
      </Box>
    </SurveyContainer>
  );
};

export default Question;
