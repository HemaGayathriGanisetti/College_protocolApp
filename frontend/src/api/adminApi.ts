 import { api } from './api';

 
export const createAdmin = async (email: string, password: string) => {
  const res = await api.post('/admin/create-admin', { email, password });
  return res.data;
};

 
export const updateAdmin = async (
  email: string,
  name: string,
  password: string
) => {
  const res = await api.put('/admin/update', {
    email,
    name,
    password,
  });
  return res.data;
};