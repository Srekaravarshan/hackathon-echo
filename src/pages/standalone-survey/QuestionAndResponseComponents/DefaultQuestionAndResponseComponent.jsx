import { Fragment, useState } from "react";
import QuestionComponent from "../QuestionComponent";
import ResponseComponent from "../ResponseQuestion";
import { useSelector } from "react-redux";

const DefaultQuestionAndResponseComponent = ({ handleResponse }) => {
  console.log("📱 ~ DefaultQuestionAndResponseComponent ~ handleResponse:", handleResponse)
  const [animationComplete, setAnimationComplete] = useState(false);
  const { currentQuestion } = useSelector((state) => state.survey);
  
  return (
    <Fragment>
      <QuestionComponent
        setAnimationComplete={setAnimationComplete}
        animationComplete={animationComplete}
      />
      <ResponseComponent
        currentQuestion={currentQuestion} 
        handleResponse={handleResponse}
        animationComplete={animationComplete === currentQuestion.question}
      />
    </Fragment>
  );
};

export default DefaultQuestionAndResponseComponent;
