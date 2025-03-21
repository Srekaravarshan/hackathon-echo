import { Text, Flex, Box } from '@sparrowengg/twigs-react';
import { useSelector } from 'react-redux';

const QuestionAnswerTypes = ({ answer = {} }) => {
  const theme = useSelector((state) => state.survey.theme);

  if (answer.question?.type === 'rating' && typeof answer.answer === 'number') {
    return (
      <Flex css={{ width: 'fit-content', marginLeft: 'auto', padding: '$4', backgroundColor: `${theme?.actionColor}4d`, borderRadius: '0.5rem 0 0.5rem 0.5rem' }}>
        <Flex gap="$2">
          {Array.from({ length: answer.answer }, (_, i) => (
            <Box
              key={i}
              css={{
                color: theme?.primaryColor,
                'svg path': {
                  fill: theme?.primaryColor
                }
              }}
            >
              <svg width="16" height="16" viewBox="0 0 44 44">
                <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M21.108 2.09a.955.955 0 011.787 0l4.832 13.7h13.646a.955.955 0 01.62 1.68l-11.402 9.454 4.773 14.337a.955.955 0 01-1.47 1.07L22 33.606l-11.9 8.727a.955.955 0 01-1.464-1.071l4.773-14.337L2.004 17.47a.955.955 0 01.62-1.68h13.649l4.835-13.7z"></path>
              </svg>
            </Box>
          ))}
        </Flex>
      </Flex>
    );
  }

  switch (answer.question?.type) {
    case 'action':
      return null;
    default:
      if (typeof answer?.answer !== 'string' && typeof answer?.answer !== 'number') return null;
      return <Text css={{ width: 'fit-content', marginLeft: 'auto', padding: '$4', backgroundColor: `${theme?.actionColor}4d`, borderRadius: '0.5rem 0 0.5rem 0.5rem' }}>{answer?.answer}</Text>;
  }
}

export default QuestionAnswerTypes;