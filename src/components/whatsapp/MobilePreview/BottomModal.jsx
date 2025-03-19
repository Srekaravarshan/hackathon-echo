import React, { Fragment } from 'react';
import { Box, Flex, Text } from '@sparrowengg/twigs-react';
import { CloseIcon } from '@sparrowengg/twigs-react-icons';
import ActionButtonIcon from './Message/MessageButtons';
import { Template } from '../utils/models/TemplateModel';

const BottomModal = ({ openModal, closeBottomModal, onClick = () => {} }) => {
  return <Fragment>
    <Box css={{
      zIndex: '10', borderRadius: '25px', backgroundColor: '$black500', position: 'absolute', left: '0', right: '0', top: '0', bottom: '0', margin: '0 15px 0.7em 15px',
      opacity: '0',
      pointerEvents: 'none',
      transition: 'opacity 0.3s',
      ...(openModal.open && { opacity: '1', pointerEvents: 'all' }),
    }} onClick={() => closeBottomModal()}/>
    <Flex flexDirection="column" css={{
      backgroundColor: 'white', borderRadius: '8px 8px 25px 25px', zIndex: '20', position: 'absolute', bottom: '0', left: '0', right: '0', margin: '0 15px 0.7em 15px', minHeight: '10%', maxHeight: '90%', overflow: 'hidden',
      transform: 'translateY(100%)',
      transition: 'transform 0.3s ease-in-out',
      ...(openModal.open && { transform: 'translateY(0%)' })
    }}>
      <Flex css={{ padding: '$4' }} justifyContent="space-between" alignItems="center">
        <Box />
        <Text css={{ color: '#040404', fontSize: '10px', marginBottom: '0' }} weight="bold">Select</Text>
        <Box onClick={() => closeBottomModal()} css={{
          cursor: 'pointer', backgroundColor: '#EDEDED', borderRadius: '50%', height: '$4', width: '$4', lineHeight: '0', alignContent: 'center', textAlign: 'center', svg: { path: { strokeWidth: '2.5' } }
        }}>
          <CloseIcon size="16" color="#838385" />
        </Box>
      </Flex>
      <Box css={{
        height: '30px', marginLeft: '$5', alignContent: 'end', borderBottom: '1px solid #E9E9E9'
      }}>
        <Text css={{ color: '#6A6A6A', fontSize: '8px', marginBottom: '5px' }} weight="bold">Select the below choices</Text>
      </Box>
      <Box css={{ overflowY: 'scroll', flex: '1' }}>

        {/* Buttons */}
        {openModal?.message?.buttons?.map((button, index) => {
          const buttonURL = button?.type === Template.BUTTON_TYPE.URL ? button?.url : '';

          const content = <Flex key={index} onClick={() => {
            onClick(button);
            return closeBottomModal();
          }} css={{
            height: '42px', marginLeft: '$6', alignContent: 'center', borderBottom: '1px solid #E9E9E9', cursor: 'pointer', '&:hover': { backgroundColor: '#100E0E0A' }, gap: '$4'
          }} alignItems="center" tabIndex={0}>
            <ActionButtonIcon type={button.type} />
            <Text css={{ color: '#6A6A6A', fontSize: '10px', marginBottom: '0' }} weight="bold">{button.label}</Text>
          </Flex>;

          return buttonURL ? <a href={buttonURL} target="_blank" rel="noreferrer"> {content} </a> : content;
        })}
        
      </Box>
      <Box css={{ height: '$10', textAlign: 'center', alignContent: 'end' }}>
        <Text css={{ fontSize: '$xxs', color: '#7D7D7D', marginBottom: '$4' }}>Tap an item to select</Text>
      </Box>
      <Box css={{
        width: '33%', height: '3px', backgroundColor: 'black', margin: '$9 auto $2 auto', borderRadius: '5px'
      }} />
    </Flex>
  </Fragment>;
};

export default BottomModal;