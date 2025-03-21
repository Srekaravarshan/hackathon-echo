import { Fragment, useCallback } from "react"
import { useSelector, useDispatch } from "react-redux";
import { fetchNextQuestion } from "../../store/slices/surveySlice";
import { ButtonActions } from "../../components/question-types/constants";
import WelcomeMessageQuestionAndResponse from "./QuestionAndResponseComponents/WelcomeMessageQuestionAndResponse";
import DefaultQuestionAndResponseComponent from "./QuestionAndResponseComponents/DefaultQuestionAndResponseComponent";
import ActionQuestionAndResponse from "./QuestionAndResponseComponents/ActionQuestionAndResponse";

const QuestionsAndResponseComponent = () => {
  const dispatch = useDispatch();

  const { currentQuestion } = useSelector((state) => state.survey);
  console.log("📱 ~ QuestionsAndResponseComponent ~ currentQuestion:", currentQuestion)

  const handleResponse = useCallback(async (answer, options = {}) => {
    if (!options?.action || options?.action === ButtonActions.NEXT_QUESTION) {
      dispatch(fetchNextQuestion(answer));
    }
  }, [dispatch]);

  return (
    <Fragment>
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
    </Fragment>
  )
}

export default QuestionsAndResponseComponent;



// {
//   "type": "action",
//   "question": "I am booking demo call on coming saturday",
//   "actionType": "appointment",
//   "hasConfirmation": false,
// }