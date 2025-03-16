import { useState, useEffect } from 'react';
import { YesThumbsUpIcon, NoThumbsDownIcon } from '../../assets/icons';
import { Flex } from '@sparrowengg/twigs-react';
import { OptionsContainer } from '../StyledComponents';
import YesOrNoOptionButton from '../buttons/YesOrNoOptionButton';
import SubmitButton from '../buttons/SubmitButton';

const YesOrNo = ({ onAnswer }) => {

  const [selected, setSelected] = useState(null);

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key.toLowerCase() === 'y') {
        setSelected('Yes');
      } else if (e.key.toLowerCase() === 'n') {
        setSelected('No'); 
      }
      if (e.key === 'Enter') {
        if (selected) {
          onAnswer(selected);
        }
      }
    };

    window.addEventListener('keypress', handleKeyPress);
    
    return () => {
      window.removeEventListener('keypress', handleKeyPress);
    };
  }, [onAnswer, selected]);

  return (
    <OptionsContainer>
      <Flex gap="$8">
        <YesOrNoOptionButton selected={selected === 'Yes'} onClick={() => setSelected('Yes')} icon={<YesThumbsUpIcon size="36" />} label="Yes" shortCutKey="Y" />
        <YesOrNoOptionButton selected={selected === 'No'} onClick={() => setSelected('No')} icon={<NoThumbsDownIcon size="36" />} label="No" shortCutKey="N" />
      </Flex>
      <SubmitButton css={{ height: 'auto' }} disabled={!selected} handleSubmit={() => {
        if (selected) {
          onAnswer(selected);
        }
      }} />
    </OptionsContainer>
  );
};

export default YesOrNo;