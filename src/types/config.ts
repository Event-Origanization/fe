export type ConfigGroup = 'GENERAL' | 'CONTACT' | 'SOCIAL' | 'MENU' | 'STATISTICS';

export type ConfigKey = 
  | 'WEBSITE_NAME' | 'WEBSITE_FULLNAME' | 'WEBSITE_SLOGAN' | 'SYSTEM_FONT' | 'WEBSITE_LOGO' | 'WEBSITE_FAVICON'
  | 'CONTACT_HOTLINE' | 'CONTACT_EMAIL' | 'CONTACT_ADDRESS' | 'CONTACT_MAP_IFRAME'
  | 'SOCIAL_FACEBOOK' | 'SOCIAL_ZALO' | 'SOCIAL_YOUTUBE'
  | 'MENU_HOME' | 'MENU_EVENTS' | 'MENU_SOUND_LIGHT' | 'MENU_RENTAL' | 'MENU_RENTAL_EVENT' | 'MENU_NEWS' | 'MENU_CONTACT'
  | 'STATS_FIELDS' | 'STATS_EVENTS' | 'STATS_BRANDS';

export interface IWebsiteConfig {
  id: number;
  key: ConfigKey | string;
  group: ConfigGroup;
  value_vi: string;
  value_en: string;
  value_zh: string;
  createdAt: string;
  updatedAt: string;
}

export interface WebsiteConfigUpdatePayload {
  value_vi?: string;
  value_en?: string;
  value_zh?: string;
  group?: ConfigGroup;
}

export interface BulkUpdateConfigsPayload {
  configs: {
    key: ConfigKey | string;
    value_vi?: string;
    value_en?: string;
    value_zh?: string;
  }[];
}
