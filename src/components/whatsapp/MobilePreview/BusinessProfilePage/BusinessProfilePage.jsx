import { Box, Flex, Text } from '@sparrowengg/twigs-react';
import React from 'react';
import { StatusBar } from '../TopBar';
import { ChevronLeftIcon, SearchIcon } from '@sparrowengg/twigs-react-icons';
import WhatsAppVerifiedTickSVG from '../../../../assets/WhatsAppVerifiedTickSVG';
import ReplyOutlineSVG from '../../../../assets/ReplyOutlineSVG';
import BusinessStoreBuildingSVG from '../../../../assets/BusinessStoreBuildingSVG';

const verticalLabelMap = {
  OTHER: 'Other',
  AUTO: 'Vehicle service',
  BEAUTY: 'Beauty, cosmetic & personal care',
  APPAREL: 'Apparel & clothing',
  EDU: 'Education',
  ENTERTAIN: 'Arts & entertainment',
  EVENT_PLAN: 'Event planner',
  FINANCE: 'Finance',
  GROCERY: 'Supermarket/convenience store',
  GOVT: 'Public and government service',
  HOTEL: 'Hotel',
  HEALTH: 'Medical & health',
  NONPROFIT: 'Non-profit organisation',
  PROF_SERVICES: 'Professional service',
  RETAIL: 'Shopping & retail',
  TRAVEL: 'Travel and transport',
  RESTAURANT: 'Restaurant',
};

const BusinessProfilePage = ({ css = {}, whatsappProfileModelObject }) => {

  const showAddress = whatsappProfileModelObject.addressLine1 ||
  whatsappProfileModelObject.addressLine2 ||
  whatsappProfileModelObject.city ||
  whatsappProfileModelObject.state ||
  whatsappProfileModelObject.pinCode ||
  whatsappProfileModelObject.country;

  // -------------------------- JSX -------------------------- //
  return (
    <Box css={{ ...css }}>
      <Box css={{
        margin: '0', display: 'flex', flexDirection: 'column', padding: '$6 15px 9px', position: 'relative', overflow: 'hidden', 
        minWidth: '257.845px', backgroundColor: '#F6F6F6'
      }}>
        <Box css={{
          position: 'absolute',
          top: '0',
          bottom: '0',
          left: '0',
          right: '0',
          border: '11px solid black',
          margin: '$2',
          borderRadius: '38px',
          zIndex: '99',
          pointerEvents: 'none',
        }} />
        <StatusBar />

        <Flex flexDirection="column" css={{ flex: '1', overflowY: 'scroll' }}>

          {/* Navbar */}
          <Flex justifyContent="space-between" css={{ padding: '$5 $10 $5 $5' }} alignItems="center">
            <ChevronLeftIcon size="24" color="#2B2B2B"/>
            <Text weight="medium" css={{ marginBottom: '0' }}>Business Info</Text>
            <Box css={{ width: '$6' }} />
          </Flex>


          {/* Profile Picture */}
          <Flex alignItems="center" justifyContent="center" css={{
            borderRadius: '$round', alignSelf: 'center', backgroundColor: '$neutral200', height: '$18', width: '$18', maxWidth: '$18', minHeight: '$18', minWidth: '$18',
            ...(whatsappProfileModelObject.profilePicture && { backgroundImage: `url(${whatsappProfileModelObject.profilePicture})`, backgroundSize: 'cover', backgroundPosition: 'center' })
          }} gap="$5">
            {!whatsappProfileModelObject.profilePicture && <BusinessStoreBuildingSVG size="32" color={{ house: 'white', roof: '#C6C6C6' }}/>}
          </Flex>


          {/* Business Name */}
          <Flex gap="$1" alignItems="center" justifyContent="center" css={{ width: '100%', margin: '$4 auto 0 auto' }}>
            <Text css={{ color: 'black', marginBottom: '0' }} weight="bold" size="md">{ whatsappProfileModelObject.displayName ? whatsappProfileModelObject.displayName : 'Your Company'}</Text>
            <WhatsAppVerifiedTickSVG size="12"/>
          </Flex>


          {/* Search & Share */}
          <Flex css={{ padding: '$12 $6 0 $6', width: '100%' }} gap="$3">
            <Flex css={{
              textAlign: 'center', padding: '$3', backgroundColor: 'white', borderRadius: '$sm', flex: '1' 
            }} alignItems="center" justifyContent="center" gap="$1" flexDirection="column">
              <SearchIcon size="16" color="#0DB44B"/>
              <Text css={{ marginBottom: '0', fontSize: '10px', color: 'black' }}>Search</Text>
            </Flex>
            <Flex css={{
              textAlign: 'center', padding: '$3', backgroundColor: 'white', borderRadius: '$sm', flex: '1' 
            }} alignItems="center" justifyContent="center" gap="$1" flexDirection="column">
              <Box css={{ lineHeight: '0', minHeight: '$4', transform: 'scaleX(-1)' }}>
                <ReplyOutlineSVG size="16" color="#0DB44B"/>
              </Box>
              <Text css={{ marginBottom: '0', fontSize: '10px', color: 'black' }}>Share</Text>
            </Flex>
          </Flex>


          {/* Business Description */}
          <DetailsListWrapper>
            <DetailListTile loading={!whatsappProfileModelObject.businessVertical} loaderWidth={['40%']}>{verticalLabelMap[whatsappProfileModelObject.businessVertical]}</DetailListTile>
            <DetailListTile loading={!whatsappProfileModelObject.aboutBusiness} loaderWidth={['60%', '95%', '88%', '88%']}>{whatsappProfileModelObject.aboutBusiness}</DetailListTile>
            <DetailListTile loading={!showAddress} loaderWidth={['65%']}>
              {whatsappProfileModelObject.addressLine1}
              {whatsappProfileModelObject.addressLine1 && whatsappProfileModelObject.addressLine2 && <br/>}
              {whatsappProfileModelObject.addressLine2}
              {whatsappProfileModelObject.city && <><br/>{whatsappProfileModelObject.city}</>}
              {whatsappProfileModelObject.state && <><br/>{whatsappProfileModelObject.state}</>}
              {whatsappProfileModelObject.pinCode && <><br/>{whatsappProfileModelObject.pinCode}</>}
              {whatsappProfileModelObject.country && <><br/>{whatsappProfileModelObject.country}</>}
            </DetailListTile>
            <DetailListTile loading={!whatsappProfileModelObject.businessEmail} loaderWidth={['60%']} href={`mailto:${whatsappProfileModelObject.businessEmail}`}>{whatsappProfileModelObject.businessEmail}</DetailListTile>
            <DetailListTile loading={!whatsappProfileModelObject.website} loaderWidth={['55%']} href={whatsappProfileModelObject.website}>{whatsappProfileModelObject.website}</DetailListTile>
            <DetailListTile loading={!whatsappProfileModelObject.website2} loaderWidth={['55%']} href={whatsappProfileModelObject.website2} last>{whatsappProfileModelObject.website2}</DetailListTile>
          </DetailsListWrapper>


          {/* Actions */}
          <DetailsListWrapper>
            <DetailListTile href disabled>Add {whatsappProfileModelObject.displayName} to contacts</DetailListTile>
            <DetailListTile href last disabled>Add to existing Contact</DetailListTile>
          </DetailsListWrapper>


          <Box css={{ height: '$5', flexShrink: '0' }} />

        </Flex>
      </Box>
    </Box>
  );
};

