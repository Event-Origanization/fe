import { createI18n } from 'vue-i18n'
import vi from '@/locales/vi.json'
import en from '@/locales/en.json'
import zh from '@/locales/zh.json'

export type SupportedLocale = 'vi' | 'en' | 'zh'

const LOCALE_KEY = 'app_locale'

const savedLocale = (localStorage.getItem(LOCALE_KEY) as SupportedLocale) || 'vi'

export const i18n = createI18n({
  legacy: false,
  locale: savedLocale,
  fallbackLocale: 'vi',
  messages: {
    vi,
    en,
    zh,
  },
})

/** Đổi ngôn ngữ và lưu vào localStorage */
export function setLocale(locale: SupportedLocale) {
  i18n.global.locale.value = locale
  localStorage.setItem(LOCALE_KEY, locale)
  document.documentElement.lang = locale
}

export default i18n
