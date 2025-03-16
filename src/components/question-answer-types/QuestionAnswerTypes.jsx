import { Text } from '@sparrowengg/twigs-react';
import OpinionScaleButton from '../buttons/OpinionScaleButton';

const QuestionAnswerTypes = ({ answer = {} }) => {
  console.log(answer);

  switch (answer.question?.type) {
    case 'opinionScale':
      console.log(answer.answer);
      return (
        <OpinionScaleButton selected size="md" css={{ width: '$8', marginLeft: 'auto' }}>
          {answer.answer}
        </OpinionScaleButton>
      );
    // case 'number':
    //   return <Number>{answer.answer}</Number>;
    default:
      return <Text>{typeof answer?.answer === 'string' ? answer?.answer : null}</Text>;
  }
}

export default QuestionAnswerTypes;