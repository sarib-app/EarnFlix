import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import BottomNavigation from './Components/BottomBar/BottomNavigation';
import HomeScreen from './Screens/Home/HomeScreen';
import VideoPlayer from './Screens/VideoPlayer.js/VideoPLayer';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SelectLanguage">
        <Stack.Screen name="BottomNavigation" component={BottomNavigation} options={{ headerShown: false }} />
      
        <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="VideoPlayer" component={VideoPlayer} options={{ headerShown: false }} />


      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
