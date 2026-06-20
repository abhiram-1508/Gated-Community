import api from './api';

export const residentAPI = {
  list: (params) => api.get('/users', { params }),
  getProfile: () => api.get('/users/me/profile'),
  updateProfile: (payload) => api.put('/users/me/profile', payload),
  emergencyContacts: () => api.get('/emergency-contacts'),
};
