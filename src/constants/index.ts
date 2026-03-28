export * from './routes'

export const USER_ROLES = {
  ROLE_ADMIN: 'ROLE_ADMIN',
  ROLE_USER: 'ROLE_USER',
} as const

// SEO Meta Constants
export const PAGE_KEYS = {
  HOME: 'HOME',
  // ABOUT: 'ABOUT',
  EVENTS: 'EVENTS',
  SOUND_LIGHT: 'SOUND_LIGHT',
  RENTAL: 'RENTAL',
  NEWS: 'NEWS',
  CONTACT: 'CONTACT',
  POST_DETAIL: 'POST_DETAIL',
  PRODUCT_DETAIL: 'PRODUCT_DETAIL',
} as const;

export const LIMIT_OPTIONS = [10, 20, 50, 100]

export const TOAST_GROUP = 'MODAL_TOAST_GROUP'