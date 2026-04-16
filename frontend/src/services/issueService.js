import api from './api.js';

export const getIssues = async () => {
  const response = await api.get('/issues');
  return response.data;
};

export const createIssue = async (payload) => {
  const response = await api.post('/issues', payload);
  return response.data;
};

export const updateIssue = async (issueId, payload) => {
  const response = await api.patch(`/issues/${issueId}`, payload);
  return response.data;
};
