   import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TouchableOpacity, Text } from 'react-native';
import { DrawerActions, useNavigation } from '@react-navigation/native';

 import HomeScreen from '../screens/HomeScreen';
import Admindashboard from '../screens/AdminDashboard';
import SearchScreen from "../screens/SearchScreen";
import TimetableScreen from '../screens/TimetableScreen';
import SettingsScreen from '../screens/SettingsScreen';
import LabsScreen from '../screens/LabsScreen';
import RulesScreen from '../screens/RulesScreen';
import RuleDetailsScreen from '../screens/RuleDetailsScreen';

const Stack = createNativeStackNavigator();

export default function AppStack() {

  const navigation = useNavigation();

  return (
    <Stack.Navigator screenOptions={{ headerShown: true }}>

      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'Home',
          headerLeft: () => (
            <TouchableOpacity
              onPress={() =>
                navigation.dispatch(DrawerActions.openDrawer())
              }
              style={{ marginLeft: 15 }}
            >
              <Text style={{ fontSize: 22 }}>☰</Text>
            </TouchableOpacity>
          ),
        }}
      />
       <Stack.Screen
  name="Admindashboard"
  component={Admindashboard}
/>
      

      <Stack.Screen
        name="Labs"
        component={LabsScreen}
      />

      <Stack.Screen
        name="RulesScreen"
        component={RulesScreen}
      />

      <Stack.Screen
        name="RuleDetailsScreen"
        component={RuleDetailsScreen}
      />

      <Stack.Screen
        name="Search"
        component={SearchScreen}
      />

      <Stack.Screen
        name="Timetable"
        component={TimetableScreen}
      />

      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
      />

    </Stack.Navigator>
  );
}