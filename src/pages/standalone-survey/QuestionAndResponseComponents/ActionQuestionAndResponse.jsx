import { Box } from "@sparrowengg/twigs-react";
import { useDispatch, useSelector } from "react-redux";
import { Fragment, useEffect, useState, useRef } from "react";
import Typewriter from "typewriter-effect";
import { appointmentAction } from "../../../components/actions/actions";
import { updateActionData, addChatAnswer } from "../../../store/slices/surveySlice";
import DefaultQuestionAndResponseComponent from "./DefaultQuestionAndResponseComponent";
import TextTypewriter from "../../components/TextTypewriter";
import { executeAction } from "../../../apis";

const ActionQuestionAndResponse = ({ handleResponse, surveyType }) => {
  const [animationComplete, setAnimationComplete] = useState(false);
  const { currentQuestion, typing, actionData } = useSelector((state) => state.survey);
  const additionalMeta = useRef({})
  console.log("📱 ~ ActionQuestionAndResponse ~ actionData:", actionData)
  console.log("📱 ~ ActionQuestionAndResponse ~ additionalMeta:", additionalMeta.current)
  
  console.log("📱 ~ ActionQuestionAndResponse ~ currentQuestion:", currentQuestion)

  const [actionSuccessMessage, setActionSuccessMessage] = useState(false);

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
        actionSuccessMessage: response.actionSuccessMessage?.actionExecutedMessage,
        question: response.question,
        type: response.type,
        choices: response?.choices || []
      }
    }))
  }

  return (
    <Box className={`action-question-and-response ${actionData.actionStatus}`}>
      <TextTypewriter
        text={currentQuestion.question}
        makeDim={
          actionData.actionStatus === 'ACTION_COMPLETED'}
        makeSmall={actionData.actionStatus === 'ACTION_COMPLETED'}
        onAnimationComplete={() => setAnimationComplete(currentQuestion.question)}
        hideCursor={currentQuestion.question === animationComplete}
        className={`action-question-text ${actionData.actionStatus}`}
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
            fontSize: '$sm',
            lineHeight: '$sm',
            fontWeight: '$4',
            ...(typing && { opacity: '0.5' })
          }
        }} className={`action-loading-text ${actionData.actionStatus}`}>
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
      {actionData.actionStatus === 'ACTION_COMPLETED' && actionData.response.actionSuccessMessage && actionData.response.question && (
        <TextTypewriter
          className={`action-success-text ${actionData.actionStatus}`}
          text={actionData.response.actionSuccessMessage}
          makeDim={typing}
          onAnimationComplete={() => setActionSuccessMessage(true)}
          hideCursor={actionSuccessMessage}
        />
      )}
      {actionData.actionStatus === 'ACTION_COMPLETED' && (!actionData.response.actionSuccessMessage || actionSuccessMessage) && actionData.response.question && (
        <DefaultQuestionAndResponseComponent 
          currentQuestion={actionData.response}
          handleResponse={async (answer, options) => {
            await handleResponse(answer, options);
            if (surveyType === 'chat') {
              dispatch(addChatAnswer({
                question: actionData.response,
                // type: actionData.response.type,
                answer: answer,
                // options: options,
              }));
              // return handleResponse(answer, options);
            }
          }}
          additionalMeta={additionalMeta.current}
        />
      )}
    </Box>
  );
};

export default ActionQuestionAndResponse;
