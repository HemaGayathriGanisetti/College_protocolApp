 import { api } from './api';

 
export const getLabs = async () => {

  const res = await api.get('/labs');

  return res.data;
};

 
export const createLab = async (
  data: any
) => {

  const res = await api.post(
    '/labs',
    data
  );

  return res.data;
};

 
export const updateLab = async (
  id: number,
  data: any
) => {

  const res = await api.put(
    `/labs/${id}`,
    data
  );

  return res.data;
};
 
export const deleteLab = async (
  id: number
) => {

  const res = await api.delete(
    `/labs/${id}`
  );

  return res.data;
};