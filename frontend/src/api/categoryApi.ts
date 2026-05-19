 import { api } from './api';
export const getAllCategories =
  async () => {

    const res =
      await api.get(
        '/categories'
      );

    return res.data;
  };

 
export const getCategoryById =
  async (id: number) => {

    const res =
      await api.get(
        `/categories/${id}`
      );

    return res.data;
  };

 
export const createCategory =
  async (data: any) => {

    const res =
      await api.post(
        '/categories',
        data
      );

    return res.data;
  };

 
export const updateCategory =
  async (
    id: number,
    data: any
  ) => {

    const res =
      await api.put(
        `/categories/${id}`,
        data
      );

    return res.data;
  };

 
export const patchCategory =
  async (
    id: number,
    data: any
  ) => {

    const res =
      await api.patch(
        `/categories/${id}`,
        data
      );

    return res.data;
  };

 
export const deleteCategory =
  async (id: number) => {

    const res =
      await api.delete(
        `/categories/${id}`
      );

    return res.data;
  };