import React, {  } from 'react';
import { Box, Flex, Text } from '@sparrowengg/twigs-react';
import {
  UnorderedListIcon 
} from '@sparrowengg/twigs-react-icons';
import { Template } from '../../utils/models/TemplateModel';
import { TEMPLATE_HEADER_TYPES } from '../../utils/constants';
import { HeaderImage, HeaderText } from './MessageHeader';
import { BodyText, FooterText, TimeComponent } from './MessageBody';
import ActionButtonIcon from './MessageButtons';
import WhatsappMessageBubbleSVG from '../../../../assets/WhatsappMessageBubbleSVG';

const Message = ({
  message, hasBubble = true, openBottomModal, config = {}, onClick = () => {}, messageIndex
}) => {
  if (!message) return null;
  return (
    <Flex
      flexDirection="column"
      css={{
        width: '170px',
        position: 'relative',
        borderRadius: '$md !important', flexShrink: '0',
        backgroundColor: '$white900',
        fontSize: '12px',
        fontWeight: 'normal',
        wordBreak: 'break-word',
        lineHeight: '15.4px',
      }}
    >
      {message.loader && (
        <Flex flexDirection="column" gap="5px" css={{
          padding: '$5', div: {
            height: '10.5px', width: '100%', borderRadius: '$2xl', backgroundColor: '#F2F5F8' 
          } 
        }}>
          <Box css={{ width: '95% !important' }} />
          <Box css={{ width: '90% !important' }} />
          <Box/>
          <Box/>
          <Box/>
          <Box css={{ width: '80% !important' }} />
          <Box/>
        </Flex>)
      }
      {message.header?.type === Template.HEADER_TYPE.MEDIA &&
        message.header?.mediaType === TEMPLATE_HEADER_TYPES.IMAGE && (
          <HeaderImage mediaURL={message.header?.mediaURL} />
      )}
      <Flex flexDirection="column" css={{
        flex: '1',
        margin: '8px', ...(message.header?.type === Template.HEADER_TYPE.MEDIA &&
          message.header?.mediaType === TEMPLATE_HEADER_TYPES.IMAGE && { marginTop: '2px' })
      }}>

        {/* Header */}
        {message.header?.type === TEMPLATE_HEADER_TYPES.TEXT && !config?.header?.hideTextHeader && (<HeaderText headerText={message.header?.text} />)}

        {/* Body */}
        {message.body && <BodyText body={message.body} />}

        {/* Footer */}
        {message.footer && <FooterText footer={message.footer} />}

        {/* Time */}
        <Box css={{ flex: '1' }} />
        <TimeComponent />
      </Flex>

      {/* Buttons */}
      {message.buttons?.length <= 3 && message.buttons?.map((button, index) => (
        <ButtonComponent key={index} button={button} onClick={() => onClick(button, message, messageIndex)}/>
      ))}

      {message.buttons?.length > 3 && (
        <>
          <ButtonComponent button={message.buttons?.[0]} onClick={() => onClick(message.buttons?.[0], message, messageIndex)}/>
          <ButtonComponent button={message.buttons?.[1]} onClick={() => onClick(message.buttons?.[1], message, messageIndex)}/>
          <Flex onClick={() => openBottomModal(message, messageIndex)} gap="$2" justifyContent="center" alignItems="center" css={{
            cursor: 'pointer', height: '24px', width: '100%', textAlign: 'center', alignContent: 'center', borderTop: '1px solid $neutral100',
          }}>
            <UnorderedListIcon size="10" color="#3E90FD" />
            <Text css={{ marginBottom: '0', color: '#3E90FD', fontSize: '10px' }} weight="medium">Select</Text>
          </Flex>
        </>
      )}

      {/* bubble */}
      {hasBubble && <Box
        css={{ position: 'absolute', left: '-5px', bottom: '-2px' }}
      >
        <WhatsappMessageBubbleSVG />
      </Box>}
    </Flex>
  );
};

export default Message;

const ButtonComponent = ({ button, onClick = () => {} }) => {
  const buttonURL = button?.type === Template.BUTTON_TYPE.URL ? button?.url : '';
  const content = <Flex gap="$2" justifyContent="center" alignItems="start" css={{
    cursor: 'pointer', minHeight: '24px', width: '100%', textAlign: 'start', alignContent: 'center', borderTop: '1px solid $neutral100',
    padding: '5px',
    svg: {
      flexShrink: 0,
      height: '13px',
    }
  }} tabIndex={0} onClick={onClick}>
    <ActionButtonIcon type={button?.type} />
    <Text css={{
      marginBottom: '0', color: '#3E90FD', fontSize: '10px', lineHeight: '11.72px', 
    }} weight="medium">{button.label}</Text>
  </Flex>;
  return buttonURL ? <a href={buttonURL} target="_blank" rel="noreferrer"> {content} </a> : content;
};
