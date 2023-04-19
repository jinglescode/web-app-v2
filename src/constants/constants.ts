export const SocialCauses = {
  SOCIAL: 'SOCIAL',
  POVERTY: 'POVERTY',
  HOMELESSNESS: 'HOMELESSNESS',
  HUNGER: 'HUNGER',
  HEALTH: 'HEALTH',
  SUBSTANCE_ABUSE: 'SUBSTANCE_ABUSE',
  MENTAL: 'MENTAL',
  BULLYING: 'BULLYING',
  SECURITY: 'SECURITY',
  EDUCATION: 'EDUCATION',
  GENDER_EQUALITY: 'GENDER_EQUALITY',
  GENDER_BASED_VIOLENCE: 'GENDER_BASED_VIOLENCE',
  SEXUAL_VIOLENCE: 'SEXUAL_VIOLENCE',
  DOMESTIC_VIOLENCE: 'DOMESTIC_VIOLENCE',
  WATER_SANITATION: 'WATER_SANITATION',
  SUSTAINABLE_ENERGY: 'SUSTAINABLE_ENERGY',
  DECENT_WORK: 'DECENT_WORK',
  INEQUALITY: 'INEQUALITY',
  MINORITY: 'MINORITY',
  MULTICULTURALISM: 'MULTICULTURALISM',
  DIVERSITY_INCLUSION: 'DIVERSITY_INCLUSION',
  INDIGENOUS_PEOPLES: 'INDIGENOUS_PEOPLES',
  DISABILITY: 'DISABILITY',
  LGBTQI: 'LGBTQI',
  REFUGEE: 'REFUGEE',
  MIGRANTS: 'MIGRANTS',
  ORPHANS: 'ORPHANS',
  CHILD_PROTECTION: 'CHILD_PROTECTION',
  COMMUNITY_DEVELOPMENT: 'COMMUNITY_DEVELOPMENT',
  DEPOPULATION: 'DEPOPULATION',
  OVERPOPULATION: 'OVERPOPULATION',
  HUMAN_RIGHTS: 'HUMAN_RIGHTS',
  SUSTAINABILITY: 'SUSTAINABILITY',
  RESPONSIBLE_CONSUMPTION: 'RESPONSIBLE_CONSUMPTION',
  CLIMATE_CHANGE: 'CLIMATE_CHANGE',
  NATURAL_DISASTERS: 'NATURAL_DISASTERS',
  BIODIVERSITY: 'BIODIVERSITY',
  ANIMAL_RIGHTS: 'ANIMAL_RIGHTS',
  ARMED_CONFLICT: 'ARMED_CONFLICT',
  PEACEBUILDING: 'PEACEBUILDING',
  DEMOCRACY: 'DEMOCRACY',
  CIVIC_ENGAGEMENT: 'CIVIC_ENGAGEMENT',
  JUSTICE: 'JUSTICE',
  GOVERNANCE: 'GOVERNANCE',
  CRIME_PREVENTION: 'CRIME_PREVENTION',
  CORRUPTION: 'CORRUPTION',
  OTHER: 'OTHER',
  RURAL_DEVELOPMENT: 'RURAL_DEVELOPMENT',
  VEGANISM: 'VEGANISM',
  BLACK_LIVES_MATTER: 'BLACK_LIVES_MATTER',
  ISLAMOPHOBIA: 'ISLAMOPHOBIA',
  ANTI_SEMITISM: 'ANTI_SEMITISM',
  ABORTION: 'ABORTION',
  EUTHANASIA: 'EUTHANASIA',
  NEURODIVERSITY: 'NEURODIVERSITY',
  SUSTAINABLE_COMMUNITIES: 'SUSTAINABLE_COMMUNITIES',
  BIODIVERSITY_LIFE_BELOW_WATER: 'BIODIVERSITY_LIFE_BELOW_WATER',
  PEACE_JUSTICE: 'PEACE_JUSTICE',
  COLLABORATION_FOR_IMPACT: 'COLLABORATION_FOR_IMPACT',
  INNOVATION: 'INNOVATION',
};

