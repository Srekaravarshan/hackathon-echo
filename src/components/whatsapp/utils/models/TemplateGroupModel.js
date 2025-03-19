import { Template, TemplateLanguage, TemplateValidationSchema } from './TemplateModel';
import { ValidationRules } from '../validations';


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

export const TemplateGroupValidationSchema = {
  name: [
    { rule: ValidationRules.required, message: 'channels.list.whatsApp.templateBuilder.errors.nameIsRequired' },
    { rule: ValidationRules.maxLength, params: 60, message: 'channels.list.whatsApp.templateBuilder.errors.nameLimit' },
    { rule: ValidationRules.nameFormat, message: 'channels.list.whatsApp.templateBuilder.errors.nameAllowedChars' },
  ],
  templates: {
    _array: {
      minLength: { value: 1, message: 'channels.list.whatsApp.templateBuilder.errors.templateLimit' },
    },
    _each: TemplateValidationSchema,
  },
  headerType: {
    type: [
      { rule: ValidationRules.required, message: 'channels.list.whatsApp.templateBuilder.errors.headerTypeIsRequired' },
      { rule: (value) => Object.values(Template.HEADER_TYPE).includes(value), message: 'channels.list.whatsApp.templateBuilder.errors.invalidHeaderType' },
    ],
    mediaType: [
      { rule: (value) => !value || Object.values(Template.MEDIA_TYPE).includes(value), message: 'channels.list.whatsApp.templateBuilder.errors.invalidMediaType' },
    ],
  },
  defaultLanguage: {
    code: [
      { rule: ValidationRules.required, message: 'channels.list.whatsApp.templateBuilder.errors.languageCodeIsRequired' },
      { rule: (value) => languages.some(lang => lang.code === value), message: 'channels.list.whatsApp.templateBuilder.errors.invalidLanguageCode' },
    ],
  },
};

export class TemplateGroup {
  constructor({
    id = null, name = '', templates = [Template.getInitialTemplate()], headerType = new TemplateGroupHeaderType(), defaultLanguage = new TemplateLanguage(),
  } = {}) {
    this.id = id;
    this.name = name;
    this.templates = templates;
    this.headerType = headerType;
    this.defaultLanguage = defaultLanguage;
  }

  static fromDBJSON(json) {
    const templateGroup = new TemplateGroup({
      id: json.id,
      name: json.name,
      headerType: TemplateGroupHeaderType.fromDBJSON(json.type),
      templates: [Template.fromDBJSON(json), ...json.subTemplates.map(template => Template.fromDBJSON(template))],
      defaultLanguage: TemplateLanguage.fromCode(json?.properties?.languages ? Object.keys(json?.properties?.languages)?.[0] : 'en')
    });
    return templateGroup;
  }
  static fromDBJSONAfterPublish(templatesJSON) {
    const templateGroup = new TemplateGroup({
      id: templatesJSON.id,
      name: templatesJSON.name,
      headerType: TemplateGroupHeaderType.fromDBJSON(templatesJSON.type),
      templates: templatesJSON.subTemplates.map(template => Template.fromDBJSON(template)),
      defaultLanguage: TemplateLanguage.fromCode(Object.keys(templatesJSON?.properties?.languages)?.[0] ?? 'en')
    });
    return templateGroup;
  }

  static toDBJSON(templateGroup) {
    return {
      templates: templateGroup.templates.map(template => (Template.toDBJSON(template))),
    };
  }
  
  // to map function
  static fromJSON(json) {
    const templateGroup = new TemplateGroup({
      id: json.id,
      name: json.name,
      headerType: new TemplateGroupHeaderType(json.headerType),
      templates: json.templates.map(template => new Template(template)),
      defaultLanguage: new TemplateLanguage(json.defaultLanguage),
    });
    return templateGroup;
  }

  // recursively to json all the way down
  toJSON() {
    return {
      id: this.id,
      name: this.name,
      headerType: this.headerType.toJSON(),
      templates: this.templates.map(template => template.toJSON()),
      defaultLanguage: this.defaultLanguage.toJSON(),
    };
  }

  static getInitialTemplateGroup() {
    return new TemplateGroup();
  }
}

export class TemplateGroupHeaderType {
  constructor({ type = Template.HEADER_TYPE.TEXT, mediaType = Template.MEDIA_TYPE.IMAGE } = {}) {
    this.type = type;
    this.mediaType = mediaType;
  }

  static fromDBJSON(type) {
    if (type === Template.HEADER_TYPE.TEXT) {
      return new TemplateGroupHeaderType({ type: Template.HEADER_TYPE.TEXT });
    } else {
      return new TemplateGroupHeaderType({ type: Template.HEADER_TYPE.MEDIA, mediaType: type });
    }
  }

  toJSON() {
    return {
      type: this.type,
      mediaType: this.mediaType,
    };
  }
}