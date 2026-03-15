import { apiService, type ApiResponse } from '@/lib/http';
import type { DashboardOverview, DashboardYearlyCharts } from '@/types/dashboard';
import type { ResponseError } from '@/utils/error';
import { API_ROUTES } from '@/constants';

export interface IDashboardService {
  getOverview: () => Promise<ApiResponse<DashboardOverview> | ResponseError>;
  getYearlyCharts: () => Promise<ApiResponse<DashboardYearlyCharts> | ResponseError>;
}

class DashboardService implements IDashboardService {
  getOverview(): Promise<ApiResponse<DashboardOverview> | ResponseError> {
    return apiService(API_ROUTES.DASHBOARD.OVERVIEW).get<DashboardOverview>();
  }

  getYearlyCharts(): Promise<ApiResponse<DashboardYearlyCharts> | ResponseError> {
    return apiService(API_ROUTES.DASHBOARD.YEARLY_CHARTS).get<DashboardYearlyCharts>();
  }
}

export const dashboardService = new DashboardService();
