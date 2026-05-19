import { api } from './api';

 
export const getAllRules = async () => {

  const res = await api.get(
    '/rules'
  );

  return res.data;
};

 
export const getRulesByCategory =
  async (categoryId: number) => {

    const res = await api.get(
      `/rules/categories/${categoryId}`
    );

    return res.data;
  };

 
export const createRule = async (
  categoryId: number,
  ruleData: any
) => {

  const res = await api.post(
    `/rules/categories/${categoryId}`,
    ruleData
  );

  return res.data;
};

 
export const updateRule = async (
  id: number,
  ruleData: any
) => {

  const res = await api.put(
    `/rules/${id}`,
    ruleData
  );

  return res.data;
};

 
export const deleteRule =
  async (id: number) => {

    const res = await api.delete(
      `/rules/${id}`
    );

    return res.data;
  };

 
export const searchRules =
  async (query: string) => {

    const res = await api.get(
      '/rules/search',
      {
        params: { q: query },
      }
    );

    return res.data;
  };