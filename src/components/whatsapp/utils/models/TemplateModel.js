import { ValidationRules } from '../validations';
import { TEMPLATE_HEADER_TYPES } from '../constants';
import short from 'short-uuid';

const languages = [
  // code  : iso 639-2 language code (make sure these language codes are supported in google translate API)
  // name  : language name
  // flag  : country flag code
  // label : iso 639-3 language code
  {
    code: 'af',
    name: 'Afrikaans',
    flag: 'ZA',
    label: 'afr'
  },
  {
    code: 'sq',
    name: 'Albanian',
    flag: 'AL',
    label: 'sqi',
  },
  {
    code: 'amh',
    name: 'Amharic',
    flag: 'ET',
    label: 'amh',
  },
  {
    code: 'ar',
    name: 'Arabic',
    flag: 'SA',
    label: 'ara',
  }, {
    code: 'hy',
    name: 'Armenian',
    flag: 'AM',
    label: 'hye',
  },
  {
    code: 'as',
    name: 'Assamese',
    flag: 'IN',
    label: 'asm',
  },
  {
    code: 'ay',
    name: 'Aymara',
    flag: 'PE',
    label: 'aym'
  },
  {
    code: 'aze',
    name: 'Azerbaijani',
    flag: 'AZ',
    label: 'aze'
  },
  {
    code: 'bm',
    name: 'Bambara',
    flag: 'ML',
    label: 'bam'
  },
  {
    code: 'eu',
    name: 'Basque',
    flag: 'ES',
    label: 'eus',
  },
  {
    code: 'be',
    name: 'Belarusian',
    flag: 'BY',
    label: 'bel'
  },
  {
    code: 'bn',
    name: 'Bengali',
    flag: 'BD',
    label: 'ben',
  },
  {
    code: 'bho',
    name: 'Bhojpuri',
    flag: 'IN',
    label: 'bho'
  },
  {
    code: 'bs',
    name: 'Bosnian',
    flag: 'BA',
    label: 'bos',
  },
  {
    code: 'bg',
    name: 'Bulgarian',
    flag: 'BG',
    label: 'bul',
  },
  {
    code: 'ca',
    name: 'Catalan',
    flag: 'ES',
    label: 'cat',
  },
  {
    code: 'ceb',
    name: 'Cebuano',
    flag: 'PH',
    label: 'ceb'
  },
  {
    code: 'zh',
    name: 'Chinese (Simplified)',
    flag: 'CN',
    label: 'zho',
  },
  {
    code: 'zh-TW',
    name: 'Chinese (Traditional)',
    flag: 'CN',
    label: 'zh-TW', // cross check the label
  },
  {
    code: 'co',
    name: 'Corsican',
    flag: 'FR',
    label: 'cos'
  },
  {
    code: 'hr',
    name: 'Croatian',
    flag: 'HR',
    label: 'hrv',
  },
  {
    code: 'cs',
    name: 'Czech',
    flag: 'CZ',
    label: 'ces',
  },
  {
    code: 'da',
    name: 'Danish',
    flag: 'DK',
    label: 'dan',
  },
  {
    code: 'dv',
    name: 'Dhivehi',
    flag: 'MV',
    label: 'dv'
  },
  {
    code: 'doi',
    name: 'Dogri',
    flag: 'IN',
    label: 'doi'
  },
  {
    code: 'nl',
    name: 'Dutch',
    flag: 'NL',
    label: 'nld',
  },
  {
    code: 'en',
    name: 'English',
    flag: 'GB',
    label: 'eng',
  },
  {
    code: 'eo',
    name: 'Esperanto',
    flag: 'BR',
    label: 'epo'
  },
  {
    code: 'et',
    name: 'Estonian',
    flag: 'EE',
    label: 'est',
  },
  {
    code: 'ee',
    name: 'Ewe',
    flag: 'GH',
    label: 'ewe'
  },
  {
    code: 'fil',
    name: 'Filipino',
    flag: 'PH',
    label: 'fil',
  },
  {
    code: 'fi',
    name: 'Finnish',
    flag: 'FI',
    label: 'fin',
  },
  {
    code: 'fr',
    name: 'French',
    flag: 'FR',
    label: 'fra',
  },
  {
    code: 'fy',
    name: 'Frisian',
    flag: 'NL',
    label: 'fry'
  },
  {
    code: 'gl',
    name: 'Galician',
    flag: 'ES',
    label: 'glg'
  },
  {
    code: 'ka',
    name: 'Georgian',
    flag: 'GE',
    label: 'kat',
  },
  {
    code: 'de',
    name: 'German',
    flag: 'DE',
    label: 'deu',
  },
  {
    code: 'el',
    name: 'Greek',
    flag: 'GR',
    label: 'ell',
  },
  {
    code: 'gn',
    name: 'Guarani',
    flag: 'PY',
    label: 'grn'
  },
  {
    code: 'gu',
    name: 'Gujarati',
    flag: 'IN',
    label: 'guj',
  },
  {
    code: 'ht',
    name: 'Haitian Creole',
    flag: 'BS',
    label: 'hat',
  },
  {
    code: 'ha',
    name: 'Hausa',
    flag: 'NG',
    label: 'hau'
  },
  {
    code: 'haw',
    name: 'Hawaiian',
    flag: 'US',
    label: 'haw'
  },
  {
    code: 'he',
    name: 'Hebrew',
    flag: 'IL',
    label: 'heb',
  },
  {
    code: 'hi',
    name: 'Hindi',
    flag: 'IN',
    label: 'hin',
  },
  {
    code: 'hmn',
    name: 'Hmong',
    flag: 'CN',
    label: 'hmn'
  },
  {
    code: 'hu',
    name: 'Hungarian',
    flag: 'HU',
    label: 'hun',
  },
  {
    code: 'is',
    name: 'Icelandic',
    flag: 'IS',
    label: 'isl',
  },
  {
    code: 'ig',
    name: 'Igbo',
    flag: 'NG',
    label: 'ibo'
  },
  {
    code: 'ilo',
    name: 'Ilocano',
    flag: 'PH',
    label: 'ilo'
  },
  {
    code: 'id',
    name: 'Indonesian',
    flag: 'ID',
    label: 'ind',
  },
  {
    code: 'ga',
    name: 'Irish',
    flag: 'IE',
    label: 'gle',
  },
  {
    code: 'it',
    name: 'Italian',
    flag: 'IT',
    label: 'ita',
  },
  {
    code: 'ja',
    name: 'Japanese',
    flag: 'JP',
    label: 'jpn',
  },
  {
    code: 'jv',
    name: 'Javanese',
    flag: 'ID',
    label: 'jav'
  },
  {
    code: 'kn',
    name: 'Kannada',
    flag: 'IN',
    label: 'kan',
  },
  {
    code: 'kk',
    name: 'Kazakh',
    flag: 'KZ',
    label: 'kaz'
  },
  {
    code: 'km',
    name: 'Khmer',
    flag: 'KH',
    label: 'khm',
  },
  {
    code: 'rw',
    name: 'Kinyarwanda',
    flag: 'RW',
    label: 'kin',
  },
  {
    code: 'gom',
    name: 'Konkani',
    flag: 'IN',
    label: 'gom'
  },
  {
    code: 'ko',
    name: 'Korean',
    flag: 'KR',
    label: 'kor',
  },
  {
    code: 'kri',
    name: 'Krio',
    flag: 'SL',
    label: 'kri'
  },
  {
    code: 'ku',
    name: 'Kurdish',
    flag: 'IQ',
    label: 'kur'
  },
  {
    code: 'ckb',
    name: 'Kurdish(Sorani)',
    flag: 'IR',
    label: 'ckb'
  },
  {
    code: 'ky',
    name: 'Kyrgyz',
    flag: 'KG',
    label: 'kir'
  },
  {
    code: 'lo',
    name: 'Lao',
    flag: 'LA',
    label: 'lao',
  },
  {
    code: 'la',
    name: 'Latin',
    flag: 'VA',
    label: 'lat'
  },
  {
    code: 'lv',
    name: 'Latvian',
    flag: 'LV',
    label: 'lav',
  },
  {
    code: 'ln',
    name: 'Lingala',
    flag: 'CD',
    label: 'lin'
  },
  {
    code: 'lt',
    name: 'Lithuanian',
    flag: 'LT',
    label: 'lit',
  },
  {
    code: 'lg',
    name: 'Luganda',
    flag: 'UG',
    label: 'lug'
  },
  {
    code: 'lb',
    name: 'Luxembourgish',
    flag: 'LU',
    label: 'ltz'
  },
  {
    code: 'mk',
    name: 'Macedonian',
    flag: 'MK',
    label: 'mkd',
  },
  {
    code: 'mai',
    name: 'Maithili',
    flag: 'IN',
    label: 'mai'
  },
  {
    code: 'mg',
    name: 'Malagasy',
    flag: 'MG',
    label: 'mlg'
  },
  {
    code: 'ms',
    name: 'Malay',
    flag: 'MY',
    label: 'msa',
  },
  {
    code: 'ml',
    name: 'Malayalam',
    flag: 'IN',
    label: 'mal',
  },
  {
    code: 'mt',
    name: 'Maltese',
    flag: 'MT',
    label: 'mlt'
  },
  {
    code: 'mi',
    name: 'Maori',
    flag: 'NZ',
    label: 'mri'
  },
  {
    code: 'mr',
    name: 'Marathi',
    flag: 'IN',
    label: 'mar',
  },
  {
    code: 'mh',
    name: 'Marshallese',
    flag: 'MH',
    label: 'mah'
  },
  {
    code: 'mni-Mtei',
    name: 'Meiteilon (Manipuri)',
    flag: 'IN',
    label: 'mni-Mtei'
  },
  {
    code: 'lus',
    name: 'Mizo',
    flag: 'IN',
    label: 'lus'
  },
  {
    code: 'mon',
    name: 'Mongolian',
    flag: 'MN',
    label: 'mon'
  },
  {
    code: 'my',
    name: 'Myanmar (Burmese)',
    flag: 'MM',
    label: 'mya',
  },
  {
    code: 'ne',
    name: 'Nepali',
    flag: 'NP',
    label: 'nep'
  },
  {
    code: 'no',
    name: 'Norwegian',
    flag: 'NO',
    label: 'nor',
  },
  {
    code: 'ny',
    name: 'Nyanja (Chichewa)',
    flag: 'MW',
    label: 'nya'
  },
  {
    code: 'or',
    name: 'Odia',
    flag: 'IN',
    label: 'ori',
  },
  {
    code: 'om',
    name: 'Oromo',
    flag: 'ET',
    label: 'orm'
  },
  {
    code: 'pap',
    name: 'Papiamento',
    flag: 'AW',
    label: 'pap'
  },
  {
    code: 'ps',
    name: 'Pashto',
    flag: 'AF',
    label: 'pus',
  },
  {
    code: 'fa',
    name: 'Persian',
    flag: 'IR',
    label: 'fas',
  },
  {
    code: 'pl',
    name: 'Polish',
    flag: 'PL',
    label: 'pol',
  },
  {
    code: 'pt',
    name: 'Portuguese',
    flag: 'PT',
    label: 'por',
  },
  {
    code: 'pa',
    name: 'Punjabi',
    flag: 'IN',
    label: 'pan',
  },
  {
    code: 'qu',
    name: 'Quechua',
    flag: 'BO',
    label: 'que'
  },
  {
    code: 'ro',
    name: 'Romanian',
    flag: 'RO',
    label: 'ron',
  },
  {
    code: 'ru',
    name: 'Russian',
    flag: 'RU',
    label: 'rus',
  },
  {
    code: 'sm',
    name: 'Samoan',
    flag: 'WS',
    label: 'smo'
  },
  {
    code: 'sa',
    name: 'Sanskrit',
    flag: 'IN',
    label: 'san'
  },
  {
    code: 'gd',
    name: 'Scots Gaelic',
    flag: 'GB',
    label: 'gla'
  },
  {
    code: 'nso',
    name: 'Sepedi',
    flag: 'ZA',
    label: 'nso'
  },
  {
    code: 'sr',
    name: 'Serbian',
    flag: 'RS',
    label: 'srp',
  },
  {
    code: 'st',
    name: 'Sesotho',
    flag: 'LS',
    label: 'sot'
  },
  {
    code: 'sn',
    name: 'Shona',
    flag: 'ZWE',
    label: 'sna',
  },
  {
    code: 'sd',
    name: 'Sindhi',
    flag: 'PK',
    label: 'snd'
  },
  {
    code: 'si',
    name: 'Sinhala',
    flag: 'LK',
    label: 'sin',
  },
  {
    code: 'sk',
    name: 'Slovak',
    flag: 'SK',
    label: 'slk',
  },
  {
    code: 'sl',
    name: 'Slovenian',
    flag: 'SI',
    label: 'slv',
  }, {
    code: 'som',
    name: 'Somali',
    flag: 'SO',
    label: 'som'
  },
  {
    code: 'es',
    name: 'Spanish',
    flag: 'ES',
    label: 'spa',
  },
  {
    code: 'su',
    name: 'Sundanese',
    flag: 'ID',
    label: 'sun'
  },
  {
    code: 'sw',
    name: 'Swahili',
    flag: 'KE',
    label: 'swa',
  },
  {
    code: 'sv',
    name: 'Swedish',
    flag: 'SE',
    label: 'swe',
  },
  {
    code: 'tl',
    name: 'Tagalog (Filipino)',
    flag: 'PH',
    label: 'tgl'
  },
  {
    code: 'tg',
    name: 'Tajik',
    flag: 'TJ',
    label: 'tgk'
  },
  {
    code: 'ta',
    name: 'Tamil',
    flag: 'IN',
    label: 'tam',
  },
  {
    code: 'tt',
    name: 'Tatar',
    flag: 'RU',
    label: 'tat'
  },
  {
    code: 'te',
    name: 'Telugu',
    flag: 'IN',
    label: 'tel',
  },
  {
    code: 'th',
    name: 'Thai',
    flag: 'TH',
    label: 'tha',
  },
  {
    code: 'ti',
    name: 'Tigrinya',
    flag: 'ET',
    label: 'tir'
  },
  {
    code: 'ts',
    name: 'Tsonga',
    flag: 'ZW',
    label: 'tso'
  },
  // { code: 'to', name: 'Tongan', flag:'TO' ,label: 'ala',}, not supported by google
  {
    code: 'tr',
    name: 'Turkish',
    flag: 'TR',
    label: 'tur',
  },
  {
    code: 'tk',
    name: 'Turkmen',
    flag: 'TM',
    label: 'tuk'
  },
  {
    code: 'ak',
    name: 'Twi (Akan)',
    flag: 'GH',
    label: 'aka'
  },
  {
    code: 'uk',
    name: 'Ukrainian',
    flag: 'UA',
    label: 'ukr',
  },
  {
    code: 'ur',
    name: 'Urdu',
    flag: 'PK',
    label: 'urd',
  },
  {
    code: 'ug',
    name: 'Uyghur',
    flag: 'CN',
    label: 'uig'
  },
  {
    code: 'uz',
    name: 'Uzbek',
    flag: 'UZ',
    label: 'uzb',
  },
  {
    code: 'vi',
    name: 'Vietnamese',
    flag: 'VN',
    label: 'vie',
  },
  {
    code: 'cy',
    name: 'Welsh',
    flag: 'GB-WLS',
    label: 'cym',
  },
  {
    code: 'xh',
    name: 'Xhosa',
    flag: 'ZA',
    label: 'zho',
  },
  {
    code: 'yi',
    name: 'Yiddish',
    flag: 'IL',
    label: 'yid'
  },
  {
    code: 'yo',
    name: 'Yoruba',
    flag: 'NG',
    label: 'yor'
  },
  {
    code: 'zu',
    name: 'Zulu',
    flag: 'ZA',
    label: 'zul',
  },
];

