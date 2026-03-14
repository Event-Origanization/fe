import { defineStore } from 'pinia';
import { SeoService } from '@/services/seo.service';
import type { ISeoMeta, SeoMetaUpdatePayload } from '@/types/seo';
import i18n from '@/config/i18n';
import { ResponseError } from '@/utils/error';

export const useSeoStore = defineStore('seo', {
  state: () => ({
    seoMetas: [] as ISeoMeta[],
    isLoading: false,
    error: null as string | null,
    currentSeo: null as ISeoMeta | null,
  }),

  actions: {
    async fetchAllSeoMeta() {
      this.isLoading = true;
      try {
        const response = await SeoService.getAllSeoMeta();
        
        if (response instanceof ResponseError) throw response

        if (!(response instanceof ResponseError)) {
          this.seoMetas = response.data;
        }
      } catch (err) {
        this.error = err instanceof ResponseError ? err.message : 'An unexpected error occurred'
      } finally {
        this.isLoading = false;
      }
    },

    async updateSeoMeta(pageKey: string, payload: SeoMetaUpdatePayload) {
      this.isLoading = true;
      this.error = null;
      try {
        const response = await SeoService.updateSeoMeta(pageKey, payload);

        if (response instanceof ResponseError) throw response

        if (!(response instanceof ResponseError)) {
          // Update local state
          const index = this.seoMetas.findIndex(m => m.pageKey === pageKey);
          if (index !== -1) {
            this.seoMetas[index] = response.data;
          } else {
            this.seoMetas.push(response.data);
          }
          return response.data;
        }
        throw response;
      } catch (err) {
        this.error = err instanceof ResponseError ? err.message : 'An unexpected error occurred'
        return false;
      } finally {
        this.isLoading = false;
      }
    },

    getSeoMetaByPage(pageKey: string): ISeoMeta | undefined {
      const normalizedKey = pageKey.toUpperCase();
      return this.seoMetas.find((meta) => meta.pageKey.toUpperCase() === normalizedKey);
    },

    updateSeoTags(pageKey: string): boolean {
      if (!pageKey) return false;
      const seoMeta = this.getSeoMetaByPage(pageKey);
      if (seoMeta) {
        const locale = i18n.global.locale.value || 'vi';
        
        // Update Title
        const title = seoMeta[`title_${locale}` as keyof ISeoMeta] as string;
        if (title) {
          document.title = title;
        }

        // Update Description
        const description = seoMeta[`description_${locale}` as keyof ISeoMeta] as string;
        if (description) {
          const metaDescription = document.querySelector('meta[name="description"]');
          if (metaDescription) {
            metaDescription.setAttribute('content', description);
          }
        }
        return true;
      }
      return false;
    }
  },
});
