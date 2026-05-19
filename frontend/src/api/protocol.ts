 import { api } from './api';

export const getProtocols = async () => {
  const res = await api.get('/protocol');
  return res.data;
};