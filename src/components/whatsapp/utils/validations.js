import { TemplateValidationSchema } from './models/TemplateModel';

export const ValidationRules = {
  required: (value) => value !== undefined && value !== null && value !== '',
  minLength: (value, min) => value.length >= min,
  maxLength: (value, max) => value.length <= max,
  regex: (value, pattern) => pattern.test(value),
  noSpaces: (value) => !/\s/.test(value),
  noCapitalLetters: (value) => !/[A-Z]/.test(value),
  noEmojis: (value) => !/(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])/.test(value),
  nameFormat: (value) => /^[a-z0-9_]+$/.test(value),
  minSize: (array, min) => array.length >= min,
  singleLine: (value) => !/\n/.test(value),
  validURL: (value) => /^(https?:\/\/)?(www\.)?[a-zA-Z0-9-]+(\.[a-zA-Z]{2,})+([/?].*)?$/.test(value),
};

function validateField(fieldPath, value, rules, isTemplateGroup, errors, errorFields) {
  if (!rules) return;

  if (Array.isArray(rules)) {
    for (const { rule, params, message } of rules) {
      if (!rule(value, params)) {
        if (isTemplateGroup) {
          const [templatePath, ...rest] = fieldPath.split('.');
          const nestedFieldPath = rest.join('.') || fieldPath;
          
          if (!errors[templatePath]) {
            errors[templatePath] = { hasError: false, fields: {} };
          }
          if (!errors[templatePath].fields[nestedFieldPath]) {
            errors[templatePath].fields[nestedFieldPath] = [];
          }
          errors[templatePath].fields[nestedFieldPath].push({ fieldPath: nestedFieldPath, message: message });
          errors[templatePath].hasError = true;
        } else {
          if (!errors.fields[fieldPath]) errors.fields[fieldPath] = [];
          errors.fields[fieldPath].push({ fieldPath, message });
          errors.hasError = true;
        }
        errorFields.add(fieldPath);
      }
    }
  } else if (typeof rules === 'object') {
    validateObject(fieldPath, value, rules, isTemplateGroup, errors, errorFields);
  }
}

function validateArray(fieldPath, array, schema, isTemplateGroup, errors, errorFields) {
  if (schema._array) {
    const { minLength, maxLength } = schema._array;
    if (minLength && array.length < minLength.value) {
      addError(fieldPath, minLength.message, isTemplateGroup, errors, errorFields);
    }
    if (maxLength && array.length > maxLength.value) {
      addError(fieldPath, maxLength.message, isTemplateGroup, errors, errorFields);
    }
  }

  if (schema._each) {
    array.forEach((item, index) => {
      validateObject(`${fieldPath}[${index}]`, item, schema._each, isTemplateGroup, errors, errorFields);
    });
  }
}

function validateObject(basePath, obj, schema, isTemplateGroup, errors, errorFields) {
  Object.entries(schema).forEach(([field, rules]) => {
    if (field === '_array' || field === '_each') return;

    const fieldPath = basePath ? `${basePath}.${field}` : field;
    const value = obj?.[field];

    if (Array.isArray(value)) {
      validateArray(fieldPath, value, rules, isTemplateGroup, errors, errorFields);
    } else if (typeof rules === 'object' && !Array.isArray(rules)) {
      validateObject(fieldPath, value, rules, isTemplateGroup, errors, errorFields);
    } else {
      validateField(fieldPath, value, rules, isTemplateGroup, errors, errorFields);
    }
  });
}

function addError(fieldPath, message, isTemplateGroup, errors, errorFields) {
  if (isTemplateGroup) {
    if (!errors[fieldPath]) errors[fieldPath] = [];
    errors[fieldPath].push({ fieldPath, message });
  } else {
    if (!errors.fields[fieldPath]) errors.fields[fieldPath] = [];
    errors.fields[fieldPath].push({ fieldPath, message });
    errors.hasError = true;
  }
  errorFields.add(fieldPath);
}

function commonValidate(obj, schema, isTemplateGroup = false) {
  const errors = isTemplateGroup ? {} : { hasError: false, fields: {} };
  const errorFields = new Set();

  validateObject('', obj, schema, isTemplateGroup, errors, errorFields);

  return { errors, errorFields: Array.from(errorFields) };
}

export function validateTemplateGroup(templateGroup, schema) {
  const { errors, errorFields } = commonValidate(templateGroup, schema, true);

  // Ensure each template has a hasError and fields property
  if (templateGroup.templates) {
    templateGroup.templates.forEach((_, index) => {
      const templatePath = `templates[${index}]`;
      if (!errors[templatePath]) {
        errors[templatePath] = { hasError: false, fields: {} };
      }
    });
  }

  return { errors, errorFields };
}

export function validateTemplate(template) {
  return commonValidate(template, TemplateValidationSchema);
}
function getFieldSchema(fieldPath, schema) {
  const pathParts = fieldPath.split('.');
  let currentSchema = schema;

  for (const part of pathParts) {
    if (!currentSchema) return null;
    if (currentSchema[part]) currentSchema = currentSchema[part];
    else if (currentSchema._each && currentSchema._each[part]) currentSchema = currentSchema._each[part];
    else return null;
  }
  
  return currentSchema;
}

function getNestedValue(fieldPath, object) {
  const pathParts = fieldPath.split('.');
  let currentValue = object;
  
  pathParts.forEach(part => {
    if (currentValue) currentValue = currentValue[part];
  });
  
  return currentValue;
}

export function validateSingleField(object, fieldPath, schema = null) {
  const fieldSchema = getFieldSchema(fieldPath, schema);

  if (!fieldSchema) {
    return { [fieldPath]: { hasError: false, fields: {} } };
  }

  const value = getNestedValue(fieldPath, object);
  const { errors } = commonValidate({ [fieldPath]: value }, { [fieldPath]: fieldSchema });

  return errors;
}