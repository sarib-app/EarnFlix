import React, { useState,useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, AuthStylesheet,Image, Alert, ScrollView, SafeAreaView } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

import AuthStyles from './AuthStyles';
import { Colors } from '../../Global/Styling/Branding';
import LogoImg from '../../assets/Imgs/LogoImg.jpg'
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';


import GoBack from '../../Global/Styling/BackButton';




// Add scope and custom parameters if needed
function SignUp(){
  const navigation = useNavigation()
  const [Email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [EmailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loading, setLoading] = useState(false);


  


  
  const handleLogin = () => {
    if (!Email) {
        setEmailError('Email is required');
      } else {
        setEmailError('');
      }
      if (!password) {
        setPasswordError('Password is required');
      } else {
        setPasswordError('');
      }
      if(Email && password){
    setLoading(true)

        // loginFirebase()
      }
      // Add your login logic here
    };

 
  



  
  return (
    <SafeAreaView style={AuthStyles.container}>
      {/* <ScrollView> */}
      <View
      style={{alignSelf:'flex-start',marginLeft:20}}
      >

      <GoBack/>
      </View>

    {/* Logo or image */}
    <View style={AuthStyles.logoContainer}>
      {/* Your logo or image */}
      {/* <Text style={AuthStyles.logoText}>Your Logo</Text> */}
      <Image source={LogoImg} style={AuthStyles.ImgStyle}/>
    </View>
    
    {/* Email Field */}
    <View style={[AuthStyles.inputContainer, { borderColor: EmailError && !Email? 'red' : '#3C3737' }]}>
      <AntDesign name="user" size={24} color="white" />
      <TextInput
        style={AuthStyles.input}
        placeholder="Email"
        placeholderTextColor="#808080"
        onChangeText={(text) => setEmail(text)}
      />  
    </View>
    <Text style={AuthStyles.errorText}>{!Email && EmailError}</Text>

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


export default SignUp;
