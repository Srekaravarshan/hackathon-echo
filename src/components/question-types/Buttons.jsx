import { useEffect } from "react";
import { OptionsContainer } from "../StyledComponents";
import ShortcutKey from "../buttons/ShortcutKey";
import { EnterIcon } from "@sparrowengg/twigs-react-icons";
import Button from "../buttons/Button";
import { Text } from "@sparrowengg/twigs-react";


const Buttons = ({ currentQuestion, onAnswer }) => {

  if (currentQuestion?.buttons?.length > 0) {
    return (
      <OptionsContainer className="buttons-options" style={{ flexDirection: 'row', gap: '0.5rem' }}>
        {currentQuestion?.buttons?.map((button, index) => (
          <ResponseButton onClick={() => onAnswer(null, button)} button={button} key={index} />
        ))}
      </OptionsContainer>
    )
  }

  return (
    <OptionsContainer className="buttons-options" style={{ flexDirection: 'row', gap: '0.5rem' }}>
      <ResponseButton onClick={() => onAnswer(null)} button={{ text: 'Let&apos;s Go' }} />
    </OptionsContainer>
  );
};

export default Buttons;

const ResponseButton = ({ onClick, button }) => {
  return (
    <Button onClick={onClick} css={{
      position: 'unset',
      // height: 'auto',
    }} className="buttons-option" size="xl">
      <Text css={{ fontSize: 'inherit', fontWeight: 'inherit', color: 'inherit' }}>{button.text}&nbsp;</Text>
    </Button>
  )
}