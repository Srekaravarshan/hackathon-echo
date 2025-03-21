import { Fragment, useState } from "react";
import QuestionComponent from "../QuestionComponent";
import ResponseComponent from "../ResponseQuestion";

const DefaultQuestionAndResponseComponent = ({ currentQuestion, handleResponse, additionalMeta }) => {
  console.log("📱 ~ DefaultQuestionAndResponseComponent ~ additionalMeta:", additionalMeta)
  const [animationComplete, setAnimationComplete] = useState(false);
  
  return (
    <Fragment key={currentQuestion.question}>
      <QuestionComponent
        currentQuestion={currentQuestion}
        setAnimationComplete={setAnimationComplete}
        animationComplete={animationComplete}
      />
      <ResponseComponent
        currentQuestion={currentQuestion} 
        handleResponse={handleResponse}
        animationComplete={animationComplete === currentQuestion.question}
        additionalMeta={additionalMeta}
      />
    </Fragment>
  );
};

export default DefaultQuestionAndResponseComponent;
