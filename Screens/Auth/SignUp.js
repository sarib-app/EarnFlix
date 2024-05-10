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
  const [username, setusername] = useState('');
  const [firstname, setfirstname] = useState('');
  const [lastname, setlastname] = useState('');

  const [password, setPassword] = useState('');
  const [EmailError, setEmailError] = useState('');
  const [usernameError, setusernameError] = useState('');

  const [firstnameError, setfirstnameError] = useState('');

  const [lastnameError, setlastnameError] = useState('');


  
  const [passwordError, setPasswordError] = useState('');
  const [loading, setLoading] = useState(false);


  


  
  const handleSignup = () => {
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
      if (!username) {
        setusernameError('username is required');
      } else {
        setusernameError('');
      }
      if (!firstname) {
        setfirstnameError('firstname is required');
      } else {
        setfirstnameError('');
      }
      if (!lastname) {
        setlastnameError('lastname is required');
      } else {
        setlastnameError('');
      }
      if(Email && password&& username && firstname && lastname){
    setLoading(true)
SignUp()
        // loginFirebase()
      }
      // Add your login logic here
    };


    function SignUp(){
      const formdata = new FormData();
formdata.append("username", username);
formdata.append("password", password);
formdata.append("email", Email);
formdata.append("firstname", firstname);
formdata.append("lastname", lastname);

const requestOptions = {
  method: "POST",
  body: formdata,
  redirect: "follow"
};

fetch("https://api.earnflixofficial.com/api/register", requestOptions)
  .then((response) => response.json())
  .then((result) => {console.log(result)
    if(result.user){

      AsyncStorage.setItem("user",JSON.stringify(result.user))
      navigation.navigate('BottomNavigation')


    }
    else if(result.message && !result.user){

      Alert.alert("Erro",result.message)

    }
    else{
      Alert.alert("Erro","something went wrong try again!")

    }

  })
  .catch((error) => console.error(error))
  .finally(() =>setLoading(false) );
    }

  
 
  



  
  return (
    <View style={AuthStyles.container}>
      <ScrollView >

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
<Text style={AuthStyles.errorText}>{!password && passwordError}</Text>

       {/* firstname Field */}
       <View style={[AuthStyles.inputContainer, { borderColor: firstnameError && !firstname? 'red' : '#3C3737' }]}>
      <AntDesign name="user" size={24} color="white" />
      <TextInput
        style={AuthStyles.input}
        placeholder="firstname"
        placeholderTextColor="#808080"
        onChangeText={(text) => setfirstname(text)}
      />  
    </View>
    <Text style={AuthStyles.errorText}>{!firstname && firstnameError}</Text>

     {/* lastname Field */}
     <View style={[AuthStyles.inputContainer, { borderColor: lastnameError && !lastname? 'red' : '#3C3737' }]}>
      <AntDesign name="user" size={24} color="white" />
      <TextInput
        style={AuthStyles.input}
        placeholder="lastname"
        placeholderTextColor="#808080"
        onChangeText={(text) => setlastname(text)}
      />  
    </View>
    <Text style={AuthStyles.errorText}>{!lastname && lastnameError}</Text>
   
    {
      loading === false ?
    <TouchableOpacity style={AuthStyles.button} onPress={()=> handleSignup()}>
      <AntDesign name="login" size={24} color="black" />
      <Text style={AuthStyles.buttonText}>Sign Up</Text>
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
    <View style={{height:200,width:100}}>

    </View>
    {/* </ScrollView> */}
    </ScrollView>

  </View>
  );
};


export default SignUp;
