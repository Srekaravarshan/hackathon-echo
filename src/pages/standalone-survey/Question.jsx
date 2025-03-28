import { Fragment } from 'react';
import Typewriter from 'typewriter-effect';
import { SurveyContainer, QuestionContainer } from '../../components/StyledComponents';
import { Box } from '@sparrowengg/twigs-react';
import { useSelector } from 'react-redux';
import QuestionsAndResponseComponent from './QuestionsAndResponseComponent';

const Question = () => {

  const { currentQuestion, loading, loadingNextQuestion, theme } = useSelector((state) => state.survey);
  
  return (
    <SurveyContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{ backgroundColor: theme?.secondaryColor, height: '100vh' }}
    >
      <Box css={{
        minHeight: '350px', width: '100%', paddingLeft: '18%', paddingRight: '18%', paddingTop: '50px', paddingBottom: '50px',
        '[data-testid="typewriter-wrapper"]': {
          fontSize: '24px',
          lineHeight: '30px',
          fontWeight: '$5',
          color: theme?.primaryColor
        }
      }} className='dm-sans'>
        {(loading || loadingNextQuestion) ? (
          <QuestionContainer>
            <Typewriter
              key={currentQuestion.question}
              options={{
                strings: [''],
              }}
            />
          </QuestionContainer>
        ) : (
          <Fragment>
            <QuestionsAndResponseComponent />
          </Fragment>
        )}
      </Box>
    </SurveyContainer>
  );
};

export default Question;
