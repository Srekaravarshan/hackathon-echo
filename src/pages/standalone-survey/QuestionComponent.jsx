import { Box } from '@sparrowengg/twigs-react';
import { useSelector } from 'react-redux';
import Typewriter from 'typewriter-effect';

const QuestionComponent = ({ setAnimationComplete, animationComplete }) => {
  const { currentQuestion, typing } = useSelector((state) => state.survey);

  return (
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
            console.log("🚀 ~ onInit ~ currentQuestion.question:", currentQuestion.question)
            return setAnimationComplete(currentQuestion.question);
          }).start();
        }}
      />
    </Box>
  )
}

export default QuestionComponent;