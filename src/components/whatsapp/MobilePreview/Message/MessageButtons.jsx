import React, { memo } from 'react';
import { Template } from '../../utils/models/TemplateModel';
import ReplyOutlineSVG from '../../../../assets/ReplyOutlineSVG';
import ExternalLinkSVG from '../../../../assets/ExternalLinkSVG';
import SourceCallSVG from '../../../../assets/SourceCallSVG';
const ActionButtonIcon = memo(({ type }) => {
  if (type === Template.BUTTON_TYPE.QUICK_REPLY) {
    return <ReplyOutlineSVG size="10" color="#3E90FD" />;
  } else if (type === Template.BUTTON_TYPE.URL) {
    return <ExternalLinkSVG size="10" color="#3E90FD" />;
  } else if (type === Template.BUTTON_TYPE.PHONE_NUMBER) {
    return <SourceCallSVG size="10" color="#3E90FD" />;
  }
});

ActionButtonIcon.displayName = 'ActionButtonIcon';

export default ActionButtonIcon;