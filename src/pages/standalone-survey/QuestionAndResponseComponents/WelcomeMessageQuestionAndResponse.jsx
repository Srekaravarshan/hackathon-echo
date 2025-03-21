import { Box } from "@sparrowengg/twigs-react";
import WelcomeMessage from "../../../components/question-types/WelcomeMessage";
import { useSelector } from "react-redux";
import { useState } from "react";
import Typewriter from "typewriter-effect";
import TextTypewriter from "../../components/TextTypewriter";

const WelcomeMessageQuestionAndResponse = ({ handleResponse, surveyType }) => {
  const [animationComplete, setAnimationComplete] = useState(false);
  const [descriptionAnimationComplete, setDescriptionAnimationComplete] = useState(false);
  const { currentQuestion, typing } = useSelector((state) => state.survey);

  return (
    <Box className="welcome-message">
      <Box className="welcome-message-question-container">
        <Box css={{
          marginBottom: '1.2rem',
          '.Typewriter__cursor': {
            ...(currentQuestion.question === animationComplete && { display: 'none' }),
            ...(typing && { display: 'none' })
          },
          '[data-testid="typewriter-wrapper"]': {
            transition: 'opacity 0.2s ease-in-out',
            fontSize: '$5xl',
            lineHeight: '$5xl',
            fontWeight: '$7',
            ...(typing && { opacity: '0.5' })
          }
        }} className="welcome-message-question">
          <TextTypewriter
            className="welcome-message-question-text"
            text={currentQuestion.question}
            onAnimationComplete={() => {
              if (typeof currentQuestion?.description !== 'string' || !currentQuestion?.description?.length) {
                setDescriptionAnimationComplete(true);
              }
              return setAnimationComplete(currentQuestion.question);
            }}
          />
        </Box>
        {typeof currentQuestion?.description === 'string' && animationComplete && currentQuestion?.description?.length && <Box css={{
          marginBottom: '1.2rem',
          '.Typewriter__cursor': {
            ...(currentQuestion.question === animationComplete && { display: 'none' }),
            ...(typing && { display: 'none' })
          },
          '[data-testid="typewriter-wrapper"]': {
            transition: 'opacity 0.2s ease-in-out',
            fontSize: '$3xl',
            lineHeight: '$3xl',
            ...(typing && { opacity: '0.5' })
          }
        }} className="welcome-message-description">
          <Typewriter
            key={currentQuestion.question}
            onInit={(typewriter) => {
              typewriter.changeDelay(15).typeString(currentQuestion.description).callFunction(() => {
                return setDescriptionAnimationComplete(currentQuestion.description);
              }).start();
            }}
          />
        </Box>}
      </Box>
      <Box
        css={{
          opacity: descriptionAnimationComplete ? 1 : 0,
          transition: 'opacity 0.4s ease-in-out',
        }}
        className="welcome-message-answer"
      >
        <WelcomeMessage currentQuestion={currentQuestion} onAnswer={handleResponse} />
      </Box>
    </Box>
  );
};

export default WelcomeMessageQuestionAndResponse;
