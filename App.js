import { StatusBar } from 'expo-status-bar';
import {React, useState, useEffect} from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, Button, TextInput} from "react-native";
import { Audio } from "expo-av";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';

//Components

import Home from './components/Home';
import Recording from './components/Recording';
import List from './components/List';
import Share from './components/Share';
import AppNavigator from './components/AppNavigator';

//Stack Navigator
const Stack = createStackNavigator();

export default function App() {

  return (
      <AppNavigator />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
