import api from './api';
import { dashboardData } from '../utils/mockData';

export const dashboardService = {
  getDashboardSummary: async () => {
    // In a real app, this would be:
    // const response = await api.get('/dashboard/summary');
    // return response.data;
    
    // For now, return mock data
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(dashboardData);
      }, 500); 
    });
  }
};
