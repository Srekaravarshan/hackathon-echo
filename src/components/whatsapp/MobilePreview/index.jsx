import React, { memo } from 'react';
import { Box, Flex } from '@sparrowengg/twigs-react';
import BottomModal from './BottomModal';
import BottomBar from './BottomBar';
import {
  NavBar, StatusBar, BusinessInfo, TodayPill 
} from './TopBar';
import Message from './Message';
import { BodyText, TimeComponent } from './Message/MessageBody';
import { DoubleTick } from '../../../assets/DoubleTick';

const MobilePreview = ({
  css = {}, messages = [], config = {}, hasBottomBar, navbarProps = {}, handleButtonClick = () => {}, onEnterMessage = () => {}, messageScreenRef = null
}) => {
  const [openModal, setOpenModal] = React.useState({ open: false, message: null, index: null });

  const openBottomModal = (message, index) => {
    setOpenModal({ open: true, message, index });
  };
  const closeBottomModal = () => {
    setOpenModal(() => {
      return { open: false, message: null, index: null };
    });
  };

  return (
    <Box
      css={{
        '& *': {
          fontFamily: '-apple-system, system-ui, BlinkMacSystemFont, Helvetica, sans-serif !important',
        },
        ...css
      }}
    >
      <Box
        css={{
          backgroundImage: 'url("https://static.surveysparrow.com/application/images/share/Sms-share-mobile.png")',
          backgroundPosition: 'top center',
          backgroundSize: 'contain',
          zIndex: '2',
          width: '257.845px',
          height: '521px',
          backgroundRepeat: 'no-repeat',
          borderRadius: '40px',
          margin: '0', display: 'flex', flexDirection: 'column', padding: '$6 15px 9px', position: 'relative', overflow: 'hidden', 
          minWidth: '257.845px'
        }}
      >
        <Box css={{
          position: 'absolute',
          top: '0',
          bottom: '0',
          left: '0',
          right: '0',
          border: '11px solid black',
          margin: '3px $2 0px $2',
          borderRadius: '38px',
          zIndex: '99',
          pointerEvents: 'none',
        }} />
        <StatusBar />
        <NavBar businessName={navbarProps?.businessName} businessProfilePhoto={navbarProps?.businessProfilePhoto} />
        <Box css={{
          overflow: 'hidden',
          height: '437px',
          borderBottomRightRadius: '27px',
          borderBottomLeftRadius: '27px',
          background: 'url("https://static.surveysparrow.com/application/core/39cfbc81276720ddf5003854e42c2769.svg") center/cover no-repeat',
          overflowY: 'scroll',
          width: '100%', marginLeft: '0', flex: '1', borderRadius: '0 !important',
          padding: '$6',
        }} ref={messageScreenRef}>
          <TodayPill />
          <BusinessInfo />
          <RenderBody messages={messages} openBottomModal={openBottomModal} config={config} onClick={handleButtonClick} />
        </Box>
        {hasBottomBar && <BottomBar onEnterMessage={onEnterMessage} />}
        <BottomModal openModal={openModal} closeBottomModal={closeBottomModal} onClick={handleButtonClick} />
      </Box>
    </Box>
  );
};

export default MobilePreview;

const RenderBody = memo(({ messages, openBottomModal, config = {}, onClick = () => {} }) => {
  return <Flex flexDirection="column" gap="$2">
    {messages.map((message, index) => {
      if (!message) return null;
      if (message?.user) {
        return (
          <Box key={message?.id}>
            <UserMessage message={{ body: message?.body }} />
          </Box>
        )
      }
      return (
        <Box key={message?.id}>
          <Message message={message} messageIndex={index} openBottomModal={openBottomModal} hasBubble={message.templateType !== 'CAROUSEL'} config={config} onClick={onClick}/>
          {message?.templateType === 'CAROUSEL' && message?.carousel?.cards?.length && <Box css={{ height: '$1' }} />}
          {message?.templateType === 'CAROUSEL' && <Flex gap="$2" alignItems="stretch" css={{
            overflowX: 'scroll', margin: '0 -12px', padding: '0 12px', overflowY: 'hidden'
          }}>
            {message?.carousel?.cards?.map((carouselMessage, index) => {
              return <Message key={carouselMessage.id} message={carouselMessage} messageIndex={index} openBottomModal={openBottomModal} hasBubble={index === 0} config={config} onClick={onClick}/>;
            })}
          </Flex>}
          {message?.carousel?.cards?.length > 0 && <Box css={{ height: '5px' }} />}
        </Box>
      );
    })}
  </Flex>;
});

RenderBody.displayName = 'RenderBody';

const UserMessage = ({ message }) => {
  return (
    <Flex
      flexDirection="column"
      css={{
        maxWidth: '170px',
        width: 'fit-content',
        position: 'relative',
        borderRadius: '$md !important', flexShrink: '0',
        backgroundColor: '#d8fdd2',
        fontSize: '12px',
        fontWeight: 'normal',
        wordBreak: 'break-word',
        lineHeight: '15.4px',
        marginLeft: 'auto',
        color: '#051709',
        '&::after': {
          content: ' ',
          height: '9px',
          width: '9px',
          position: 'absolute',
          top: '0',
          left: 'calc(100% - 5px)',
          clipPath: 'polygon(0 0, 0 100%, 100% 0)',
          backgroundColor: '#d8fdd2'
        }
      }}
    >
      <Flex flexDirection="row" css={{
        flex: '1',
        margin: '6px',
        flexWrap: 'wrap',
      }} justifyContent="end">


        {/* Body */}
        {message.body && <BodyText body={message.body} css={{
          marginBottom: '0'
        }} />}

        {/* Time */}
        <Box css={{ flex: '1' }} />
        <Flex gap="$2" css={{ marginTop: '$1', marginRight: '-$1', marginBottom: '-$1', marginLeft: '$3' }} alignItems="center">
          <TimeComponent css={{ marginTop: '0', marginRight: '0', marginBottom: '0', marginLeft: '0' }} />
          <DoubleTick color="#53bdeb" size={12} />
        </Flex>
      </Flex>
    </Flex>
  )
}