import { useCallback } from "react"
import { useSelector, useDispatch } from "react-redux";
import { fetchNextQuestion } from "../../store/slices/surveySlice";
import { ButtonActions } from "../../components/question-types/constants";
import WelcomeMessageQuestionAndResponse from "./QuestionAndResponseComponents/WelcomeMessageQuestionAndResponse";
import DefaultQuestionAndResponseComponent from "./QuestionAndResponseComponents/DefaultQuestionAndResponseComponent";
import ActionQuestionAndResponse from "./QuestionAndResponseComponents/ActionQuestionAndResponse";
import { Box } from "@sparrowengg/twigs-react";

const QuestionsAndResponseComponent = ({ surveyType }) => {
  const dispatch = useDispatch();

  const { currentQuestion, answers } = useSelector((state) => state.survey);
  console.log("🚀 ~ QuestionsAndResponseComponent ~ answers:", answers)

  const handleResponse = useCallback(async (answer, options = {}) => {
    console.log("🚀 ~ handleResponse ~ answer, options:", answer, options, currentQuestion)
    if (!options?.action || options?.action === ButtonActions.NEXT_QUESTION) {
      await dispatch(fetchNextQuestion(answer));
    } else if (options?.action === ButtonActions.REDIRECT_URL) {
      window.open(options.url, '_blank');
    } else if (options?.action === ButtonActions.END_SURVEY) {
      window.location.href = 'https://surveysparrow.com/';
    }
  }, [dispatch]);

  return (
    <Box className="questions-and-response-component">
      {(() => {
        switch (currentQuestion.type) {
          case 'welcomeMessage':
            return <WelcomeMessageQuestionAndResponse handleResponse={handleResponse} surveyType={surveyType} />;
          case 'action':
            return <ActionQuestionAndResponse handleResponse={handleResponse} surveyType={surveyType} />;
          default:
            return (
              <DefaultQuestionAndResponseComponent handleResponse={handleResponse} currentQuestion={currentQuestion} surveyType={surveyType} />
            );
        }
      })()}
    </Box>
  )
}

export default QuestionsAndResponseComponent;



// {
//   "type": "action",
//   "question": "I am booking demo call on coming saturday",
//   "actionType": "appointment",
//   "hasConfirmation": false,
// }