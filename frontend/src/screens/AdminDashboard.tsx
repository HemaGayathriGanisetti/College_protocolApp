 import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

export default function AdminDashboard({ navigation }: any) {

  const menuItems = [
    {
      title: 'Manage Students',
      screen: 'Students',
      icon: '🎓',
    },
    {
      title: 'Manage Labs',
      screen: 'Labs',
      icon: '💻',
    },
    {
      title: 'Categories',
      screen: 'Categories',
      icon: '📚',
    },
    {
      title: 'Rules & Protocols',
      screen: 'Rules',
      icon: '📜',
    },
    {
      title: 'Timetable',
      screen: 'Timetable',
      icon: '🕒',
    },
    {
      title: 'Settings',
      screen: 'Settings',
      icon: '⚙️',
    },
  ];

  return (
    <View style={styles.container}>

       
      <View style={styles.header}>
        <Text style={styles.welcome}>
          Welcome Admin 👨‍💼
        </Text>

        <Text style={styles.subtitle}>
          College Protocol Management System
        </Text>
      </View>

       
      <ScrollView
        contentContainerStyle={styles.grid}
        showsVerticalScrollIndicator={false}
      >

        {menuItems.map((item, index) => (

          <TouchableOpacity
            key={index}
            style={styles.card}
            onPress={() => navigation.navigate(item.screen)}
          >

            <Text style={styles.icon}>
              {item.icon}
            </Text>

            <Text style={styles.cardTitle}>
              {item.title}
            </Text>

          </TouchableOpacity>

        ))}

      </ScrollView>

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#020617',
    padding: 16,
  },

  header: {
    marginTop: 20,
    marginBottom: 25,
  },

  welcome: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
  },

  subtitle: {
    color: '#94a3b8',
    marginTop: 6,
    fontSize: 14,
  },

  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },

  card: {
    width: '47%',
    backgroundColor: '#0f172a',
    borderRadius: 18,
    paddingVertical: 30,
    paddingHorizontal: 15,
    marginBottom: 18,
    alignItems: 'center',

    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },

  icon: {
    fontSize: 36,
    marginBottom: 10,
  },

  cardTitle: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 15,
  },
});