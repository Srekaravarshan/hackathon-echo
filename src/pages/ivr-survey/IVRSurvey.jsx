import { Box, Flex, Text, Input, ThemeProvider, Button } from '@sparrowengg/twigs-react';
import { PhoneIcon } from '@sparrowengg/twigs-react-icons';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import Axios from 'axios';

const IVRSurvey = () => {
  return (
    <ThemeProvider>
      <Flex flexDirection="column" css={{ height: '100vh', width: '100vw', backgroundColor: '#f2f5f8' }} alignItems="center" justifyContent="center" className="dm-sans">
        <Flex
          flexDirection="column"
          // css={{ height: '85vh', width: '350px' }}
          alignItems="end"
          gap="$4"
        >
          <IVRPreview css={{ marginBottom: '86px' }} />
        </Flex>
      </Flex>
    </ThemeProvider>
  );
};

export default IVRSurvey;

export const IVRPreview = ({ css }) => {
  const [phoneNumber, setPhoneNumber] = useState('')
  const { triggerToken } = useParams();
  const handleIVRCall = () => {
    console.log('handleIVRCall', triggerToken)
    Axios.post(`http://localhost:3000/api/v1/ivr`, {
      phoneNumber,
      triggerToken,
    })
  }
  return (
    <Box css={{ position: 'relative', ...css }}>
      <Box as="img" css={{ aspectRatio: '245/496', maxHeight: '521px' }} src="https://static.surveysparrow.com/application/production/1742442116170__6988144c212b9aa3c4dee45fa1d4a049b9a6d4ae6e76d581a56408257aea__phone.png" />
      <Text css={{ marginBottom: '0', width: '100%', textAlign: 'center', color: '$white900', position: 'absolute', top: '15%', left: '50%', transform: 'translateX(-50%)' }} size="lg" weight="bold">
        +91 99407 60543
      </Text>
      <Flex css={{
        position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: '$white900', borderRadius: '16px', padding: '24px',
        boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px'
      }} flexDirection="column" gap="$6">
        <Text size="xs" weight="medium" css={{ color: '$neutral900', marginBottom: '0', width: '250px' }}>
          Type your Mobile number to receive a call from the Survey Agent
        </Text>  
        <Input size="lg" placeholder="+XXXXXXXXXXXX" value={phoneNumber} leftIcon={<PhoneIcon />} onChange={(e) => setPhoneNumber(e.target.value)} />
        <Button size="lg" variant="primary" disabled={!phoneNumber.length} 
          onClick={handleIVRCall}
        >Call Now</Button>
      </Flex>
    </Box>
  );
};