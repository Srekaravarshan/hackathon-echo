import React, { memo } from 'react';
import moment from 'moment';
import { Box, Flex, Text } from '@sparrowengg/twigs-react';
import DOMPurify from 'dompurify';

const formatNewLineToBreak = (text = '') => {
  return text?.replace?.(/\n/g, '<br>');
};

export const BodyText = memo(({ body, css }) => {
  return <Text
    css={{
      marginBottom: '$5',
      lineHeight: '14px',
      whiteSpace: 'pre-wrap',
      '& *': {
        marginBottom: '0',
      },
      color: '$neutral900',
      fontSize: '12px',
      i: { fontStyle: 'italic !important' },
      b: { fontWeight: 'bold !important' },
      s: { textDecoration: 'line-through !important' },
      tt: { fontFamily: 'monospace !important' },
      'code *': {
        fontFamily: 'monospace !important', backgroundColor: '$neutral100', padding: '0 2px', borderRadius: '2px' 
      },
      ul: {
        li: {
          listStyleType: 'disc',
          marginLeft: '$10',
        }
      },
      ol: {
        li: {
          listStyleType: 'decimal',
          marginLeft: '$10',
        }
      },
      blockquote: {
        position: 'relative',
        paddingLeft: '$5',
        color: '$black700',
        '&::before': {
          content: ' ',
          position: 'absolute',
          backgroundColor: '$black600',
          left: '0',
          width: '2px',
          height: '100%',
          borderRadius: '10px',
        }
      },
      ...css
    }}
    dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(formatNewLineToBreak(body)) }}
  >
  </Text>;
});

BodyText.displayName = 'BodyText';

export const FooterText = memo(({ footer }) => {
  return <Text
    css={{
      lineHeight: '14px',
      color: '$neutral500',
      fontSize: '10px',
      marginBottom: '0',
    }}
  >
    <Box as="span" css={{ height: '5px', display: 'block' }} />
    {footer}
  </Text>;
});

FooterText.displayName = 'FooterText';

export const TimeComponent = memo(({ css }) => {
  return (
    <Flex justifyContent="end" css={{ marginRight: '-$2', marginBottom: '-$2', marginTop: '$1', ...css }}>
      <Text
        css={{
          color: '#697680',
          marginBottom: '0',
          fontSize: '7px',
          lineHeight: '10px'
        }}
      >
        {moment().format('hh:mm A')}
      </Text>
    </Flex>
  );
});

TimeComponent.displayName = 'TimeComponent';