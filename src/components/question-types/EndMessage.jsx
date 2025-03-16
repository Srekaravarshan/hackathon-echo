import { useEffect } from 'react';
import { Flex, Text } from '@sparrowengg/twigs-react';
import { EnterIcon } from '@sparrowengg/twigs-react-icons';
import { useSelector } from 'react-redux';
import { OptionsContainer } from '../StyledComponents';
import Button from '../buttons/Button';
import ShortcutKey from '../buttons/ShortcutKey';

const EndMessage = ({ onAnswer }) => {

  const theme = useSelector((state) => state.survey.theme);

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'Enter') {
        onAnswer(e.target.value);
      }
      if (e.key === 'X') {
        window.location.href = "https://surveysparrow.com";
      }
    };

    window.addEventListener('keypress', handleKeyPress);

    return () => {
      window.removeEventListener('keypress', handleKeyPress);
    };
  }, [onAnswer]);

  return (
    <OptionsContainer>
      <Flex gap="$4">
        <Button onClick={onAnswer} css={{
          position: 'unset',
          height: 'auto',
        }}>
          <Text css={{ fontSize: 'inherit', fontWeight: 'inherit', color: 'inherit' }}>Keep Chatting...&nbsp;</Text>
          {/* Submit */}
          <ShortcutKey css={{
            textTransform: 'uppercase', height: 'auto', width: 'auto',
            'p': { lineHeight: '0' },
            'svg path': { strokeWidth: '2px' },
          }}
          ><EnterIcon size="20"/></ShortcutKey>
        </Button>
        <Button onClick={() => {
          window.location.href = "https://surveysparrow.com";
        }} css={{
          position: 'unset',
          height: 'auto',
          backgroundColor: 'transparent !important',
          color: `${theme?.primaryColor} !important`,
        }}>
          <Text css={{ fontSize: 'inherit', fontWeight: 'inherit', color: 'inherit' }}>End Survey&nbsp;</Text>
          {/* Submit */}
          <ShortcutKey css={{
            textTransform: 'uppercase',
            // height: 'auto', width: 'auto',
            backgroundColor: `${theme?.secondaryColor} !important`,
            'p': {
              lineHeight: '0',
            color: `${theme?.primaryColor} !important`,
            },
            // 'svg path': { strokeWidth: '2px' },
          }}
          >X</ShortcutKey>
        </Button>
      </Flex>
    </OptionsContainer>
  );
};

export default EndMessage;