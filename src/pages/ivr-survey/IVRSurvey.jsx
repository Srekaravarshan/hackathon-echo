import { Box, Flex, Text, Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogBody, DialogFooter, DialogClose, Button, IconButton, FormLabel, Input, ThemeProvider } from '@sparrowengg/twigs-react';
import { PhoneIcon } from '@sparrowengg/twigs-react-icons';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

const IVRSurvey = () => {
  const { triggerToken } = useParams();
  console.log('IVRSurvey', triggerToken)
  return (
    <ThemeProvider>
      <Flex flexDirection="column" css={{ height: '100vh', width: '100vw', backgroundColor: '#f2f5f8' }} alignItems="center" justifyContent="center" className="dm-sans">
        <Flex
          flexDirection="column"
          // css={{ height: '85vh', width: '350px' }}
          alignItems="end"
          gap="$4"
        >
          <IVRPreview />
        </Flex>
      </Flex>
    </ThemeProvider>
  );
};

export default IVRSurvey;


const IVRPreview = () => {
  const [phoneNumber, setPhoneNumber] = useState('')
  return (
    <Box css={{ position: 'relative' }}>
      <Box as="img" css={{ aspectRatio: '245/496', maxHeight: '521px', marginBottom: '86px' }} src="https://static.surveysparrow.com/application/production/1742442116170__6988144c212b9aa3c4dee45fa1d4a049b9a6d4ae6e76d581a56408257aea__phone.png" />
      <Text css={{ marginBottom: '0', width: '100%', textAlign: 'center', color: '$white900', position: 'absolute', top: '15%', left: '50%', transform: 'translateX(-50%)' }} size="lg" weight="bold">
        +91 99407 60543
      </Text>
      <Flex css={{
        position: 'absolute', top: '40%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: '$white900', borderRadius: '16px', padding: '24px',
        boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px'
      }} flexDirection="column" gap="$6">
        <Text size="xs" weight="medium" css={{ color: '$neutral900', marginBottom: '0', width: '250px' }}>
          Type your Mobile number to receive a call from the Survey Agent
        </Text>  
        <Input size="lg" placeholder="+XXXXXXXXXXXX" value={phoneNumber} leftIcon={<PhoneIcon />} onChange={(e) => setPhoneNumber(e.target.value)} />
        <Button size="lg" variant="primary" disabled={!phoneNumber.length}>Call Now</Button>
      </Flex>
    </Box>
  );
};