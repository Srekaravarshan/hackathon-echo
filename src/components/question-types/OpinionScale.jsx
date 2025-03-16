import { useState, useEffect } from 'react';
import { Flex } from '@sparrowengg/twigs-react';
import OpinionScaleButton from '../buttons/OpinionScaleButton';

const OpinionScale = ({ onAnswer, currentQuestion }) => {
  const [selected, setSelected] = useState(null);

  const { min = 1, max = 5 } = currentQuestion.scale ?? { min: 1, max: 5 };

  useEffect(() => {
    const handleKeyPress = (e) => {
      const num = parseInt(e.key);
      if (!isNaN(num) && num >= 1 && num <= 5) {
        setSelected(num);
        setTimeout(() => {
          onAnswer(selected);
        }, 300);
      }
      if (e.key === 'Enter' && selected) {
        onAnswer(selected);
      }
    };

    window.addEventListener('keypress', handleKeyPress);
    
    return () => {
      window.removeEventListener('keypress', handleKeyPress);
    };
  }, [selected, onAnswer]);
  return (
    <Flex gap="$4" css={{ flexWrap: 'wrap' }}>
      {Array.from({ length: max - min + 1 }, (_, i) => (
        <OpinionScaleButton
          key={i}
          selected={selected === min + i}
          onClick={() => {
            setSelected(min + i);
            setTimeout(() => {
              onAnswer(min + i);
            }, 300);
          }}
        >
          {min + i}
        </OpinionScaleButton>
      ))}
    </Flex>
  )
};

export default OpinionScale;