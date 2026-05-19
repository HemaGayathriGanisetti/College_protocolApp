 import React, { useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Switch,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
 
 import { AuthContext } from '../context/AuthContext';
import { SettingsContext, useSettings } from '../context/SettingsContext';
 
 
export default function SettingsScreen({ navigation }: any) {
   const { logout } = useContext(AuthContext);
     const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: logout,
        },
      ]
    );
  };
   const { darkMode, notifications, updateSettings } = useSettings();

  return (
    <ScrollView
      style={[
        styles.container,
        { backgroundColor: darkMode ? '#0f172a' : '#f1f5f9' },
      ]}
    >

       
      <Text style={styles.title}>
        Edit Profile
      </Text>

      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate('EditProfile')}
      >
        <Text style={styles.text}>Edit Profile</Text>
      </TouchableOpacity>

     
      <Text style={styles.title}>🔔 Notifications</Text>

      <View style={styles.row}>
        <Text style={styles.text}>Enable Notifications</Text>
        <Switch
          value={notifications}
          onValueChange={(val) =>
            updateSettings({ notifications: val })
          }
        />
      </View>

      
      <Text style={styles.title}>🎨 Theme</Text>

      <View style={styles.row}>
        <Text style={styles.text}>
          {darkMode ? 'Dark Mode' : 'Light Mode'}
        </Text>
        <Switch
          value={darkMode}
          onValueChange={(val) =>
            updateSettings({ darkMode: val })
          }
        />
      </View>

      

       
      <Text style={styles.title}>ℹ️ About App</Text>

      <View style={styles.card}>
        <Text style={styles.text}>
          College Protocol App
        </Text>
        <Text style={styles.subText}>
          Version 1.0.0{"\n"}
          Built with React Native + Spring Boot{"\n"}
          Features: Labs, Rules, Timetable
        </Text>
      </View>

         
      <TouchableOpacity style={styles.logout} onPress={handleLogout}>
        <Text style={{ color: '#fff', fontWeight: 'bold' }}>
          Logout
        </Text>
      </TouchableOpacity>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
     
    padding: 15,
  },

  title: {
    color: '#38BDF8',
    fontSize: 15,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 8,
  },

  card: {
    backgroundColor: '#1e293b',
    padding: 14,
    borderRadius: 10,
    marginBottom: 10,
  },

  row: {
    backgroundColor: '#1e293b',
    padding: 14,
    borderRadius: 10,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  text: {
    color: '#fff',
    fontSize: 16,
  },

  subText: {
    color: '#94a3b8',
    marginTop: 5,
    fontSize: 13,
  },

  logout: {
    backgroundColor: '#ef4444',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 25,
  },
});