export function replaceWithDollarSign(text) {
  if (!text) {
    return '';
  }
  // Replace all occurrences of {{number}} with {{$}}
  return text?.replace?.(/\{\{\d+\}\}/g, '{{$}}');
}

export function replaceWithIncrementingNumbers(text) {
  if (!text) {
    return { replacedText: '', replacements: {} };
  }
  // Initialize a counter
  let counter = 1;
  const replacements = {};
  // Replace all occurrences of {{contact_properties}} with {{number}} using a function to increment the number
  const replacedText = text?.replace?.(/\{\{(.*?)\}\}/g, (_, placeholder) => {
    replacements[counter] = placeholder;
    return `{{${counter++}}}`;
  });
  
  return { replacedText, replacements };
}

const getHeaderMediaType = (type) => {
  const mediaType = type?.toLowerCase?.();
  if (mediaType === 'image') return TEMPLATE_HEADER_TYPES.IMAGE;
  if (mediaType === 'video') return TEMPLATE_HEADER_TYPES.VIDEO;
  if (mediaType === 'document') return TEMPLATE_HEADER_TYPES.DOCUMENT;
  if (mediaType === 'location') return TEMPLATE_HEADER_TYPES.LOCATION;
  if (mediaType === 'product') return TEMPLATE_HEADER_TYPES.PRODUCT;
  if (mediaType === 'catalog') return TEMPLATE_HEADER_TYPES.CATALOG;
  if (mediaType === 'carousel') return TEMPLATE_HEADER_TYPES.CAROUSEL;
  return TEMPLATE_HEADER_TYPES.IMAGE;
};

