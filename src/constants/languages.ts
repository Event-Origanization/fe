export const LANGUAGES = [
  { code: 'vi', name: 'VN', flag: 'https://flagcdn.com/w20/vn.png' },
  { code: 'en', name: 'EN', flag: 'https://flagcdn.com/w20/us.png' },
  { code: 'zh', name: 'ZH', flag: 'https://flagcdn.com/w20/cn.png' },
] as const

export type LanguageCode = typeof LANGUAGES[number]['code']
