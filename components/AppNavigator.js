import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from 'react-redux';
import { store }  from '../appRedux/store';

import Home from './Home';
import Recording from './Recording';
import List from './List';
import Share from './Share';
import Login from './Login';
import SignUp from './SignUp';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Provider store={store}>
    <NavigationContainer>
    <Stack.Navigator initialRouteName="Home" screenOptions = {{headerShown: false}}>
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
        <Stack.Screen 
                        name="Login" 
                        component={Login} 
        />
         <Stack.Screen 
                        name="SignUp" 
                        component={SignUp} 
        />
    </Stack.Navigator>
    </NavigationContainer>
    </Provider>
  );
};

export default AppNavigator;