export class Template {
  constructor({
    id = short('0123456789').generate(),
    category = Template.CATEGORY.UTILITY,
    templateType = Template.TEMPLATE_TYPE.CUSTOM_MESSAGE,
    language = new TemplateLanguage(),
    header = new TemplateHeader(),
    body = '',
    footer = '',
    response = new TemplateResponse(),
    approvalStatus = null,
    name = '',
    state = Template.TEMPLATE_STATE.DRAFT,
    rejectedReason = null,
  }) {
    this.id = id;
    this.category = category;
    this.templateType = templateType;
    this.language = language;
    this.header = header;
    this.body = body;
    this.footer = footer;
    this.response = response;
    this.approvalStatus = approvalStatus;
    this.name = name;
    this.state = state;
    this.rejectedReason = rejectedReason;
  }

  static APPROVAL_STATUS = {
    IN_REVIEW: 'IN_REVIEW',
    APPROVED: 'APPROVED',
    FAILED: 'FAILED',
    REJECTED: 'REJECTED',
  }

  static CATEGORY = {
    MARKETING: 'MARKETING',
    UTILITY: 'UTILITY',
    AUTHENTICATION: 'AUTHENTICATION',
  };

  static TEMPLATE_TYPE = {
    CUSTOM_MESSAGE: 'CUSTOM_MESSAGE',
    PRODUCT_MESSAGE: 'PRODUCT_MESSAGE',
    CAROUSEL: 'CAROUSEL',
    LIMITED_TIME_OFFER: 'LIMITED_TIME_OFFER',
  };

