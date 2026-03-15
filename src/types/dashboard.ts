export interface DashboardProduct {
  id: number;
  name_vi: string;
  price: number;
  slug: string;
  isActive: boolean;
  createdAt: string;
}

export interface DashboardSubscriber {
  id: number;
  email: string;
  isActive: boolean;
  createdAt: string;
}

export interface DashboardOverview {
  products: number;
  posts: number;
  highlightVideos: number;
  subscribers: number;
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
  recentSubscribers: DashboardSubscriber[];
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
    subscribers: number[];
  };
}
