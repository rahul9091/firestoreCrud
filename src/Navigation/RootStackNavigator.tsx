import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../Screens/Home/HomeScreen';
import FormScreen from '../Screens/Form/FormScreen';

export type RootStackParamList = {
  Home: undefined;
  Form: undefined;
};

const RootStack = createNativeStackNavigator<RootStackParamList>();

function RootStackNavigator() {
  return (
    <RootStack.Navigator
      screenOptions={{
        // animation: Platform.OS === 'android' ? 'fade_from_bottom' : 'default',
        headerShown: false,
      }}>
      <RootStack.Screen name={'Home'} component={HomeScreen} />
      <RootStack.Screen name={'Form'} component={FormScreen} />
    </RootStack.Navigator>
  );
}

export default RootStackNavigator;
