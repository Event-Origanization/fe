export interface IHomeVideo {
    id: number
    title_vi: string
    title_en: string
    title_zh: string
    url: string | null
    thumbnail: string | null
    isActive: boolean
    createdAt: string
    updatedAt: string
}

export interface HomeVideoCreationAttributes {
    title_vi: string
    title_en?: string
    title_zh?: string
    url?: string | null
    thumbnail?: string | null
    isActive?: boolean
    translateTitle?: boolean
}

export interface HomeVideoQuery {
    page?: number
    limit?: number
    search?: string
    isActive?: boolean
    sortBy?: string
    sortOrder?: 'ASC' | 'DESC'
}

export interface HomeVideoListResponse {
    videos: IHomeVideo[]
    total: number
    totalPages: number
    currentPage: number
}
