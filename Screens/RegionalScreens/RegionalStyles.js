import { View, TextInput, StyleSheet, TouchableOpacity, Text,Dimensions} from 'react-native';
const WindowWidth = Dimensions.get('window').width
const WindowHeight = Dimensions.get('screen').height; 
import { Colors } from '../../Global/Styling/Branding';
const RegionalStyles = StyleSheet.create({
    container: {
        // flex: 1,
        width:WindowWidth,
        height:WindowHeight,
        backgroundColor: Colors.SecondaryDark,
        // justifyContent: 'center',
        // alignItems:'center'
        // paddingHorizontal: 30,
      },
      
      videoContainer: {
        // flexDirection: 'row',
        width:WindowWidth/2.05,
        // backgroundColor:"black",
        // alignItems: 'center',
        margin: 2,
      },
      thumbnail: {
        width: "100%",
        height: 100,
        // marginRight: 10,
      },
      videoDetails: {
        flex: 1,
        margin:10
      },
      videoTitle: {
        color: '#ffffff', // White text color
        fontSize: 16,
        marginBottom: 5,
      },
      channelName: {
        color: '#9e9e9e', // Lighter text color
        fontSize: 14,
        marginBottom: 5,
      },
  

    });
    

  export default RegionalStyles