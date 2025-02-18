import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import Colors from './Colors';
import * as Font from 'expo-font';
import Fontisto from 'react-native-vector-icons/Fontisto';

import StackNavigator from './navigation/StackNavigator';
import { ModalPortal } from 'react-native-modals';
import { AuthProvider } from './AuthContext';

export default function App() {
  const [fontsLoaded] = Font.useFonts({
    'font-bold': require('./assets/fonts/PlayfairDisplay-Bold.ttf'),
    'font-med': require('./assets/fonts/Poppins-Medium.ttf'),
    'font-reg': require('./assets/fonts/Poppins-Regular.ttf'),
  });

  if (!fontsLoaded) {
    return null; // You could show a loading screen here
  }

  return (
    <AuthProvider>
      <>
        <StackNavigator />
        <ModalPortal />
      </>
    </AuthProvider>
   
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontFamily: 'font-bold',
    fontSize: 40,
    color: Colors.black,
  },
  subtitle: {
    fontFamily: 'font-med',
    fontSize: 18,
    color: Colors.secondary,
  },
  body: {
    fontFamily: 'font-reg',
    fontSize: 16,
    color: Colors.text,
  },
});