export const SDG = {
  HEALTH: 'HEALTH',
  LIFE: 'LIFE',
  REDUCED_INEQUALITIES: 'REDUCED_INEQUALITIES',
  PEACE_JUSTICE: 'PEACE_JUSTICE',
  SUSTAINABLE_CITIES_COMMUNITIES: 'SUSTAINABLE_CITIES_COMMUNITIES',
  GENDER_EQUALITY: 'GENDER_EQUALITY',
  CLIMATE_ACTION: 'CLIMATE_ACTION',
  NO_POVERTY: 'NO_POVERTY',
  LIFE_BELOW_WATER: 'LIFE_BELOW_WATER',
  GOALS_PARTNERSHIPS: 'GOALS_PARTNERSHIPS',
  ZERO_HUNGER: 'ZERO_HUNGER',
  EDUCATION_QUALITY: 'EDUCATION_QUALITY',
  CLEAN_WATER_SANITATION: 'CLEAN_WATER_SANITATION',
  ENERGY: 'ENERGY',
  ECONOMIC_GROWTH: 'ECONOMIC_GROWTH',
  INDUSTRY_INNOVATION_INFRASTRUCTURE: 'INDUSTRY_INNOVATION_INFRASTRUCTURE',
  RESPONSIBLE_CONSUMPTION_PRODUCTION: 'RESPONSIBLE_CONSUMPTION_PRODUCTION',
  OTHER: 'OTHER',
};

type Badges = { value: string; label: string; color: string };
export const BADGES: Record<string, Badges> = {
  HEALTH: { value: 'HEALTH', label: 'Health', color: '#459C49' },
  LIFE: { value: 'LIFE', label: 'Life', color: '#56C02B' },
  REDUCED_INEQUALITIES: {
    value: 'REDUCED_INEQUALITIES',
    label: 'Reduced Inequalities',
    color: '#DD1367',
  },
  PEACE_JUSTICE: { value: 'PEACE_JUSTICE', label: 'Peace Justice', color: '#56C02B' },
  SUSTAINABLE_CITIES_COMMUNITIES: {
    value: 'SUSTAINABLE_CITIES_COMMUNITIES',
    label: 'Sustainable Cities & Communities',
    color: '#FD9D24',
  },
  INDUSTRY_INNOVATION_INFRASTRUCTURE: {
    value: 'INDUSTRY_INNOVATION_INFRASTRUCTURE',
    label: 'Industry, Innovation & Infrastructure',
    color: 'black',
  },
  RESPONSIBLE_CONSUMPTION_PRODUCTION: {
    value: 'RESPONSIBLE_CONSUMPTION_PRODUCTION',
    label: 'Responsible Consumption & Production',
    color: '#BF8B2E',
  },
  GENDER_EQUALITY: { value: 'GENDER_EQUALITY', label: 'Gender Equality', color: '#EA3F2A' },
  CLIMATE_ACTION: { value: 'CLIMATE_ACTION', label: 'Climate Action', color: '#3F7E44' },
  NO_POVERTY: { value: 'NO_POVERTY', label: 'No Poverty', color: 'black' },
  LIFE_BELOW_WATER: { value: 'LIFE_BELOW_WATER', label: 'Life Below Water', color: '#0A97D9' },
  GOALS_PARTNERSHIPS: { value: 'GOALS_PARTNERSHIPS', label: 'Goals Partnerships', color: 'black' },
  ZERO_HUNGER: { value: 'ZERO_HUNGER', label: 'Zero Hunger', color: 'black' },
  EDUCATION_QUALITY: { value: 'EDUCATION_QUALITY', label: 'Education Quality', color: 'black' },
  CLEAN_WATER_SANITATION: {
    value: 'CLEAN_WATER_SANITATION',
    label: 'Clean Water & Sanitation',
    color: '#26BDE2',
  },
  ENERGY: { value: 'ENERGY', label: 'Energy', color: 'black' },
  ECONOMIC_GROWTH: { value: 'ECONOMIC_GROWTH', label: 'Economic Growth', color: 'black' },
  //   OTHER: { value: 'OTHER', label: 'Other', color: 'black' },
};

