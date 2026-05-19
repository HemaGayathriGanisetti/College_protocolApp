  import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, ActivityIndicator } from 'react-native';
import { AuthContext } from '../context/AuthContext';
  
import LoginScreen from '../screens/LoginScreen';
import DrawerNavigator from './DrawerNavigator';
import { RootStackParamList } from './type';
 
const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  const { token, loading } = React.useContext(AuthContext);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {token ? (
        <Stack.Screen name="Main" component={DrawerNavigator} />
      ) : (
        <Stack.Screen name="Login" component={LoginScreen} />
        
      )}
    </Stack.Navigator>
  );
}




