import React, { memo } from 'react';
import moment from 'moment';
import { Box, Flex, Text } from '@sparrowengg/twigs-react';
import WhatsAppShareBackSVG from '../../../assets/WhatsAppShareBackSVG';
import DefaultProfileWhatsappSVG from '../../../assets/DefaultProfileWhatsappSVG';
import SSWhatsappShareDPSVG from '../../../assets/SSWhatsappShareDPSVG';
import WhatsAppVerifiedTickSVG from '../../../assets/WhatsAppVerifiedTickSVG';
import NetworkSVG from '../../../assets/NetworkSVG';
import WifiSVG from '../../../assets/WifiSVG';
import BatterySVG from '../../../assets/BatterySVG';
import InfoCircleFilledSVG from '../../../assets/InfoCircleFilledSVG';

export const NavBar = ({ businessName, businessProfilePhoto }) => {
  const [imageLoaded, setImageLoaded] = React.useState(false);
  const handleImageLoad = () => {
    setImageLoaded(true);
  };
  const handleImageError = () => {
    setImageLoaded(false);
  };

  return (
    <Flex css={{ overflow: 'hidden', padding: '5px 12px' }} alignItems="center">
      <Flex css={{ overflow: 'hidden', marginRight: '$2' }} alignItems="center">
        <Box css={{ minWidth: '11px', lineHeight: '0' }}>
          <WhatsAppShareBackSVG />
        </Box>
        {!businessProfilePhoto || !imageLoaded ? (
          (!businessProfilePhoto && businessName) ? (
            <Box css={{ lineHeight: '0', minWidth: '$5', marginLeft: '$6' }}>
              <DefaultProfileWhatsappSVG />
            </Box>
          ) : (
            <Box css={{ lineHeight: '0', minWidth: '$5', marginLeft: '$6' }}>
              <SSWhatsappShareDPSVG />
            </Box>
          )
        ) : (
          <Box
            css={{
              backgroundImage: `url(${businessProfilePhoto})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              height: '$5',
              width: '$5',
              minWidth: '$5',
              borderRadius: '$round',
              marginLeft: '$6',
            }}
          />
        )}
        <img
          src={businessProfilePhoto}
          alt="Profile"
          onLoad={handleImageLoad}
          onError={handleImageError}
          style={{ display: 'none' }}
        />
        <Text css={{
          fontSize: '12px', color: '$black900', marginBottom: '0', marginLeft: '$3', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap'
        }} weight="medium">
          {businessName || 'SurveySparrow'}
        </Text>
      </Flex>
      <Box css={{ minWidth: '$3', lineHeight: '0' }}>
        <WhatsAppVerifiedTickSVG />
      </Box>
    </Flex>
  );
};


export const StatusBar = memo(() => {
  return (
    <Flex
      alignItems="center"
      justifyContent="space-between"
      css={{ width: '100%', padding: '0.5em 0.6em' }}
    >
      <Text css={{
        marginBottom: '0', color: '#100e0e', fontSize: '10px', marginLeft: '$3', lineHeight: '10px'
      }} weight="bold">
        {moment().format('h:mm')}
      </Text>
      <Flex alignItems="center" gap="$2">
        <Box css={{ width: '13px', lineHeight: '0', svg: { width: '100%' } }}>
          <NetworkSVG />
        </Box>
        <Box css={{ width: '11px', lineHeight: '0', svg: { width: '100%' } }}>
          <WifiSVG />
        </Box>
        <Box css={{ width: '16px', lineHeight: '0', svg: { width: '100%' } }}>
          <BatterySVG />
        </Box>
      </Flex>
    </Flex>
  );
});

StatusBar.displayName = 'StatusBar';


export const BusinessInfo = memo(() => {
  return (
    <Box css={{
      marginBottom: '$6',
      borderRadius: '5px',
      background: '#CDF4EF',
      boxShadow: '0px 1px 2px 0px rgba(0, 0, 0, 0.1)',
      position: 'relative',
    }}>
      <Text css={{
        display: 'inline-flex',
        padding: '4px 8px',
        alignItems: 'flex-start',
        textAlign: 'center',
        color: '$neutral900', fontSize: '10px', marginBottom: '0', lineHeight: '11.72px' 
      }}>
        <span>
          <InfoCircleFilledSVG size={12} color="#100E0E" />
        </span>
        This business works with other companies to manage this chat. Tap to learn more.
      </Text>
    </Box>
  );
});

BusinessInfo.displayName = 'BusinessInfo';

export const TodayPill = memo(() => {
  return (
    <Flex css={{ justifyContent: 'center', marginBottom: '$6' }}>
      <Box css={{
        borderRadius: '$pill',
        background: '#F5F5F2',
        boxShadow: '0px 2px 8px 0px rgba(0, 0, 0, 0.1)',
        display: 'inline-flex',
        height: '16px',
        padding: '8px 8px',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <Text css={{ color: '$black900', fontSize: '8px', marginBottom: '0' }} weight="medium">
          Today
        </Text>
      </Box>
    </Flex>
  );
});

TodayPill.displayName = 'TodayPill';