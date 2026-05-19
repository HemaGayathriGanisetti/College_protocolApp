import React, { useContext } from 'react';
import {
  createNativeStackNavigator,
} from '@react-navigation/native-stack';

import { AuthContext } from '../context/AuthContext';
 
import HomeScreen from '../screens/HomeScreen';

import AdminDashboard from '../screens/AdminDashboard';

import LabsScreen from '../screens/LabsScreen';

import StudentsScreen from '../screens/StudentsScreen';

import CategoriesScreen from '../screens/CategoriesScreen';

import RulesScreen from '../screens/RulesScreen';

import RuleDetailsScreen from '../screens/RuleDetailsScreen';

import TimetableScreen from '../screens/TimetableScreen';

import SettingsScreen from '../screens/SettingsScreen';
import SearchScreen from '../screens/SearchScreen';

const Stack =
  createNativeStackNavigator();

export default function HomeStack() {
 
  const { user } =
    useContext(AuthContext);

  const isAdmin =
    user?.role === 'ADMIN';

  return (

    <Stack.Navigator>

    

      {isAdmin ? (

        <Stack.Screen
          name="AdminDashboard"
          component={AdminDashboard}

          options={{
            title: 'Admin Dashboard',
            headerStyle: {
              backgroundColor: '#0f172a',
            },
            headerTintColor: '#fff',
          }}
        />

      ) : (

        <Stack.Screen
          name="Home"
          component={HomeScreen}

          options={{
            title: 'Home',
            headerStyle: {
              backgroundColor: '#0f172a',
            },
            headerTintColor: '#fff',
          }}
        />

      )}

       
      <Stack.Screen
        name="Labs"
        component={LabsScreen}

        options={{
          title: 'Labs',
          headerStyle: {
            backgroundColor: '#0f172a',
          },
          headerTintColor: '#fff',
        }}
      />

      
      <Stack.Screen
        name="Students"
        component={StudentsScreen}

        options={{
          title: 'Students',
          headerStyle: {
            backgroundColor: '#0f172a',
          },
          headerTintColor: '#fff',
        }}
      />

     
      <Stack.Screen
        name="Categories"
        component={CategoriesScreen}

        options={{
          title: 'Categories',
          headerStyle: {
            backgroundColor: '#0f172a',
          },
          headerTintColor: '#fff',
        }}
      />
 
      <Stack.Screen
        name="Rules"
        component={RulesScreen}

        options={{
          title: 'Rules',
          headerStyle: {
            backgroundColor: '#0f172a',
          },
          headerTintColor: '#fff',
        }}
      />

      
      <Stack.Screen
        name="RuleDetails"
        component={RuleDetailsScreen}

        options={{
          title: 'Rule Details',
          headerStyle: {
            backgroundColor: '#0f172a',
          },
          headerTintColor: '#fff',
        }}
      />

       
      <Stack.Screen
        name="Timetable"
        component={TimetableScreen}

        options={{
          title: 'Timetable',
          headerStyle: {
            backgroundColor: '#0f172a',
          },
          headerTintColor: '#fff',
        }}
      />

      
      <Stack.Screen
        name="Settings"
        component={SettingsScreen}

        options={{
          title: 'Settings',
          headerStyle: {
            backgroundColor: '#0f172a',
          },
          headerTintColor: '#fff',
        }}
      />

       

  <Stack.Screen
    name="Search"
    component={SearchScreen}
  />
 

    </Stack.Navigator>
  );
}