  static HEADER_TYPE = {
    TEXT: 'TEXT',
    MEDIA: 'MEDIA',
  };

  static MEDIA_TYPE = {
    IMAGE: 'IMAGE',
    VIDEO: 'VIDEO',
    DOCUMENT: 'DOCUMENT',
    LOCATION: 'LOCATION',
    PRODUCT: 'PRODUCT',
    CATALOG: 'CATALOG',
  };

  static BUTTON_TYPE = {
    QUICK_REPLY: 'QUICK_REPLY',
    URL: 'URL',
    PHONE_NUMBER: 'PHONE_NUMBER',
    COPY_CODE: 'COPY_CODE',
  };

  static RESPONSE_TYPE = {
    TEXT: 'TEXT',
    CHOICES: 'CHOICES',
  };

  static TEMPLATE_STATE = {
    DRAFT: 'DRAFT',
    EDITED: 'EDITED',
    CREATED: 'CREATED',
  }

  static fromDBJSON(json) {
    if (!json) return null;
    return new Template({
      id: json.id,
      language: TemplateLanguage.fromCode(Object.keys(json?.properties?.languages)?.[0] || 'en'),
      header: TemplateHeader.fromDBJSON(json),
      body: replaceWithDollarSign(json.template?.data || json.template?.default),
      footer: json.template?.footer,
      response: TemplateResponse.fromDBJSON(json),
      approvalStatus: json.approvalStatus,
      name: json.template?.name ? json.template.name : json.name,
      rejectedReason: json?.rejectedReason || null,
    });
  }

