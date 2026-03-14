export interface ISeoMeta {
  id: number;
  pageKey: string;
  title_vi: string;
  title_en: string;
  title_zh: string;
  description_vi: string;
  description_en: string;
  description_zh: string;
  path: string;
  createdAt?: string;
  updatedAt?: string;
}

export type SeoMetaUpdatePayload = Partial<Omit<ISeoMeta, 'id' | 'pageKey' | 'createdAt' | 'updatedAt'>>;
