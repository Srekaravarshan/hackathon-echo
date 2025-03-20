import axios from 'axios';
import { defaultTemplateImage, OVERALL_STATUS_TYPES, PUBLISH_LOADING_STATUS } from './constants';
import { Template, TemplateHeader } from './models/TemplateModel';
import { TemplateGroup, TemplateGroupHeaderType } from './models/TemplateGroupModel';

const providers = {
  CM: 'CM',
  CUSTOM_PROVIDER: 'CUSTOM_PROVIDER',
  TWILIO: 'TWILIO',
  GUPSHUP: 'GUPSHUP',
}

// Function to get all keys from an object, including nested keys and arrays
function getAllKeys(obj, prefix = '') {
  return Object.keys(obj).reduce((res, key) => {
    const value = obj[key];
    const prefixedKey = prefix ? `${prefix}.${key}` : key;
    if (Array.isArray(value)) {
      value.forEach((item, index) => {
        if (typeof item === 'object' && item !== null) {
          res.push(...getAllKeys(item, `${prefixedKey}[${index}]`));
        } else {
          res.push(`${prefixedKey}[${index}]`);
        }
      });
    } else if (typeof value === 'object' && value !== null) {
      res.push(...getAllKeys(value, prefixedKey));
    } else {
      res.push(prefixedKey);
    }
    return res;
  }, []);
}

const compareAndReturnIfChanged = (currentObj, initialObj) => {
  // Check if both arguments are objects
  if (
    typeof initialObj !== 'object' ||
    typeof currentObj !== 'object' ||
    initialObj === null ||
    currentObj === null
  ) {
    throw new Error('Both arguments should be non-null objects');
  }

  // Get all keys from both objects
  const keys1 = getAllKeys(initialObj);
  const keys2 = getAllKeys(currentObj);

  // Combine all keys and remove duplicates
  const allKeys = Array.from(new Set([...keys1, ...keys2]));

  // Check if there are any changes
  const hasChanges = allKeys.some((key) => {
    const keys = key.replace(/\[(\d+)]/g, '.$1').split('.');
    const value1 = keys.reduce((o, k) => (o ? o[k] : undefined), initialObj);
    const value2 = keys.reduce((o, k) => (o ? o[k] : undefined), currentObj);
    return value1 !== value2;
  });

  // Return the current object if there are changes, otherwise return null
  return hasChanges ? currentObj : null;
};

const getOverallStatus = (template, provider) => {
  if (provider !== providers.GUPSHUP) return OVERALL_STATUS_TYPES.APPROVED;
  let isAllApproved = true;
  let isAllRejected = true;
  let isAllFailed = true;
  let hasPending = false;
  let hasDraft = false;

  const checkStatus = (status) => {
    if (status !== PUBLISH_LOADING_STATUS.APPROVED) isAllApproved = false;
    if (status !== PUBLISH_LOADING_STATUS.REJECTED) isAllRejected = false;
    if (status !== PUBLISH_LOADING_STATUS.FAILED) isAllFailed = false;
    if (status === PUBLISH_LOADING_STATUS.PENDING) hasPending = true;
    if (status === Template.TEMPLATE_STATE.DRAFT) hasDraft = true;
  };

  checkStatus(template.approvalStatus);
  template.subTemplates.forEach(subTemplate => checkStatus(subTemplate.approvalStatus));

  if (hasDraft) return OVERALL_STATUS_TYPES.DRAFT;
  if (hasPending) return OVERALL_STATUS_TYPES.IN_REVIEW;
  if (isAllApproved) return OVERALL_STATUS_TYPES.APPROVED;
  if (isAllRejected) return OVERALL_STATUS_TYPES.REJECTED;
  if (isAllFailed) return OVERALL_STATUS_TYPES.FAILED;
  return OVERALL_STATUS_TYPES.PARTIAL_APPROVED;
};

const getInitialWhatsappTemplateGroup = ({ name }) => {
  return new TemplateGroup({
    name: name || 'whatsapp_template',
    headerType: new TemplateGroupHeaderType(),
    templates: [
      new Template({
        header: new TemplateHeader({ text: 'Hello!', mediaURL: defaultTemplateImage, textLexicalHtml: '<p dir="ltr"><span class="text-base" style="white-space: pre-wrap;">Hello 👋</span></p>' }),
        body: 'Ready to share your feedback?\n\nType `yes` to continue',
        footer: 'Reply STOP to unsubscribe',
        name: name || 'whatsapp_template',
      })
    ],
  });
};

const saveAsDraftValidation = (templateList) => {
  if (!templateList?.name?.trim?.()) {
    const element = document.getElementById('template-builder-name');
    element?.focus?.();
    return { valid: false, message: 'errors.pleaseAddName' };
  }
  if (!templateList?.templates?.length) {
    return { valid: false, message: 'errors.pleaseAddLanguage' };
  }
  return { valid: true };
};

const renderLanguages = (template) => {
  const languages = [Object.values(template?.properties?.languages)?.[0], ...template.subTemplates.map(sub => Object.values(sub?.properties?.languages)?.[0])].flat();
  return languages.length > 2 ? `${languages[0]}, ${languages[1]}, +${languages.length - 2}` : languages.join(', ');
};

export default {
  createWhatsappTemplate: ({ payload }) => axios.post('/api/internal/whatsapp/templates/create-template', payload),
  deleteTemplate: ({ templateId, ssWhatsappAccountId }) => axios.delete(`/api/internal/whatsapp/templates/${templateId}`, { data: { ssWhatsappAccountId } }),
  editWhatsappTemplate: ({ templateId, payload }) => axios.put(`/api/internal/whatsapp/templates/${templateId}`, payload),
  getTemplateSurveys: ({ templateId }) => axios.get(`/api/internal/whatsapp/templates/${templateId}/surveys`),
  getTemplateTranslations: ({ payload }) => axios.post('/api/internal/whatsapp/templates/translate-templates', payload),
  getWhatsappTemplate: ({ templateId }) => axios.get(`/api/internal/whatsapp/templates/${templateId}/template`),
  compareAndReturnIfChanged,
  getOverallStatus,
  saveAsDraftValidation,
  renderLanguages,
  getInitialWhatsappTemplateGroup,
};
