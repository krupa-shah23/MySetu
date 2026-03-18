import api from './api';

export const walletService = {
  getCredentials: async () => {
    try {
      const response = await api.get('/credentials');
      return response.data.data;
    } catch (error) {
      console.error('Error fetching credentials:', error);
      throw error;
    }
  }
};
