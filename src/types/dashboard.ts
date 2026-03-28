export interface DashboardProduct {
  id: number;
  name_vi: string;
  price: number;
  slug: string;
  isActive: boolean;
  createdAt: string;
}

export interface DashboardContactMessage {
  id: number;
  name: string;
  email: string;
  isRead: boolean;
  createdAt: string;
}

export interface DashboardOverview {
  products: number;
  posts: number;
  highlightVideos: number;
  contactMessages: number;
  productStats: {
    active: number;
    inactive: number;
  };
  postStats: {
    published: number;
    draft: number;
    scheduled: number;
  };
  recentProducts: DashboardProduct[];
  recentContactMessages: DashboardContactMessage[];
}

export interface ChartSeriesData {
  name: string;
  data: number[];
}

export interface DashboardYearlyCharts {
  barChart: {
    products: number[];
    posts: number[];
  };
  lineChart: {
    contactMessages: number[];
  };
}
