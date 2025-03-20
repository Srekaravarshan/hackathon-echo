import { Box } from "@sparrowengg/twigs-react";
import WelcomeMessage from "../../../components/question-types/WelcomeMessage";
import { useSelector } from "react-redux";
import { Fragment, useState } from "react";
import Typewriter from "typewriter-effect";

const WelcomeMessageQuestionAndResponse = ({ handleResponse }) => {
  const [animationComplete, setAnimationComplete] = useState(false);
  const [descriptionAnimationComplete, setDescriptionAnimationComplete] = useState(false);
  const { currentQuestion, typing } = useSelector((state) => state.survey);

  return (
    <Fragment>
      <Box css={{
        marginBottom: '1.2rem',
        '.Typewriter__cursor': {
          ...(currentQuestion.question === animationComplete && { display: 'none' }),
          ...(typing && { display: 'none' })
        },
        '[data-testid="typewriter-wrapper"]': {
          transition: 'opacity 0.2s ease-in-out',
          fontSize: '$5xl !important',
          lineHeight: '$5xl !important',
          fontWeight: '$7 !important',
          // textAlign: 'center',
          ...(typing && { opacity: '0.5' })
        }
      }}>
        <Typewriter
          key={currentQuestion.question}
          onInit={(typewriter) => {
            typewriter.changeDelay(15).typeString(currentQuestion.question).callFunction(() => {
              if (typeof currentQuestion?.description !== 'string' || !currentQuestion?.description?.length) {
                setDescriptionAnimationComplete(true);
              }
              return setAnimationComplete(currentQuestion.question);
            }).start();
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
          fontSize: '$3xl !important',
          lineHeight: '$3xl !important',
          // textAlign: 'center',
          ...(typing && { opacity: '0.5' })
        }
      }}>
        <Typewriter
          key={currentQuestion.question}
          onInit={(typewriter) => {
            typewriter.changeDelay(15).typeString(currentQuestion.description).callFunction(() => {
              return setDescriptionAnimationComplete(currentQuestion.description);
            }).start();
          }}
        />
      </Box>}
      <Box
        css={{
          opacity: descriptionAnimationComplete ? 1 : 0,
          transition: 'opacity 0.4s ease-in-out',
          marginLeft: 'auto',
          marginRight: 'auto',
        }}
      >
        <WelcomeMessage currentQuestion={currentQuestion} onAnswer={handleResponse} />
      </Box>
    </Fragment>
  );
};

export default WelcomeMessageQuestionAndResponse;
