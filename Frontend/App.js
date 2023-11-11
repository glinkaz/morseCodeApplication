import { Button, Text, TouchableOpacity, View, StyleSheet, TextInput } from 'react-native';
import React, { useState, useEffect } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SettingsStackScreen} from './Details.js';
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
              <Tab.Screen name="Details" component={SettingsStackScreen} />
      </Tab.Navigator>
    </NavigationContainer>
      );

  }