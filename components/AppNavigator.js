import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from "@react-navigation/native";
import { RecordingProvider } from "./ReduxContext";

import Home from './Home';
import Recording from './Recording';
import List from './List';
import Share from './Share';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <RecordingProvider>
    <NavigationContainer>
    <Stack.Navigator  screenOptions = {{headerShown: false}}>
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
};

export default AppNavigator;
