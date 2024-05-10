import React, { useState,useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, AuthStylesheet,Image, Alert, ScrollView, SafeAreaView } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

import AuthStyles from './AuthStyles';
import { Colors } from '../../Global/Styling/Branding';
import LogoImg from '../../assets/Imgs/LogoImg.jpg'
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';




import GoBack from '../../Global/Styling/BackButton';
import BaseUrl from '../../Url';
// Add scope and custom parameters if needed
function LoginScreen(){
  const navigation = useNavigation()
  const [username, setusername] = useState('');
  const [password, setPassword] = useState('');
  const [usernameError, setusernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loading, setLoading] = useState(false);


  


  
  const handleLogin = () => {
    if (!username) {
        setusernameError('username is required');
      } else {
        setusernameError('');
      }
      if (!password) {
        setPasswordError('Password is required');
      } else {
        setPasswordError('');
      }
      if(username && password){
    setLoading(true)
    login()
        // loginFirebase()
      }
      // Add your login logic here
    };

 
  function login(){
    const formdata = new FormData();
formdata.append("username", username);
formdata.append("password", password);

const requestOptions = {
  method: "POST",
  body: formdata,
  redirect: "follow"
};

fetch(`${BaseUrl}login`, requestOptions)
  .then((response) => response.json())
  .then((result) => {
    if(result.user){

      AsyncStorage.setItem("user",JSON.stringify(result.user))
      navigation.navigate('BottomNavigation')
setusernameError("")
setPasswordError("")
    }
    else if(result.message && !result.user){
      Alert.alert("Erro",result.message)
    }
    else{
      Alert.alert("Erro","something went wrong try again!")

    }
    console.log(result)})
  .catch((error) => {console.error(error)

    Alert.alert("Erro","something went wrong try again!")

  })
  .finally(()=>{
    setLoading(false)
  })
  }



  
  return (
    <SafeAreaView style={AuthStyles.container}>
      {/* <ScrollView> */}
  

    {/* Logo or image */}
    <View style={AuthStyles.logoContainer}>
      {/* Your logo or image */}
      {/* <Text style={AuthStyles.logoText}>Your Logo</Text> */}
      <Image source={LogoImg} style={AuthStyles.ImgStyle}/>
    </View>
    
    {/* username Field */}
    <View style={[AuthStyles.inputContainer, { borderColor: usernameError && !username? 'red' : '#3C3737' }]}>
      <AntDesign name="user" size={24} color="white" />
      <TextInput
        style={AuthStyles.input}
        placeholder="username"
        placeholderTextColor="#808080"
        onChangeText={(text) => setusername(text)}
      />  
    </View>
    <Text style={AuthStyles.errorText}>{!username && usernameError}</Text>

    {/* Password Field */}
    <View style={[AuthStyles.inputContainer, { borderColor: passwordError && !password ? 'red' : '#3C3737' }]}>
      <AntDesign name="lock" size={24} color="white" />
      <TextInput
        style={AuthStyles.input}
        placeholder="Password"
        placeholderTextColor="#808080"
        secureTextEntry
        onChangeText={(text) => setPassword(text)}
      />
    </View>
    <Text style={AuthStyles.errorText}>{!password && passwordError}</Text>

    {
      loading === false ?
    <TouchableOpacity style={AuthStyles.button} onPress={()=> handleLogin()}>
      <AntDesign name="login" size={24} color="black" />
      <Text style={AuthStyles.buttonText}>Login</Text>
    </TouchableOpacity>
:
    <TouchableOpacity style={AuthStyles.button}>
      <AntDesign name="loading" size={24} color="black" />
      <Text style={AuthStyles.buttonText}>Loading....</Text>
    </TouchableOpacity>
    }




    {/* Forgot Password and Sign Up */}
    <View style={AuthStyles.footer}>
      <Text                
      
      onPress={()=> navigation.navigate("ForgetPassword")}
style={AuthStyles.footerText}>Forget Password</Text>
      <Text 
              onPress={()=> navigation.navigate("SignUp")}

      style={AuthStyles.footerText}>Don\t have an account? Sign Up</Text>
    </View>
    {/* </ScrollView> */}

  </SafeAreaView>
  );
};


export default LoginScreen;
