import React, { memo } from 'react';
import { Box, Flex } from '@sparrowengg/twigs-react';
import { PlusIcon } from '@sparrowengg/twigs-react-icons';
import IOSCameraSVG from '../../../assets/IOSCameraSVG';
import IOSStickerSVG from '../../../assets/IOSStickerSVG';
import IOSMicSVG from '../../../assets/IOSMicSVG';

const BottomBar = memo(({ onEnterMessage = () => {} }) => {

  const onKeyDown = (e) => {
    if (e.key === 'Enter') {
      onEnterMessage(e.target.value);
      e.target.value = '';
    }
  }

  return <Box css={{
    backgroundColor: '#F6F6F6', borderTop: '1px solid rgb(222, 223, 224)', width: '100%', padding: '$3 $3 0 $3', borderBottomLeftRadius: '27px', borderBottomRightRadius: '27px',
  }}>
    <Flex alignItems="center">
      <Box css={{ margin: '-$1', display: 'block', lineHeight: '0' }}>
        <PlusIcon size="18" color="#007AFF" />
      </Box>
      <Box css={{
        position: 'relative', flex: '1', marginLeft: '$2', marginRight: '9px', 
        'input': {
          borderRadius: '20px',
          border: '1px solid #DEDFE0',
          backgroundColor: 'white',
          height: '20px',
          fontSize: '9px',
          paddingLeft: '5px',
          paddingRight: '20px',
          width: '100%',
        }
      }}>
        <input onKeyDown={onKeyDown} />
        <Box css={{
          lineHeight: '0', position: 'absolute', top: '0', alignContent: 'center', height: '100%', right: '$2' 
        }}>
          <IOSStickerSVG size="14" color="#007AFF" />
        </Box>
      </Box>
      <Box css={{
        lineHeight: '0', flexShrink: '0', width: '$3', height: '$3', marginRight: '9px',
      }}>
        <IOSCameraSVG size="14" color="#007AFF" />
      </Box>
      <Box css={{
        lineHeight: '0', flexShrink: '0', width: '$3', height: '$3', marginRight: '9px'
      }}>
        <IOSMicSVG size="14" color="#007AFF" />
      </Box>
    </Flex>
    <Box css={{
      width: '33%', height: '3px', backgroundColor: 'black', margin: '$9 auto $2 auto', borderRadius: '5px'
    }} />
  </Box>;
});

BottomBar.displayName = 'BottomBar';

export default BottomBar;
