export type ConfigGroup = 'GENERAL' | 'CONTACT' | 'SOCIAL' | 'MENU' | 'STATISTICS';

export interface IWebsiteConfig {
  id: number;
  key: string;
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
    key: string;
    value_vi?: string;
    value_en?: string;
    value_zh?: string;
  }[];
}