export const SocialCausesSDGMapping = {
  SOCIAL: SDG.REDUCED_INEQUALITIES,
  POVERTY: SDG.NO_POVERTY,
  HOMELESSNESS: SDG.REDUCED_INEQUALITIES,
  HUNGER: SDG.ZERO_HUNGER,
  HEALTH: SDG.HEALTH,
  SUBSTANCE_ABUSE: SDG.HEALTH,
  MENTAL: SDG.HEALTH,
  BULLYING: SDG.HEALTH,
  SECURITY: SDG.PEACE_JUSTICE,
  EDUCATION: SDG.EDUCATION_QUALITY,
  GENDER_EQUALITY: SDG.GENDER_EQUALITY,
  GENDER_BASED_VIOLENCE: SDG.GENDER_EQUALITY,
  SEXUAL_VIOLENCE: SDG.GENDER_EQUALITY,
  DOMESTIC_VIOLENCE: SDG.GENDER_EQUALITY,
  WATER_SANITATION: SDG.LIFE_BELOW_WATER,
  SUSTAINABLE_ENERGY: SDG.ENERGY,
  //   DECENT_WORK: SDG.DECENT_WORK,
  INEQUALITY: SDG.REDUCED_INEQUALITIES,
  MINORITY: SDG.REDUCED_INEQUALITIES,
  MULTICULTURALISM: SDG.REDUCED_INEQUALITIES,
  DIVERSITY_INCLUSION: SDG.REDUCED_INEQUALITIES,
  INDIGENOUS_PEOPLES: SDG.REDUCED_INEQUALITIES,
  DISABILITY: SDG.REDUCED_INEQUALITIES,
  LGBTQI: SDG.REDUCED_INEQUALITIES,
  REFUGEE: SDG.REDUCED_INEQUALITIES,
  MIGRANTS: SDG.REDUCED_INEQUALITIES,
  ORPHANS: SDG.REDUCED_INEQUALITIES,
  CHILD_PROTECTION: SDG.REDUCED_INEQUALITIES,
  COMMUNITY_DEVELOPMENT: SDG.SUSTAINABLE_CITIES_COMMUNITIES,
  DEPOPULATION: SDG.SUSTAINABLE_CITIES_COMMUNITIES,
  OVERPOPULATION: SDG.SUSTAINABLE_CITIES_COMMUNITIES,
  HUMAN_RIGHTS: SDG.REDUCED_INEQUALITIES,
  SUSTAINABILITY: SDG.SUSTAINABLE_CITIES_COMMUNITIES,
  RESPONSIBLE_CONSUMPTION: SDG.RESPONSIBLE_CONSUMPTION_PRODUCTION,
  CLIMATE_CHANGE: SDG.CLIMATE_ACTION,
  NATURAL_DISASTERS: SDG.CLIMATE_ACTION,
  BIODIVERSITY: SDG.REDUCED_INEQUALITIES,
  ANIMAL_RIGHTS: SDG.LIFE,
  ARMED_CONFLICT: SDG.PEACE_JUSTICE,
  PEACEBUILDING: SDG.PEACE_JUSTICE,
  DEMOCRACY: SDG.PEACE_JUSTICE,
  CIVIC_ENGAGEMENT: SDG.PEACE_JUSTICE,
  JUSTICE: SDG.PEACE_JUSTICE,
  GOVERNANCE: SDG.PEACE_JUSTICE,
  CRIME_PREVENTION: SDG.PEACE_JUSTICE,
  CORRUPTION: SDG.PEACE_JUSTICE,
  OTHER: SDG.OTHER,
  RURAL_DEVELOPMENT: SDG.SUSTAINABLE_CITIES_COMMUNITIES,
  VEGANISM: SDG.RESPONSIBLE_CONSUMPTION_PRODUCTION,
  BLACK_LIVES_MATTER: SDG.REDUCED_INEQUALITIES,
  ISLAMOPHOBIA: SDG.REDUCED_INEQUALITIES,
  ANTI_SEMITISM: SDG.REDUCED_INEQUALITIES,
  ABORTION: SDG.HEALTH,
  EUTHANASIA: SDG.HEALTH,
  NEURODIVERSITY: SDG.REDUCED_INEQUALITIES,
  SUSTAINABLE_COMMUNITIES: SDG.SUSTAINABLE_CITIES_COMMUNITIES,
  BIODIVERSITY_LIFE_BELOW_WATER: SDG.LIFE_BELOW_WATER,
  PEACE_JUSTICE: SDG.PEACE_JUSTICE,
  COLLABORATION_FOR_IMPACT: SDG.GOALS_PARTNERSHIPS,
  INNOVATION: SDG.INDUSTRY_INNOVATION_INFRASTRUCTURE,
};

export const APPLICANT_STATUS = {
  PENDING: 'PENDING',
  OFFERED: 'OFFERED',
  REJECTED: 'REJECTED',
  WITHRAWN: 'WITHDRAWN',
  APPROVED: 'APPROVED',
  HIRED: 'HIRED',
};

