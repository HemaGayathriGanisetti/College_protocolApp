 import { api } from './api';

export interface Timetable {
  id?: number;
  day: string;
  period: number;
  subject: string;
  faculty: string;
  room: string;
}
 
export const getTimetable = async (): Promise<Timetable[]> => {
  const res = await api.get('/timetable');
  return res.data;
};

 
export const addTimetable = async (
  data: Timetable
): Promise<Timetable> => {
  const res = await api.post('/timetable', data);
  return res.data;
};
 
export const updateTimetable = async (
  id: number,
  data: Timetable
): Promise<Timetable> => {
  const res = await api.put(`/timetable/${id}`, data);
  return res.data;
};

 
export const deleteTimetable = async (
  id: number
): Promise<void> => {
  await api.delete(`/timetable/${id}`);
};

 
export const getTimetableByDay = async (
  day: string
): Promise<Timetable[]> => {
  const res = await api.get(`/timetable/day/${day}`);
  return res.data;
};

 
export const getWeeklyTimetable = async (): Promise<Timetable[]> => {
  const res = await api.get('/timetable/weekly');
  return res.data;
};