import { Flex, Text } from '@sparrowengg/twigs-react';
import { useSelector } from 'react-redux';

const ShortcutKey = ({ children, css }) => {
  const theme = useSelector((state) => state.survey.theme);

  return (
    <Flex css={{ backgroundColor: `${theme?.primaryColor}`, borderRadius: '$round', height: '24px', width: '24px', ...css }} alignItems="center" justifyContent="center">
      <Text weight="bold" size="sm" className="dm-mono" css={{ color: theme?.secondaryColor, lineHeight: '1' }}>
        {children}
      </Text>
    </Flex>
  )
}

export default ShortcutKey;