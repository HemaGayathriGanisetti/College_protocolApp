  import React, { createContext, useEffect, useState, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type SettingsType = {
  darkMode: boolean;
  notifications: boolean;
  loading: boolean;
  setDarkMode: (v: boolean) => void;
  setNotifications: (v: boolean) => void;
  updateSettings: (v: Partial<Omit<SettingsType, 'loading'>>) => void;
};

export const SettingsContext = createContext<SettingsType | undefined>(undefined);
 
export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used inside SettingsProvider');
  }
  return context;
};

export const SettingsProvider = ({ children }: { children: React.ReactNode }) => {
  const [darkMode, setDarkMode] = useState(true);
  const [notifications, setNotifications] = useState(true);
  const [loading, setLoading] = useState(true);

   
  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const data = await AsyncStorage.getItem('settings');

      if (data) {
        try {
          const parsed = JSON.parse(data);

          setDarkMode(parsed?.darkMode ?? true);
          setNotifications(parsed?.notifications ?? true);
        } catch (e) {
          console.log('Invalid settings JSON, resetting...');
          await AsyncStorage.removeItem('settings');
        }
      }
    } catch (err) {
      console.log('Load settings error:', err);
    } finally {
      setLoading(false);
    }
  };
 
  const saveSettings = async (data: any) => {
    try {
      await AsyncStorage.setItem('settings', JSON.stringify(data));
    } catch (err) {
      console.log('Save settings error:', err);
    }
  };

   
  const updateSettings = (updates: any) => {
    const newSettings = {
      darkMode,
      notifications,
      ...updates,
    };

    if (updates.darkMode !== undefined) setDarkMode(updates.darkMode);
    if (updates.notifications !== undefined) setNotifications(updates.notifications);

    saveSettings(newSettings);
  };

  return (
    <SettingsContext.Provider
      value={{
        darkMode,
        notifications,
        loading,
        setDarkMode,
        setNotifications,
        updateSettings,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};