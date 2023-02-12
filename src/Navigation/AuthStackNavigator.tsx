import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Platform} from 'react-native';
import SignUpScreen from '../Screens/SignUp/SignUpScreen';
import LoginScreen from '../Screens/Login/LoginScreen';

export type AuthStackParamList = {
  SignUp: undefined;
  Login: undefined;
};

const AuthStack = createNativeStackNavigator<AuthStackParamList>();

function AuthStackNavigator() {
  return (
    <AuthStack.Navigator
      screenOptions={{
        animation: Platform.OS === 'android' ? 'default' : 'default',
        headerShown: false,
      }}>
      <AuthStack.Screen name={'SignUp'} component={SignUpScreen} />
      <AuthStack.Screen name={'Login'} component={LoginScreen} />
    </AuthStack.Navigator>
  );
}

export default AuthStackNavigator;
