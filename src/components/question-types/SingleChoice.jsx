import { useState, useEffect } from 'react';
import { Flex } from '@sparrowengg/twigs-react';
import { useSelector } from 'react-redux';
import { OptionsContainer, Option } from '../StyledComponents';
import SubmitButton from '../buttons/SubmitButton';
import ShortcutKey from '../buttons/ShortcutKey';
import { AlphaNumMapping, NumAlphaMapping } from './constants';

const SingleChoice = ({ choices = [], onAnswer }) => {
  const [selected, setSelected] = useState(null);

  const { theme } = useSelector((state) => state.survey);

  const handleSelect = (option) => {
    setSelected(option === selected ? null : option);
  };

  const handleSubmit = () => {
    if (selected) {
      onAnswer(selected);
    }
  };

  useEffect(() => {
    const handleKeyPress = (e) => {
      const num = AlphaNumMapping[e.key.toLowerCase()];
      if (num >= 1 && num <= choices.length) {
        const option = choices[num - 1];
        setSelected(option === selected ? null : option);
      }
      if (e.key.toLowerCase() === 'enter') {
        if (selected) {
          onAnswer(selected);
        }
      }
    };

    window.addEventListener('keypress', handleKeyPress);
    
    return () => {
      window.removeEventListener('keypress', handleKeyPress);
    };
  }, [choices, selected, onAnswer]);

  return (
    <OptionsContainer>
      <Flex gap="$4" css={{ flexWrap: 'wrap' }}>
        {choices.map((option, index) => (
          <Option
            key={index}
            selected={selected === option}
            onClick={() => handleSelect(option)}
            whileTap={{ scale: 0.95 }}
            style={{ color: selected === option ? theme?.secondaryColor : theme?.primaryColor }}
            primaryColor={theme?.primaryColor}
          >
            {option}
            <ShortcutKey css={{ marginLeft: '$4', textTransform: 'uppercase' }}>{NumAlphaMapping[index + 1]}</ShortcutKey>
          </Option>
        ))}
      </Flex>
      <SubmitButton css={{ height: 'auto' }} disabled={!selected} handleSubmit={handleSubmit} />
    </OptionsContainer>
  );
};

export default SingleChoice;