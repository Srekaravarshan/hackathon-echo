import { Fragment, useState } from "react";
import QuestionComponent from "../QuestionComponent";
import ResponseComponent from "../ResponseQuestion";
import { useSelector } from "react-redux";

const DefaultQuestionAndResponseComponent = ({ currentQuestion, handleResponse }) => {
  const [animationComplete, setAnimationComplete] = useState(false);
  // const { currentQuestion } = useSelector((state) => state.survey);
  
  return (
    <Fragment>
      <QuestionComponent
        currentQuestion={currentQuestion}
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
