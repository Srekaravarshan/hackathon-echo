import { useSelector } from 'react-redux';
import TextTypewriter from '../components/TextTypewriter';

const QuestionComponent = ({ currentQuestion, setAnimationComplete, animationComplete }) => {
  const { typing } = useSelector((state) => state.survey);

  return (
    <TextTypewriter
      text={currentQuestion.question}
      makeDim={typing}
      hideCursor={currentQuestion.question === animationComplete}
      onAnimationComplete={() => setAnimationComplete(currentQuestion.question)}
      className="question-component-typewriter"
    />
  )
}

export default QuestionComponent;