  static fromDBJSONForGupshup(json, additionalData = {}) {
    if (!json) return null;
    return new Template({
      id: json.id,
      language: TemplateLanguage.fromCode(Object.keys(json?.properties?.languages)?.[0] || 'en'),
      header: TemplateHeader.fromDBJSON(json),
      body: json.template?.data || json.template?.default,
      footer: json.template?.footer,
      response: TemplateResponse.fromDBJSON(json),
      approvalStatus: json.approvalStatus,
      name: json.template?.name ? json.template.name : json.name,
      rejectedReason: json?.rejectedReason || null,
      ...additionalData,
    });
  }

  static fromDBJSONForReminders({ tmo, whatsappTemplateChannel }) {
    if (!whatsappTemplateChannel) return tmo;
    const getType = (type) => {
      const upperCaseType = type?.toUpperCase?.();
      if (!upperCaseType || upperCaseType === 'TEXT') return Template.HEADER_TYPE.TEXT;
      return Template.HEADER_TYPE.MEDIA;
    };
    return {
      ...tmo,
      header: new TemplateHeader({
        type: getType(whatsappTemplateChannel?.properties?.header?.type),
        mediaType: getHeaderMediaType(whatsappTemplateChannel?.properties?.header?.type),
        text: '',
        mediaURL: whatsappTemplateChannel?.properties?.header?.url,
      }),
      body: whatsappTemplateChannel?.properties?.templateBody,
    };
  }