export const UserStatusType = {
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE',
  SUSPEND: 'SUSPEND',
};

export const ProjectLengthType = {
  LESS_THAN_A_DAY: 'LESS_THAN_A_DAY',
  LESS_THAN_A_MONTH: 'LESS_THAN_A_MONTH',
  ONE_THREE_MONTHS: '1_3_MONTHS',
  THREE_SIX_MONTHS: '3_6_MONTHS',
  SIX_MONTHS_OR_MORE: '6_MONTHS_OR_MORE',
};

export const ProjectType = {
  ONE_OFF: 'ONE_OFF',
  PART_TIME: 'PART_TIME',
  FULL_TIME: 'FULL_TIME',
};

export const ProjectRemotePreferenceType = {
  ONSITE: 'ONSITE',
  REMOTE: 'REMOTE',
  HYBRID: 'HYBRID',
};

export const ProjectStatusType = {
  DRAFT: 'DRAFT',
  EXPIRE: 'EXPIRE',
  ACTIVE: 'ACTIVE',
};

export const ProjectPaymentType = {
  VOLUNTEER: 'VOLUNTEER',
  PAID: 'PAID',
};

export const ProjectPaymentSchemeType = {
  HOURLY: 'HOURLY',
  FIXED: 'FIXED',
};

export const OrganizationType = {
  SOCIAL: 'SOCIAL',
  NONPROFIT: 'NONPROFIT',
  COOP: 'COOP',
  IIF: 'IIF',
  PUBLIC: 'PUBLIC',
  INTERGOV: 'INTERGOV',
  DEPARTMENT: 'DEPARTMENT',
  OTHER: 'OTHER',
};

export const NotificationType = {
  FOLLOWED: 'FOLLOWED',
  COMMENT_LIKE: 'COMMENT_LIKE',
  POST_LIKE: 'POST_LIKE',
  CHAT: 'CHAT',
  SHARE_POST: 'SHARE_POST',
  SHARE_PROJECT: 'SHARE_PROJECT',
  COMMENT: 'COMMENT',
  APPLICATION: 'APPLICATION',
  OFFER: 'OFFER',
  REJECT: 'REJECT',
  APPROVED: 'APPROVED',
  HIRED: 'HIRED',
  PROJECT_COMPLETE: 'PROJECT_COMPLETE',
  ASSIGNEE_CANCELED: 'ASSIGNEE_CANCELED',
  ASSIGNER_CANCELED: 'ASSIGNER_CANCELED',
  ASSIGNER_CONFIRMED: 'ASSIGNER_CONFIRMED',
  CONNECT: 'CONNECT',
  ACCEPT_CONNECT: 'ACCEPT_CONNECT',
  MEMBERED: 'MEMBERED',
};

export const NotificationTitle = {
  FOLLOWED: 'Followed',
  COMMENT_LIKE: 'Comment liked',
  POST_LIKE: 'Post liked',
  CHAT: 'New Message',
  SHARE_POST: 'Post shared',
  SHARE_PROJECT: 'Job shared',
  COMMENT: 'New commented',
  APPLICATION: 'Job applied',
  OFFER: 'Have an offer',
  REJECT: 'Applicantion updated',
  APPROVED: 'Offer approved',
  HIRED: 'Hired',
  PROJECT_COMPLETE: 'Job done',
  ASSIGNEE_CANCELED: 'Left the job',
  ASSIGNER_CANCELED: 'Canceled the job',
  ASSIGNER_CONFIRMED: 'Confirmed work submission',
  CONNECT: 'Connect request',
  ACCEPT_CONNECT: 'Accept connect request',
  MEMBERED: 'Membered',
};

export const IdentityType = {
  ORG: 'organizations',
  USER: 'users',
};

export const ChatType = {
  CHAT: 'CHAT',
  GROUPED: 'GROUPED',
  CHANNEL: 'CHANNEL',
};

export const ChatMemberType = {
  MEMBER: 'MEMBER',
  ADMIN: 'ADMIN',
};

export const SearchType = {
  POSTS: 'posts',
  USERS: 'users',
  RELATED_USERS: 'related_users',
  PROJECTS: 'projects',
  CHATS: 'chats',
  ORGANIZATIONS: 'organizations',
};

export const MediaContentType = {
  JPEG: 'image/jpeg',
  PNG: 'image/png',
  PDF: 'application/pdf',
  DOC: 'application/msword',
  DOCX: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
};

