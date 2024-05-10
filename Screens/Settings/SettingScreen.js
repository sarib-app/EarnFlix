import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity ,ScrollView,Dimensions,Linking} from 'react-native';
import { AntDesign } from '@expo/vector-icons'; // Import icons from Expo vector icons library
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Colors } from '../../Global/Styling/Branding';
const WindowWidth = Dimensions.get('window').width
const WindowHeight = Dimensions.get('window').height; 
import HeaderMain from '../../Global/components/HeaderMain';
import { useNavigation } from '@react-navigation/native';
// import { ScrollView } from 'react-native-gesture-handler';

const SettingScreen = () => {
  const [username, setUsername] = useState('');
const navigation = useNavigation()
  useEffect(() => {
    // Fetch username from AsyncStorage on component mount
    getUserFromStorage();
  }, []);

  const getUserFromStorage = async () => {
    try {
      const storedUser = await AsyncStorage.getItem('user');
      const parsedUser = JSON.parse(storedUser)
      setUsername(parsedUser.username);
    } catch (error) {
      console.error('Error fetching username:', error);
    }
  };


  const handleContactUs = () => {
    // Replace 'your-email@example.com' with your email address
    const email = 'contact@earnflixofficial.com';
    Linking.openURL(`mailto:${email}`);
    
  };
  const handleLink = (subname) => {
    // Replace 'your-email@example.com' with your email address
    const email = `${subname}.earnflixofficial.com`;
    Linking.openURL("https://"+email);

  };

  return (
    <View style={styles.container}>
        <HeaderMain />
        <ScrollView
        // style={{width:"100%"}}
        contentContainerStyle={{alignItems:'center'}}
        
        >

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Welcome, {username}</Text>
      </View>
      <TouchableOpacity style={styles.card}>
        <AntDesign name="lock" size={24} color="white" />
        <Text style={styles.cardText}>Change Password</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.card}>
        <AntDesign name="edit" size={24} color="white" />
        <Text style={styles.cardText}>Update Profile</Text>
      </TouchableOpacity>
      <TouchableOpacity 
      onPress={()=> navigation.navigate("FinanceScreen")}
      
      style={styles.card}>
        <AntDesign name="clockcircleo" size={24} color="white" />
        <Text style={styles.cardText}>See History</Text>
      </TouchableOpacity>
      <TouchableOpacity 
                  onPress={()=>handleLink("tos")}

      style={styles.card}>
        <AntDesign name="filetext1" size={24} color="white" />
        <Text style={styles.cardText}>Terms & Conditions</Text>
      </TouchableOpacity>
      <TouchableOpacity 
                  onPress={()=>handleLink("privacypolicy")}

      style={styles.card}>
        <AntDesign name="lock" size={24} color="white" />
        <Text style={styles.cardText}>Privacy Policy</Text>
      </TouchableOpacity>
      <TouchableOpacity 
            onPress={()=>handleLink("aboutus")}

      style={styles.card}>
        <AntDesign name="infocirlceo" size={24} color="white" />
        <Text style={styles.cardText}>About Us</Text>
      </TouchableOpacity>
      <TouchableOpacity 
      onPress={()=>handleContactUs()}
      style={styles.card}>
        <AntDesign name="phone" size={24} color="white" />
        <Text style={styles.cardText}>Contact Us</Text>
      </TouchableOpacity>
      <TouchableOpacity 
            onPress={()=>handleContactUs()}

      style={styles.card}>
        <AntDesign name="deleteuser" size={24} color={Colors.danger} />
        <Text style={styles.cardText}>Deactivate Account</Text>
      </TouchableOpacity>
      <TouchableOpacity 
            onPress={()=>handleContactUs()}

      style={styles.card}>
        <AntDesign name="delete" size={24} color={Colors.danger} />
        <Text style={styles.cardText}>Delete Account</Text>
      </TouchableOpacity>

      <TouchableOpacity 
            onPress={()=>{
                AsyncStorage.clear()
                navigation.navigate("LoginScreen")
            }}

      style={styles.card}>
        <AntDesign name="delete" size={24} color={Colors.danger} />
        <Text style={styles.cardText}>Logout</Text>
      </TouchableOpacity>
      </ScrollView>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.MainBgColor, // Dark theme background color
    // padding: 20,
    alignItems:'center',
    width:WindowWidth
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.SecondaryDark, // Dark theme card background color
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    width:WindowWidth/1.12
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff', // White color for text in dark theme
  },
  cardText: {
    fontSize: 16,
    marginLeft: 10,
    color: '#fff',
  },
});

export default SettingScreen;
