import {firebase} from '@react-native-firebase/auth';
import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import AuthStackNavigator from './AuthStackNavigator';
import RootStackNavigator from './RootStackNavigator';

function Router() {
  const uid = useSelector(state => state.cartReducer.uid);

  return (
    <NavigationContainer>
      {uid ? <RootStackNavigator /> : <AuthStackNavigator />}
    </NavigationContainer>
  );
}

export default Router;