export const PaymentCurrency = {
  USD: 'USD',
  JPY: 'JPY',
  EUR: 'EUR',
};

export const PaymentService = {
  STRIPE: 'STRIPE',
};

export const Languages = {
  AA: 'Afar',
  AB: 'Abkhazian',
  AE: 'Avestan',
  AF: 'Afrikaans',
  AK: 'Akan',
  AM: 'Amharic',
  AN: 'Aragonese',
  AR: 'Arabic',
  AS: 'Assamese',
  AV: 'Avaric',
  AY: 'Aymara',
  AZ: 'Azerbaijani',
  BA: 'Bashkir',
  BE: 'Belarusian',
  BG: 'Bulgarian',
  BH: 'Bihari languages',
  BI: 'Bislama',
  BM: 'Bambara',
  BN: 'Bengali',
  BO: 'Tibetan',
  BR: 'Breton',
  BS: 'Bosnian',
  CA: 'Catalan',
  CE: 'Chechen',
  CH: 'Chamorro',
  CO: 'Corsican',
  CR: 'Cree',
  CS: 'Czech',
  CU: 'Church Slavic',
  CV: 'Chuvash',
  CY: 'Welsh',
  DA: 'Danish',
  DE: 'German',
  DV: 'Maldivian',
  DZ: 'Dzongkha',
  EE: 'Ewe',
  EL: 'Greek',
  EN: 'English',
  EO: 'Esperanto',
  ES: 'Spanish',
  ET: 'Estonian',
  EU: 'Basque',
  FA: 'Persian',
  FF: 'Fulah',
  FI: 'Finnish',
  FJ: 'Fijian',
  FO: 'Faroese',
  FR: 'French',
  FY: 'Western Frisian',
  GA: 'Irish',
  GD: 'Gaelic',
  GL: 'Galician',
  GN: 'Guarani',
  GU: 'Gujarati',
  GV: 'Manx',
  HA: 'Hausa',
  HE: 'Hebrew',
  HI: 'Hindi',
  HO: 'Hiri Motu',
  HR: 'Croatian',
  HT: 'Haitian',
  HU: 'Hungarian',
  HY: 'Armenian',
  HZ: 'Herero',
  IA: 'Interlingua',
  ID: 'Indonesian',
  IE: 'Interlingue',
  IG: 'Igbo',
  II: 'Sichuan Yi',
  IK: 'Inupiaq',
  IO: 'Ido',
  IS: 'Icelandic',
  IT: 'Italian',
  IU: 'Inuktitut',
  JA: 'Japanese',
  JV: 'Javanese',
  KA: 'Georgian',
  KG: 'Kongo',
  KI: 'Kikuyu',
  KJ: 'Kuanyama',
  KK: 'Kazakh',
  KL: 'Kalaallisut',
  KM: 'Central Khmer',
  KN: 'Kannada',
  KO: 'Korean',
  KR: 'Kanuri',
  KS: 'Kashmiri',
  KU: 'Kurdish',
  KV: 'Komi',
  KW: 'Cornish',
  KY: 'Kirghiz',
  LA: 'Latin',
  LB: 'Luxembourgish',
  LG: 'Ganda',
  LI: 'Limburgan',
  LN: 'Lingala',
  LO: 'Lao',
  LT: 'Lithuanian',
  LU: 'Luba-Katanga',
  LV: 'Latvian',
  MG: 'Malagasy',
  MH: 'Marshallese',
  MI: 'Maori',
  MK: 'Macedonian',
  ML: 'Malayalam',
  MN: 'Mongolian',
  MR: 'Marathi',
  MS: 'Malay',
  MT: 'Maltese',
  MY: 'Burmese',
  NA: 'Nauru',
  NB: 'Norwegian',
  ND: 'North Ndebele',
  NE: 'Nepali',
  NG: 'Ndonga',
  NL: 'Dutch',
  NN: 'Norwegian',
  NO: 'Norwegian',
  NR: 'South Ndebele',
  NV: 'Navajo',
  NY: 'Chichewa',
  OC: 'Occitan',
  OJ: 'Ojibwa',
  OM: 'Oromo',
  OR: 'Oriya',
  OS: 'Ossetic',
  PA: 'Panjabi',
  PI: 'Pali',
  PL: 'Polish',
  PS: 'Pushto',
  PT: 'Portuguese',
  QU: 'Quechua',
  RM: 'Romansh',
  RN: 'Rundi',
  RO: 'Romanian',
  RU: 'Russian',
  RW: 'Kinyarwanda',
  SA: 'Sanskrit',
  SC: 'Sardinian',
  SD: 'Sindhi',
  SE: 'Northern Sami',
  SG: 'Sango',
  SI: 'Sinhala',
  SK: 'Slovak',
  SL: 'Slovenian',
  SM: 'Samoan',
  SN: 'Shona',
  SO: 'Somali',
  SQ: 'Albanian',
  SR: 'Serbian',
  SS: 'Swati',
  ST: 'Sotho, Southern',
  SU: 'Sundanese',
  SV: 'Swedish',
  SW: 'Swahili',
  TA: 'Tamil',
  TE: 'Telugu',
  TG: 'Tajik',
  TH: 'Thai',
  TI: 'Tigrinya',
  TK: 'Turkmen',
  TL: 'Tagalog',
  TN: 'Tswana',
  TO: 'Tonga',
  TR: 'Turkish',
  TS: 'Tsonga',
  TT: 'Tatar',
  TW: 'Twi',
  TY: 'Tahitian',
  UG: 'Uighur',
  UK: 'Ukrainian',
  UR: 'Urdu',
  UZ: 'Uzbek',
  VE: 'Venda',
  VI: 'Vietnamese',
  VO: 'Volapük',
  WA: 'Walloon',
  WO: 'Wolof',
  XH: 'Xhosa',
  YI: 'Yiddish',
  YO: 'Yoruba',
  ZA: 'Zhuang',
  ZH: 'Chinese',
  ZU: 'Zulu',
};

