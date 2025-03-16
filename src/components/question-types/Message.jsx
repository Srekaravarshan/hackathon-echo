import { useEffect } from 'react';
import { Text } from '@sparrowengg/twigs-react';
import { EnterIcon } from '@sparrowengg/twigs-react-icons';
import { OptionsContainer } from '../StyledComponents';
import Button from '../buttons/Button';
import ShortcutKey from '../buttons/ShortcutKey';

const Message = ({ onAnswer }) => {

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'Enter') {
        onAnswer();
      }
    };

    window.addEventListener('keypress', handleKeyPress);

    return () => {
      window.removeEventListener('keypress', handleKeyPress);
    };
  }, [onAnswer]);

  return (
    <OptionsContainer>
      <Button onClick={() => onAnswer()} css={{
        position: 'unset',
        height: 'auto',
      }}>
        <Text css={{ fontSize: 'inherit', fontWeight: 'inherit', color: 'inherit' }}>Next&nbsp;</Text>
        {/* Submit */}
        <ShortcutKey css={{
          textTransform: 'uppercase', height: 'auto', width: 'auto',
          'p': { lineHeight: '0' },
          'svg path': { strokeWidth: '2px' },
        }}
        ><EnterIcon size="20"/></ShortcutKey>
      </Button>
    </OptionsContainer>
  );
};

export default Message;