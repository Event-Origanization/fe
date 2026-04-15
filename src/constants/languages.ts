export const LANGUAGES = [
  { code: 'vi', name: 'VN', flag: 'https://flagcdn.com/w20/vn.png' },
  { code: 'en', name: 'EN', flag: 'https://flagcdn.com/w20/gb.png' },
  { code: 'zh', name: 'CN', flag: 'https://flagcdn.com/w20/cn.png' },
] as const

export type LanguageCode = typeof LANGUAGES[number]['code']
