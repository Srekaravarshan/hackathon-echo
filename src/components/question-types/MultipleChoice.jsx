import { useState, useEffect } from 'react';
import { Flex } from '@sparrowengg/twigs-react';
import { useSelector } from 'react-redux';
import { OptionsContainer, Option } from '../StyledComponents';
import SubmitButton from '../buttons/SubmitButton';
import ShortcutKey from '../buttons/ShortcutKey';
import { AlphaNumMapping, NumAlphaMapping } from './constants';

const MultipleChoice = ({ choices = [], onAnswer }) => {
  const [selected, setSelected] = useState([]);

  const { theme } = useSelector((state) => state.survey);

  const handleSelect = (option) => {
    const newSelected = selected.includes(option)
      ? selected.filter(item => item !== option)
      : [...selected, option];
    setSelected(newSelected);
  };

  const handleSubmit = () => {
    if (selected.length > 0) {
      onAnswer(selected);
    }
  };

  useEffect(() => {
    const handleKeyPress = (e) => {
      const num = AlphaNumMapping[e.key.toLowerCase()];
      if (num >= 1 && num <= choices.length) {
        const newSelected = selected.includes(choices[num - 1])
          ? selected.filter(item => item !== choices[num - 1])
          : [...selected, choices[num - 1]];
        setSelected(newSelected);
      }
      if (e.key.toLowerCase() === 'enter') {
        if (selected.length > 0) {
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
            selected={selected.includes(option)}
            onClick={() => handleSelect(option)}
            whileTap={{ scale: 0.95 }}
            style={{ color: selected.includes(option) ? theme?.secondaryColor : theme?.primaryColor }}
            primaryColor={theme?.primaryColor}
          >
            {option}
            <ShortcutKey css={{ marginLeft: '$4', textTransform: 'uppercase' }}>{NumAlphaMapping[index + 1]}</ShortcutKey>
          </Option>
        ))}
      </Flex>
      <SubmitButton css={{ height: 'auto' }} disabled={selected.length === 0} handleSubmit={handleSubmit} />
    </OptionsContainer>
  );
};

export default MultipleChoice;