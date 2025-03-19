import React, { memo, useMemo } from 'react';
import { Box, Text } from '@sparrowengg/twigs-react';
import { TwigsImageFilledSVG } from '../../../../assets/icons';


export const HeaderImage = memo(({ mediaURL }) => {

  const isValidURL = useMemo(() => {
    if (!mediaURL) return false; // Check for null or undefined
    try {
      new URL(mediaURL);
      return true;
    } catch (e) {
      return false;
    }
  }, [mediaURL]);

  if (mediaURL && isValidURL) {
    return (<img src={mediaURL} alt="header" />);
  }

  return <Box css={{
    lineHeight: '0', height: '110px', textAlign: 'center', alignContent: 'center', backgroundColor: '$neutral100', borderRadius: '4px', margin: '2px', position: 'relative',
  }}>
    <TwigsImageFilledSVG color="#E2E2E2" size="24" />
    {mediaURL && !isValidURL && <Text css={{
      color: '$neutral800', marginBottom: '0', position: 'absolute', bottom: '20%', left: '50%', transform: 'translateX(-50%)', lineHeight: '1.2', width: '100%' 
    }} size="xs">Image cant be displayed</Text>}
  </Box>;
});

HeaderImage.displayName = 'HeaderImage';

export const HeaderText = memo(({ headerText }) => {
  return <Text
    css={{
      marginBottom: '0',
      color: '$neutral900',
      fontSize: '12px',
      lineHeight: '14px',
    }}
    weight="medium"
  >
    {headerText}
  </Text>;
});

HeaderText.displayName = 'HeaderText';