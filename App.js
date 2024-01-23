import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeScreen} from './Details.js';
import MorseToTextScreen from './MorseToText.js';
import TextToMorseScreen from './TextToMorse.js';


const Tab = createBottomTabNavigator();

export default function App() {
 
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{ headerShown: false }}>
        <Tab.Screen name="Morse to text" component={MorseToTextScreen} tabBarOptions ={{
      showIcon: true,
      showLabel: true, }}
/> 
      <Tab.Screen name="Text to Morse" component={TextToMorseScreen} tabBarOptions ={{
            showIcon: true,
            showLabel: true, }}
      /> 
              <Tab.Screen name="Details" component={HomeScreen} />
      </Tab.Navigator>
    </NavigationContainer>
      );

  }