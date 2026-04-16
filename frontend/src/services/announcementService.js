import api from './api.js';

export const getAnnouncements = async () => {
  const response = await api.get('/announcements');
  return response.data;
};

export const createAnnouncement = async (payload) => {
  const response = await api.post('/announcements', payload);
  return response.data;
};
