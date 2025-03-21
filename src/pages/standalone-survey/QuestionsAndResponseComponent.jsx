import { useCallback } from "react"
import { useSelector, useDispatch } from "react-redux";
import { fetchNextQuestion } from "../../store/slices/surveySlice";
import { ButtonActions } from "../../components/question-types/constants";
import WelcomeMessageQuestionAndResponse from "./QuestionAndResponseComponents/WelcomeMessageQuestionAndResponse";
import DefaultQuestionAndResponseComponent from "./QuestionAndResponseComponents/DefaultQuestionAndResponseComponent";
import ActionQuestionAndResponse from "./QuestionAndResponseComponents/ActionQuestionAndResponse";
import { Box } from "@sparrowengg/twigs-react";

const QuestionsAndResponseComponent = () => {
  const dispatch = useDispatch();

  const { currentQuestion } = useSelector((state) => state.survey);

  const handleResponse = useCallback(async (answer, options = {}) => {
    if (!options?.action || options?.action === ButtonActions.NEXT_QUESTION) {
      dispatch(fetchNextQuestion(answer));
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
            return <WelcomeMessageQuestionAndResponse handleResponse={handleResponse} />;
          case 'action':
            return <ActionQuestionAndResponse handleResponse={handleResponse} />;
          default:
            return (
              <DefaultQuestionAndResponseComponent handleResponse={handleResponse} currentQuestion={currentQuestion} />
            );
        }
      })()}
    </Box>
  )
}

export default QuestionsAndResponseComponent;