  static fromDBJSONForCM(json = {}, languageCode = null, additionalData = {}) {
    return new Template({
      id: json.id,
      language: TemplateLanguage.fromCode( languageCode ? languageCode : Object.keys(json?.template)?.[0]),
      header: TemplateHeader.fromDBJSONForCM(json),
      body: languageCode ? json?.template?.[languageCode] : Object.values(json?.template)?.[0],
      name: json.name,
      ...additionalData,
    });
  }

  static fromDBJSONForCustom(json = {}, additionalData = {}) {
    return new Template({
      id: json.id,
      body: json?.template?.default,
      name: json.name,
      ...additionalData,
    });
  }

  static toDBJSON(template) {
    if (template.state === Template.TEMPLATE_STATE.EDITED) {
      return {
        id: template.id,
        type: template.header.type,
        body: (replaceWithIncrementingNumbers(template.body))?.replacedText,
        response: TemplateResponse.toDBJSON(template.response),
        state: this.TEMPLATE_STATE.EDITED,
        name: template.name,
        ...(!!template.header && { header: TemplateHeader.toDBJSON(template.header) }),
        ...(!!template.footer && { footer: template.footer }),
      };
    }
    return {
      id: typeof template.id === 'string' ? null : template.id,
      category: template.category,
      templateType: template.templateType,
      type: template.header.type,
      language: TemplateLanguage.toDBJSON(template.language),
      header: TemplateHeader.toDBJSON(template.header),
      body: (replaceWithIncrementingNumbers(template.body))?.replacedText,
      footer: template.footer,
      response: TemplateResponse.toDBJSON(template.response),
      name: template.name,
      state: template.state,
    };
  }

  static fromJSON(json) {
    const template = new Template({
      id: json.id,
      category: json.category,
      templateType: json.templateType,
      language: new TemplateLanguage(json.language),
      header: new TemplateHeader(json.header),
      body: json.body,
      footer: json.footer,
      response: new TemplateResponse(json.response),
      approvalStatus: json.approvalStatus,
      name: json.name,
    });
    return template;
  }

  toJSON() {
    return {
      id: this.id,
      category: this.category,
      templateType: this.templateType,
      language: (this.language instanceof TemplateLanguage) ? this.language.toJSON() : this.language,
      header: (this.header instanceof TemplateHeader) ? this.header.toJSON() : this.header,
      body: this.body,
      footer: this.footer,
      response: (this.response instanceof TemplateResponse) ? this.response.toJSON() : this.response,
      approvalStatus: this.approvalStatus,
      name: this.name,
      rejectedReason: this.rejectedReason,
      state: this.state,
    };
  }


  static getInitialTemplate() {
    return new Template({
      footer: 'Reply STOP to unsubscribe',
    });
  }
}

export class TemplateLanguage {
  constructor({
    code = 'en', name = 'English', flag = 'GB', label = 'eng' 
  } = {}) {
    this.code = code;
    this.name = name;
    this.flag = flag;
    this.label = label;
  }

  static fromCode(code) {
    const language = languages.find(language => language.code === code);
    return new TemplateLanguage(language);
  }
  
  static toDBJSON(language) {
    return {
      code: language.code,
      name: language.name,
      flag: language.flag,
      label: language.label,
    };
  };
 
  toJSON() {
    return {
      code: this.code,
      name: this.name,
      flag: this.flag,
      label: this.label,
    };
  }
}

export class TemplateHeader {
  constructor({
    type = Template.HEADER_TYPE.TEXT, mediaType = Template.MEDIA_TYPE.IMAGE, text = '', mediaURL = '', 
  } = {}) {
    this.type = type;
    this.mediaType = mediaType;
    this.text = text;
    this.mediaURL = mediaURL;
  }

  static fromDBJSON(json) {
    if (!json) return null;
    return new TemplateHeader({
      type: json.type === 'TEXT' ? Template.HEADER_TYPE.TEXT : Template.HEADER_TYPE.MEDIA,
      mediaType: json.type === 'TEXT' ? null : json.type,
      mediaURL: json?.template?.headerMedia || json?.template?.sampleMedia || json?.template?.url || json?.template?.header?.url,
      text: replaceWithDollarSign(typeof json?.template?.header === 'string' ? json?.template?.header : json?.template?.header?.text),
    });
  }

