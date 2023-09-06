import { StatusBar } from 'expo-status-bar';
import {react, useState, useEffect} from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, Button, TextInput} from "react-native";
import { Audio } from "expo-av";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';

//Components

import { RecordingProvider } from './components/ReduxContext';
import Home from './components/Home';
import Recording from './components/Recording';
import List from './components/List';
import Share from './components/Share';

//Stack Navigator
const Stack = createStackNavigator();

export default function App() {

  return (
    <RecordingProvider>
    <NavigationContainer>
      <Stack.Navigator screenOptions = {{headerShown: false, //Hide the navigation header
      }}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen 
                        name="Recording" 
                        component={Recording}
        />
        <Stack.Screen 
                        name="List" 
                        component={List}
        />
        <Stack.Screen 
                        name="Share" 
                        component={Share} 
        />
      </Stack.Navigator>
    </NavigationContainer>
    </RecordingProvider>
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
