export interface IContactMessage {
  id: number;
  name: string;
  email: string;
  phone: string;
  message: string;
  isRead: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ContactMessageCreationAttributes {
  name: string;
  email: string;
  phone?: string;
  message: string;
}

export interface ContactMessageQuery {
  page?: number;
  limit?: number;
  search?: string;
  isRead?: boolean;
  sortBy?: string;
  sortOrder?: 'ASC' | 'DESC';
}

export interface ContactMessageListResponse {
  total: number;
  totalPages: number;
  currentPage: number;
  contactMessages: IContactMessage[];
}
