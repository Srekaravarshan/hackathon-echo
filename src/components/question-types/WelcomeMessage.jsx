import { useEffect } from "react";
import { OptionsContainer } from "../StyledComponents";
import ShortcutKey from "../buttons/ShortcutKey";
import { EnterIcon } from "@sparrowengg/twigs-react-icons";
import Button from "../buttons/Button";
import { Text } from "@sparrowengg/twigs-react";


const WelcomeMessage = ({ currentQuestion, onAnswer }) => {
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

  if (currentQuestion?.buttons?.length > 0) {
    return (
      <OptionsContainer className="welcome-message-options">
        {currentQuestion?.buttons?.map((button, index) => (
          <Button size="xl" onClick={() => onAnswer(null, { action: button.action })} key={index} css={{
            position: 'unset',
            // height: 'auto',
          }} className="welcome-message-option">
            <Text css={{ fontSize: 'inherit', fontWeight: 'inherit', color: 'inherit' }}>{button.text}&nbsp;</Text>
            {/* Submit */}
            <ShortcutKey css={{
              textTransform: 'uppercase', height: 'auto', width: 'auto',
              'p': { lineHeight: '0' },
              'svg path': { strokeWidth: '2px' },
            }}
            ><EnterIcon size="20"/></ShortcutKey>
          </Button>
        ))}
      </OptionsContainer>
    )
  }

  return (
    <OptionsContainer className="welcome-message-options">
      <Button onClick={() => onAnswer(null)} css={{
        position: 'unset',
        height: 'auto',
      }} className="welcome-message-option">
        <Text css={{ fontSize: 'inherit', fontWeight: 'inherit', color: 'inherit' }}>Let&apos;s Go&nbsp;</Text>
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

export default WelcomeMessage;