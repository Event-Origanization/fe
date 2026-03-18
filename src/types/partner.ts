export interface IPartner {
  id: number;
  name: string;
  logo: string | null;
  orderIndex: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface PartnerCreationAttributes {
  name: string;
  logo?: string | null;
  orderIndex?: number;
  isActive?: boolean;
}

export interface PartnerQuery {
  page?: number;
  limit?: number;
  search?: string;
  isActive?: boolean;
  sortBy?: string;
  sortOrder?: 'ASC' | 'DESC';
}

export interface PartnerListResponse {
  total: number;
  totalPages: number;
  currentPage: number;
  partners: IPartner[];
}
