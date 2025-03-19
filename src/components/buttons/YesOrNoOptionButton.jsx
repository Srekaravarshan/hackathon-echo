import { Button as TwigsButton, Flex, Text } from '@sparrowengg/twigs-react';
import { useSelector } from 'react-redux';
import ShortcutKey from './ShortcutKey';

const YesOrNoOptionButton = ({ onClick, icon, label, shortCutKey, selected }) => {
  const theme = useSelector((state) => state.survey.theme);

  return (
    <TwigsButton
      color="default"
      onClick={onClick}
      css={{
        height: 'auto',
        maxWidth: '100px',
        width: '100%',
        padding: '$8 $6 $6 $6',
        '.twigs-button__content': {
          flexDirection: 'column',
          width: '100%',
        },
        // padding: 1rem 2rem;
        border: `2px solid ${theme?.primaryColor}`,
        borderRadius: '8px',
        backgroundColor: selected ? `${theme?.primaryColor}e6` : 'transparent',
        color: selected ? theme?.secondaryColor : theme?.primaryColor,
        fontSize: '1rem',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        
        '&:hover, &:focus, &:active, &:focus-visible': {
          backgroundColor: selected ? `${theme?.primaryColor} !important` : `${theme?.primaryColor}1a`,
          color: selected ? `${theme?.secondaryColor} !important` : `${theme?.primaryColor} !important`,
        },
      }}
    >
      {icon}
      <Flex alignItems="center" justifyContent="space-between" css={{ marginTop: '$4', width: '100%' }}>
        <Text weight="medium" size="md">
          {label}
        </Text>
        <ShortcutKey>{shortCutKey}</ShortcutKey>
      </Flex>
    </TwigsButton>
  )
}

export default YesOrNoOptionButton;