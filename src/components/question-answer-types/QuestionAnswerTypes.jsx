import { Text } from '@sparrowengg/twigs-react';
import { useSelector } from 'react-redux';

const QuestionAnswerTypes = ({ answer = {} }) => {
  const { theme } = useSelector((state) => state.survey);

  switch (answer.question?.type) {
    // case 'opinionScale':
    //   return (
    //     <OpinionScaleButton selected size="md" css={{ width: '$8', marginLeft: 'auto' }}>
    //       {answer.answer}
    //     </OpinionScaleButton>
    //   );
    // case 'number':
    //   return <Number>{answer.answer}</Number>;
    default:
      if (typeof answer?.answer !== 'string' && typeof answer?.answer !== 'number') return null;
      return <Text css={{ width: 'fit-content', marginLeft: 'auto', padding: '$4', backgroundColor: `${theme?.actionColor}4d`, borderRadius: '0.5rem 0 0.5rem 0.5rem' }}>{answer?.answer}</Text>;
  }
}

export default QuestionAnswerTypes;