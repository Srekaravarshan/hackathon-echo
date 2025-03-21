import { Box } from "@sparrowengg/twigs-react";
import WelcomeMessage from "../../../components/question-types/WelcomeMessage";
import { useDispatch, useSelector } from "react-redux";
import { Fragment, useEffect, useState, useRef } from "react";
import Typewriter from "typewriter-effect";
import { appointmentAction } from "../../../components/actions/actions";
import { updateActionData } from "../../../store/slices/surveySlice";
import DefaultQuestionAndResponseComponent from "./DefaultQuestionAndResponseComponent";
import TextTypewriter from "../../components/TextTypewriter";
import { executeAction } from "../../../apis";

const ActionQuestionAndResponse = ({ handleResponse }) => {
  const [animationComplete, setAnimationComplete] = useState(false);
  const { currentQuestion, typing, actionData } = useSelector((state) => state.survey);
  const additionalMeta = useRef({})
  console.log("📱 ~ ActionQuestionAndResponse ~ actionData:", actionData)
  console.log("📱 ~ ActionQuestionAndResponse ~ additionalMeta:", additionalMeta.current)
  
  console.log("📱 ~ ActionQuestionAndResponse ~ currentQuestion:", currentQuestion)

  const dispatch = useDispatch();

  useEffect(() => {
    performAction();
  }, []);

  const performAction = async () => {
    dispatch(updateActionData({
      actionStatus: 'ACTION_STARTED',
    }));
    const { response, actionStatus } = await executeAction({
      action: currentQuestion.action,
      actionMeta: currentQuestion.actionMeta,
      userId: currentQuestion.userId
    });
    console.log('🚀 ~ performAction ~ response:', response);
    additionalMeta.current = response;
    dispatch(updateActionData({
      actionStatus,
      response: {
        question: response.question,
        type: response.type,
        choices: response?.choices || []
      }
    }))
  }

  return (
    <Fragment>
      {/* <Box css={{
        marginBottom: '1.2rem',
        '.Typewriter__cursor': {
          ...(currentQuestion.question === animationComplete && { display: 'none' }),
          ...(typing && { display: 'none' })
        },
        '[data-testid="typewriter-wrapper"]': {
          // transition: 'opacity 0.2s ease-in-out',
          // fontSize: '$5xl !important',
          // lineHeight: '$5xl !important',
          // fontWeight: '$7 !important',
          ...(actionData.actionStatus === 'ACTION_STARTED' && { opacity: '0.5' }),
          ...(actionData.actionStatus === 'ACTION_COMPLETED' && {
            opacity: '0.5',
            fontSize: '$sm !important',
            lineHeight: '$sm !important',
            fontWeight: '$4 !important',
          }),
          transition: 'all 0.2s ease-in-out',
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
      </Box> */}
      <TextTypewriter
        text={currentQuestion.question}
        makeDim={
          // actionData.actionStatus === 'ACTION_STARTED' || 
          actionData.actionStatus === 'ACTION_COMPLETED'}
        makeSmall={actionData.actionStatus === 'ACTION_COMPLETED'}
        onAnimationComplete={() => setAnimationComplete(currentQuestion.question)}
        hideCursor={currentQuestion.question === animationComplete}
      />
      {actionData.actionStatus === 'ACTION_STARTED' && animationComplete === currentQuestion.question && (
        <Box css={{
          marginBottom: '1.2rem',
          '.Typewriter__cursor': {
            ...(currentQuestion.question === animationComplete && { display: 'none' }),
            ...(typing && { display: 'none' })
          },
          '[data-testid="typewriter-wrapper"]': {
            transition: 'opacity 0.2s ease-in-out',
            fontSize: '$sm !important',
            lineHeight: '$sm !important',
            fontWeight: '$4 !important',
            ...(typing && { opacity: '0.5' })
          }
        }}>
          <Typewriter
            options={{
              strings: ['Executing action...'],
              autoStart: true,
              delay: 4,
              deleteSpeed: 4,
              loop: true,
            }}
          />
        </Box>
      )}
      {/* <Box
        css={{
          opacity: animationComplete ? 1 : 0,
          transition: 'opacity 0.4s ease-in-out',
          marginLeft: 'auto',
          marginRight: 'auto',
        }}
      >
        <WelcomeMessage currentQuestion={currentQuestion} onAnswer={handleResponse} />
      </Box> */}
      {actionData.actionStatus === 'ACTION_COMPLETED' && actionData.response.question && (
        <DefaultQuestionAndResponseComponent 
          currentQuestion={actionData.response}
          handleResponse={handleResponse}
          additionalMeta={additionalMeta.current}
        />
      )}
    </Fragment>
  );
};

export default ActionQuestionAndResponse;