export const LanguageLevel = {
  BASIC: 'BASIC',
  CONVERSANT: 'CONVERSANT',
  PROFICIENT: 'PROFICIENT',
  FLUENT: 'FLUENT',
  NATIVE: 'NATIVE',
};

export const MissionStatus = {
  ACTIVE: 'ACTIVE',
  COMPLETE: 'COMPLETE',
  CONFIRMED: 'CONFIRMED',
  CANCELED: 'CANCELED',
  KICKED_OUT: 'KICKED_OUT',
};

export const OfferStatus = {
  PENDING: 'PENDING',
  WITHDRAWN: 'WITHDRAWN',
  APPROVED: 'APPROVED',
  HIRED: 'HIRED',
  CLOSED: 'CLOSED',
  CANCELED: 'CANCELED',
};

export const OAuthProviders = {
  STRIPE: 'STRIPE',
};

export const NotificationSettings = [
  {
    type: 'FOLLOWED',
    in_app: true,
    email: true,
    push: true,
  },
  {
    type: 'COMMENT_LIKE',
    in_app: true,
    email: true,
    push: true,
  },
  {
    type: 'POST_LIKE',
    in_app: true,
    email: true,
    push: true,
  },
  {
    type: 'CHAT',
    in_app: true,
    email: true,
    push: true,
  },
  {
    type: 'SHARE_POST',
    in_app: true,
    email: true,
    push: true,
  },
  {
    type: 'SHARE_PROJECT',
    in_app: true,
    email: true,
    push: true,
  },
  {
    type: 'COMMENT',
    in_app: true,
    email: true,
    push: true,
  },
  {
    type: 'APPLICATION',
    in_app: true,
    email: true,
    push: true,
  },
  {
    type: 'OFFER',
    in_app: true,
    email: true,
    push: true,
  },
  {
    type: 'REJECT',
    in_app: true,
    email: true,
    push: true,
  },
  {
    type: 'APPROVED',
    in_app: true,
    email: true,
    push: true,
  },
  {
    type: 'HIRED',
    in_app: true,
    email: true,
    push: true,
  },
  {
    type: 'PROJECT_COMPLETE',
    in_app: true,
    email: true,
    push: true,
  },
  {
    type: 'ASSIGNEE_CANCELED',
    in_app: true,
    email: true,
    push: true,
  },
  {
    type: 'ASSIGNER_CANCELED',
    in_app: true,
    email: true,
    push: true,
  },
  {
    type: 'ASSIGNER_CONFIRMED',
    in_app: true,
    email: true,
    push: true,
  },
  {
    type: 'CONNECT',
    in_app: true,
    email: true,
    push: true,
  },
  {
    type: 'ACCEPT_CONNECT',
    in_app: true,
    email: true,
    push: true,
  },
  {
    type: 'MEMBERED',
    in_app: true,
    email: true,
    push: true,
  },
];
