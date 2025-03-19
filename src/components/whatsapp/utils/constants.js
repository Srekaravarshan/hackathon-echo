export const TEMPLATE_HEADER_TYPES = {
  TEXT: 'TEXT',
  IMAGE: 'IMAGE',
};

export const TEMPLATE_HEADER_TYPES_INFO = {
  [TEMPLATE_HEADER_TYPES.TEXT]: {
    label: 'Text'
  },
  [TEMPLATE_HEADER_TYPES.IMAGE]: {
    label: 'Image'
  },
  [TEMPLATE_HEADER_TYPES.VIDEO]: {
    label: 'Video'
  },
  [TEMPLATE_HEADER_TYPES.DOCUMENT]: {
    label: 'Document'
  },
};

export const TEMPLATE_CATEGORY = {
  MARKETING: 'MARKETING',
};

export const PUBLISH_LOADING_STATUS = {
  IDLE: 'IDLE',
  SENDING: 'SENDING',
  SAVING: 'SAVING',
  PENDING: 'PENDING',
  FAILED: 'FAILED',
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED',
  ERROR: 'ERROR',
};

export const OVERALL_STATUS_TYPES = {
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED',
  IN_REVIEW: 'IN_REVIEW',
  PARTIAL_APPROVED: 'PARTIAL_APPROVED',
  FAILED: 'FAILED',
  DRAFT: 'DRAFT',
};

export const TEMPLATE_BUILDER_STATUS = {
  NEW: 'NEW',
  DRAFT: 'DRAFT',
  EDIT: 'EDIT',
  EDIT_SINGLE_LANGUAGE: 'EDIT_SINGLE_LANGUAGE',
  PUBLISHED: 'PUBLISHED',
};

export const defaultTemplateImage = 'https://static.surveysparrow.com/application/images-dev/1721022877548__5e076587c1ea055f0235221290dea9b78dae8ea9d0bb29d7f9a0283ca456__default.png';