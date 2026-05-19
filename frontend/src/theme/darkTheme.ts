 import { useContext } from 'react';
import { SettingsContext } from '../context/SettingsContext';

export const useTheme = () => {
  const settings = useContext(SettingsContext) ?? { darkMode: false };
  const { darkMode } = settings;

  return {
    backgroundColor: darkMode ? '#0f172a' : '#fff',
    textColor: darkMode ? '#fff' : '#000',
  };
};