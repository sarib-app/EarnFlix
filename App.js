import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import BottomNavigation from './Components/BottomBar/BottomNavigation';
import HomeScreen from './Screens/Home/HomeScreen';
import VideoPlayer from './Screens/VideoPlayer.js/VideoPLayer';
import LoginScreen from './Screens/Auth/Logins';
import SignUp from './Screens/Auth/SignUp';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CheckSettingScreen from './Screens/Home/CheckSettingScreen';
import FinanceScreen from './Screens/UserFinance/UserFinance';
import WithdrawHistoryScreen from './Screens/Withdraw/WithdrawList';
import SegmentEarning from './Screens/SegmentEarning/SegmentEarning';
import WithdrawFormScreen from './Screens/Withdraw/WithdrawForm';
import LinkScreen from './Screens/CustomVideos/CustomVideos';

const Stack = createStackNavigator();

const App = () => {
  const [initialRouteName,setintialroutename]=useState(null)

  useEffect(()=>{
async function getData(){
const user = await  AsyncStorage.getItem("user")
const userParsed = JSON.parse(user)
if (userParsed){
  setintialroutename("BottomNavigation")
}
else{
  setintialroutename("LoginScreen")
}

}
getData()
  },[])

  if(initialRouteName === null){
    return(
      <CheckSettingScreen />
    )
  }
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={initialRouteName}>
        <Stack.Screen name="BottomNavigation" component={BottomNavigation} options={{ headerShown: false }} />
      
        <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="VideoPlayer" component={VideoPlayer} options={{ headerShown: false }} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }} />
        <Stack.Screen name="FinanceScreen" component={FinanceScreen} options={{ headerShown: false }} />
        <Stack.Screen name="WithdrawHistoryScreen" component={WithdrawHistoryScreen} options={{ headerShown: false }} />
        <Stack.Screen name="SegmentEarning" component={SegmentEarning} options={{ headerShown: false }} />
        <Stack.Screen name="WithdrawFormScreen" component={WithdrawFormScreen} options={{ headerShown: false }} />
        <Stack.Screen name="LinkScreen" component={LinkScreen} options={{ headerShown: false }} />



      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