  static fromDBJSONForCM(json) {
    return new TemplateHeader({
      type: json.properties?.headerFormat === 'none' ? Template.HEADER_TYPE.TEXT : Template.HEADER_TYPE.MEDIA,
      mediaType: getHeaderMediaType(json.properties?.headerFormat),
      text: '',
      mediaURL: json?.properties?.header?.url,
    });
  }

  static toDBJSON(header) {
    return {
      type: header.type,
      mediaType: header.mediaType,
      text: (replaceWithIncrementingNumbers(header.text))?.replacedText,
      mediaURL: header.mediaURL,
    };
  }

  static toDBJSONForShare(header) {
    return {
      type: header.type === Template.HEADER_TYPE.TEXT ? header.type?.toLowerCase?.() : header.mediaType?.toLowerCase?.(),
      url: header.mediaURL || '',
    };
  }

  toJSON() {
    return {
      type: this.type,
      mediaType: this.mediaType,
      text: this.text,
      mediaURL: this.mediaURL,
    };
  }
}

export class TemplateButton {
  constructor({ type = Template.BUTTON_TYPE.QUICK_REPLY, label = '', url = '' } = {}) {
    this.type = type;
    this.label = label;
    this.url = url;
  }

  toJSON() {
    return {
      type: this.type,
      label: this.label,
      url: this.url,
    };
  }

  static getInitialTemplateButton(props) {
    return new TemplateButton(props);
  }
}

export class TemplateResponse {
  constructor({ type = Template.RESPONSE_TYPE.TEXT, choices = [], urlChoices = [] } = {}) {
    this.type = type;
    this.choices = choices;
    this.urlChoices = urlChoices;
  }

  static fromDBJSON(json) {
    if (!json) return null;
    return new TemplateResponse({
      type: json?.template?.buttons?.length > 0 ? Template.RESPONSE_TYPE.CHOICES : Template.RESPONSE_TYPE.TEXT,
      choices: json?.template?.buttons?.filter?.(button => button.type === Template.BUTTON_TYPE.QUICK_REPLY)?.map?.(button => new TemplateResponseChoice({ ...button, label: button.text })),
      urlChoices: json?.template?.buttons?.filter?.(button => button.type === Template.BUTTON_TYPE.URL)?.map?.(button => new TemplateResponseChoice({ ...button, label: button.text })),
      otherChoices: json?.template?.buttons?.filter?.(button => button.type !== Template.BUTTON_TYPE.QUICK_REPLY && button.type !== Template.BUTTON_TYPE.URL)?.map?.(button => new TemplateResponseChoice({ ...button, label: button.text })),
    });
  }

  static toDBJSON(response) {
    return {
      type: response.type,
      choices: response.choices.map(choice => TemplateResponseChoice.toDBJSON(choice)),
      urlChoices: response.urlChoices.map(choice => TemplateResponseChoice.toDBJSON(choice)),
    };
  }

  toJSON() {
    return {
      type: this.type,
      choices: this.choices.map(choice => choice.toJSON()),
      urlChoices: this.urlChoices.map(choice => choice.toJSON()),
    };
  }
}

export class TemplateResponseChoice {
  constructor({ label = '', type = Template.BUTTON_TYPE.QUICK_REPLY, url = '' } = {}) {
    this.type = type;
    this.label = label;
    this.url = url;
  }

  static fromDBJSON(choice) {
    if (!choice) return null;
    return new TemplateResponseChoice({
      type: choice.type,
      label: choice.label,
      url: choice.url,
    });
  }

  static toDBJSON(choice) {
    return {
      type: choice.type,
      label: choice.label,
      url: choice.url,
    };
  }

  static toJSONFromTemplate(template) {
    return {
      type: template.type,
      label: template.label,
      url: template.url,
    };
  }

  toJSON() {
    return {
      type: this.type,
      label: this.label,
      url: this.url,
    };
  }

  static getInitialChoice({ type, label, url } = {}) {
    return {
      type: type ? type : Template.BUTTON_TYPE.QUICK_REPLY,
      label: label ? label : '',
      url: url ? url : '',
    };
  };
}