export default BusinessProfilePage;

const DetailsListWrapper = ({ children }) => {
  return (
    <Flex flexDirection="column" css={{
      borderRadius: '$sm', paddingLeft: '$4', backgroundColor: 'white', margin: '$5 $6 0 $6' 
    }}>
      {children}
    </Flex>
  );
};

const DetailListTile = ({
  children, href, last = false, loading, loaderWidth = ['100%'], disabled
}) => {
  if (loading) {
    return (
      <Flex flexDirection="column" css={{ width: '100%', padding: '$5 $4 $5 0', ...( !last && { borderBottom: '1px solid $neutral100' }) }} gap="5.25px">
        {loaderWidth.map((width, index) => <Box key={index} css={{
          height: '8.819px', width, background: 'linear-gradient(90deg, #E6E5E5 2.16%, #ECECEC 102.08%)', borderRadius: '15px',
        }} />)}
      </Flex>
    );
  }
  return (
    <Text {...( href && {
      as: 'a', href, target: '_blank', rel: 'noopener noreferrer' 
    })} css={{
      color: 'black',
      fontSize: '10px',
      lineHeight: '14px',
      marginBottom: '0',
      overflow: 'hidden',
      textOverflow: 'clip',
      padding: '$4 $4 $4 0',
      overflowWrap: 'anywhere',
      whiteSpace: 'break-spaces',
      ...(disabled && { cursor: 'default' }),
      ...(href && { color: '#0DB44B', '&:hover': { color: '#0DB44B' } }),
      ...( !last && { borderBottom: '1px solid $neutral100' }),
    }}>
      {children}
    </Text>
  );
};