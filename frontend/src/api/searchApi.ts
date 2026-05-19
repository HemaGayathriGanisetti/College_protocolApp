import { api } from './api';
 

export const getSearchGlobal = async (keyword: string) => {
  const res = await api.get(`/search/search?keyword=${keyword}`);
  return res.data;
};