export const TemplateValidationSchema = (() => {
  return {
    name: [
      { rule: ValidationRules.required, message: 'channels.list.whatsApp.templateBuilder.errors.nameIsRequired' },
      { rule: ValidationRules.maxLength, params: 60, message: 'channels.list.whatsApp.templateBuilder.errors.nameLimit' },
      { rule: ValidationRules.nameFormat, message: 'channels.list.whatsApp.templateBuilder.errors.nameAllowedChars' },
    ],
    category: [
      { rule: ValidationRules.required, message: 'channels.list.whatsApp.templateBuilder.errors.categoryIsRequired' },
      { rule: (value) => Object.values(Template.CATEGORY).includes(value), message: 'channels.list.whatsApp.templateBuilder.errors.invalidCategory' },
    ],
    templateType: [
      { rule: ValidationRules.required, message: 'channels.list.whatsApp.templateBuilder.errors.templateTypeIsRequired' },
      { rule: (value) => Object.values(Template.TEMPLATE_TYPE).includes(value), message: 'channels.list.whatsApp.templateBuilder.errors.invalidTemplateType' },
    ],
    header: {
      type: [
        { rule: ValidationRules.required, message: 'channels.list.whatsApp.templateBuilder.errors.headerTypeIsRequired' },
        { rule: (value) => Object.values(Template.HEADER_TYPE).includes(value), message: 'channels.list.whatsApp.templateBuilder.errors.invalidHeaderType' },
      ],
      text: [
        { rule: ValidationRules.maxLength, params: 60, message: 'channels.list.whatsApp.templateBuilder.errors.headerLimit' },
        { rule: ValidationRules.noEmojis, message: 'channels.list.whatsApp.templateBuilder.errors.headerEmoji' },
        { rule: ValidationRules.singleLine, message: 'channels.list.whatsApp.templateBuilder.errors.headerSingleLine' },
      ],
    },
    response: {
      type: [
        { rule: ValidationRules.required, message: 'channels.list.whatsApp.templateBuilder.errors.responseTypeIsRequired' },
        { rule: (value) => Object.values(Template.RESPONSE_TYPE).includes(value), message: 'channels.list.whatsApp.templateBuilder.errors.invalidResponseType' },
      ],
      choices: {
        _array: {
          maxLength: { value: 10, message: 'channels.list.whatsApp.templateBuilder.errors.choicesLimit' },
        },
        _each: {
          label: [
            { rule: ValidationRules.required, message: 'channels.list.whatsApp.templateBuilder.errors.labelIsRequired' },
            { rule: ValidationRules.maxLength, params: 25, message: 'channels.list.whatsApp.templateBuilder.errors.labelLimit' },
          ],
          type: [
            { rule: ValidationRules.required, message: 'channels.list.whatsApp.templateBuilder.errors.typeIsRequired' },
            { rule: (value) => value === Template.BUTTON_TYPE.QUICK_REPLY, message: 'channels.list.whatsApp.templateBuilder.errors.invalidTypeForChoice' },
          ],
        },
      },
      urlChoices: {
        _array: {
          maxLength: { value: 2, message: 'channels.list.whatsApp.templateBuilder.errors.urlChoicesLimit' },
        },
        _each: {
          label: [
            { rule: ValidationRules.required, message: 'channels.list.whatsApp.templateBuilder.errors.labelIsRequired' },
            { rule: ValidationRules.maxLength, params: 25, message: 'channels.list.whatsApp.templateBuilder.errors.labelLimit' },
          ],
          type: [
            { rule: ValidationRules.required, message: 'channels.list.whatsApp.templateBuilder.errors.typeIsRequired' },
            { rule: (value) => value === Template.BUTTON_TYPE.URL, message: 'channels.list.whatsApp.templateBuilder.errors.invalidTypeForURLChoice' },
          ],
          url: [
            { rule: ValidationRules.required, message: 'channels.list.whatsApp.templateBuilder.errors.urlIsRequired' },
            { rule: ValidationRules.validURL, message: 'channels.list.whatsApp.templateBuilder.errors.invalidURLFormat' },
          ],
        },
      },
    },
    body: [
      { rule: ValidationRules.required, message: 'channels.list.whatsApp.templateBuilder.errors.bodyIsRequired' },
      { rule: ValidationRules.maxLength, params: 1024, message: 'channels.list.whatsApp.templateBuilder.errors.bodyLimit' },
    ],
    footer: [
      { rule: ValidationRules.maxLength, params: 60, message: 'channels.list.whatsApp.templateBuilder.errors.footerLimit' },
    ],
  };
})();
