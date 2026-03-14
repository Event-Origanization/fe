import { defineStore } from 'pinia';
import { ConfigService } from '@/services/config.service';
import type { IWebsiteConfig, ConfigGroup } from '@/types/config';
import { ResponseError } from '@/utils/error';

import { i18n } from '@/config/i18n';

interface ConfigDictionary {
  [group: string]: {
    [key: string]: {
      vi: string;
      en: string;
      zh: string;
    };
  };
}

export const useConfigStore = defineStore('config', {
  state: () => ({
    allConfigs: [] as IWebsiteConfig[],
    mappedConfigs: {} as ConfigDictionary,
    loading: false,
    error: null as string | null,
  }),

  getters: {
    getGroupConfigs: (state) => (group: ConfigGroup) => {
      return state.allConfigs.filter(c => c.group === group);
    },
    getConfigValue: (state) => (group: string, key: string, defaultValue = '') => {
      const config = state.mappedConfigs[group]?.[key];
      if (!config) return defaultValue;
      
      const locale = i18n.global.locale.value || 'vi';
      return config[locale as keyof typeof config] || config.vi || defaultValue;
    }
  },

  actions: {
    async fetchAllConfigs() {
      this.loading = true;
      this.error = null;
      try {
        const response = await ConfigService.getAllConfigs();
        if (!(response instanceof ResponseError)) {
          this.allConfigs = response.data;
          this.transformConfigs(response.data);
        } else {
          this.error = response.message;
        }
      } catch (err) {
        this.error = err instanceof Error ? err.message : 'Lỗi không xác định khi tải cấu hình';
      } finally {
        this.loading = false;
      }
    },

    transformConfigs(configs: IWebsiteConfig[]) {
      const mapped: ConfigDictionary = {};
      
      configs.forEach(config => {
        if (!mapped[config.group]) {
          mapped[config.group] = {};
        }
        
        mapped[config.group][config.key] = {
          vi: config.value_vi,
          en: config.value_en,
          zh: config.value_zh
        }; 
      });
      
      this.mappedConfigs = mapped;
    },

    async updateConfig(key: string, value_vi: string, value_en: string, value_zh: string) {
      this.loading = true;
      this.error = null;
      try {
        const response = await ConfigService.updateConfig(key, { value_vi, value_en, value_zh });
        if (!(response instanceof ResponseError)) {
          const index = this.allConfigs.findIndex(c => c.key === key);
          if (index !== -1) {
            this.allConfigs[index] = response.data;
            this.transformConfigs(this.allConfigs);
          }
          return true;
        }
        this.error = response.message;
        return false;
      } catch (err) {
        this.error = err instanceof Error ? err.message : 'Lỗi không xác định khi cập nhật cấu hình';
        return false;
      } finally {
        this.loading = false;
      }
    }
  }
});
