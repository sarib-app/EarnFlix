import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Colors } from '../../Global/Styling/Branding';
const LinkScreen = ({  }) => {
    const navigation = useNavigation()
  const [videoLink, setVideoLink] = useState('');
  const [videoId, setVideoId] = useState('');

  const handleLetsGo = () => {
    if(videoLink){

    // Extract video ID from the link
    const idIndex = videoLink.indexOf('si=') + 3; // Find the index where the video ID starts
    const id = videoLink.substring(idIndex); // Get the substring starting from the video ID index
    setVideoId(id);
    console.log(id)

    // Navigate to the next screen with video ID as a parameter
    navigation.navigate('VideoPlayer', { videoID: id });
}

  };

  return (
    <View style={styles.container}>
        <Text style={{textAlign:'center',color:Colors.FontColorI,fontWeight:'bold',fontSize:35}}>
            Watch Your Desired Video
        </Text>
        <Text style={{textAlign:'center',color:Colors.FontColorI,fontWeight:'300',fontSize:14,margin:10}}>
            Just copy the link of a video from youtube paste it here and enjoy !
        </Text>
      <TextInput
        style={styles.input}
        placeholder="Paste YouTube video link here"
        value={videoLink}
        onChangeText={setVideoLink}
      />
      <TouchableOpacity style={styles.button} onPress={handleLetsGo}>
        <Text style={styles.buttonText}>Let's Go</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.MainBgColor,
    padding: 20,
    justifyContent: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.FontColorI,
    backgroundColor:Colors.FontColorI,
    borderRadius: 5,
    padding: 20,
    marginBottom: 20,
  },
  button: {
    backgroundColor: Colors.PrimaryColor,
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default LinkScreen;
