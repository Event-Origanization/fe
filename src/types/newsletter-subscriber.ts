export interface INewsletterSubscriber {
    id: number
    email: string
    isActive: boolean
    createdAt: string
    updatedAt: string
}

export interface NewsletterSubscriberQuery {
    page?: number
    limit?: number
    search?: string
    isActive?: boolean
    sortBy?: string
    sortOrder?: 'ASC' | 'DESC'
}

export interface NewsletterSubscriberListResponse {
    subscribers: INewsletterSubscriber[]
    total: number
    totalPages: number
    currentPage: number
}
