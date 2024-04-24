import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AntDesign } from '@expo/vector-icons';

import { Colors } from '../../Global/Styling/Branding';
import HomeScreen from '../../Screens/Home/HomeScreen';
import RegionalScreen from '../../Screens/RegionalScreens/RegionalScreen';

const Tab = createBottomTabNavigator();

const BottomNavigation = () => {
  return (
    // <NavigationContainer>
      <Tab.Navigator
        tabBarOptions={{
            style: { backgroundColor: Colors.MainBgColor },
           
        
          
        }}
        screenOptions={{
            tabBarStyle: { backgroundColor:Colors.MainBgColor,height:70,borderTopWidth:0 ,paddingBottom:-10},
            tabBarActiveBackgroundColor:Colors.PrimaryColor,
            tabBarShowLabel:false,
          }}
      >
        <Tab.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{
            tabBarIcon: ({ color }) => (
              <AntDesign name="book" size={24} color={"white"} />
            ),
            headerShown:false,
          }}
          
        />
        <Tab.Screen
          name="RegionalScreen"
          component={RegionalScreen}
          options={{
            tabBarIcon: ({ color }) => (
              <AntDesign name="setting" size={24} color={"white"} />
            ),
            headerShown:false

          }}
        />
      </Tab.Navigator>
  );
};

export default BottomNavigation;
