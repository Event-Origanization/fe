import { createI18n } from 'vue-i18n'
import vi from '@/locales/vi.json'
import en from '@/locales/en.json'
import cn from '@/locales/cn.json'

export type SupportedLocale = 'vi' | 'en' | 'cn'

const LOCALE_KEY = 'app_locale'

const savedLocale = (localStorage.getItem(LOCALE_KEY) as SupportedLocale) || 'vi'

export const i18n = createI18n({
  legacy: false,
  locale: savedLocale,
  fallbackLocale: 'vi',
  messages: {
    vi,
    en,
    cn,
  },
})

/** Đổi ngôn ngữ và lưu vào localStorage */
export function setLocale(locale: SupportedLocale) {
  i18n.global.locale.value = locale
  localStorage.setItem(LOCALE_KEY, locale)
  document.documentElement.lang = locale
}

export default i18n
