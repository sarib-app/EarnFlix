import { View, TextInput, StyleSheet, TouchableOpacity, Text,Dimensions} from 'react-native';
const WindowWidth = Dimensions.get('window').width
const WindowHeight = Dimensions.get('screen').height; 
import { Colors } from '../../Global/Styling/Branding';
const GlobalStyles = StyleSheet.create({
    container: {
        // flex: 1,
        width:WindowWidth,
        height:WindowHeight,
        backgroundColor: Colors.MainBgColor,
        alignItems:'center',
        // justifyContent: 'center',
        // alignItems:'center'
        // paddingHorizontal: 30,
      },
      
      videoContainer: {
        // flexDirection: 'row',
        width:WindowWidth,
        backgroundColor:Colors.MainBgColor,
        // alignItems: 'center',
        marginBottom: 5,
      },
      videoPlayerContainer:{
        width:WindowWidth,
        marginTop:20,
        height:250,
        // backgroundColor:Colors.SecondaryDark,
        // alignItems: 'center',
        marginBottom: 5,
        // height:WindowHeight/4,
        alignItems:'center',
        justifyContent:'center'
      },
      VideoContainerWrap:{
        // flex:1,
        width:WindowWidth,
        height:150,
        // backgroundColor:"white",
        // alignItems: 'center',
        // marginBottom: 5,
    
      },
      thumbnail: {
        width: "100%",
        height: 200,
        marginRight: 10,
      },
      videoDetails: {
        flex: 1,
        margin:10
      },
      videoPlayerDetails: {
        // flex: 1,
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
      MainHeaderView:{
        width:WindowWidth,
        // height:WindowHeight/10,
        backgroundColor:Colors.MainBgColor,
        padding:35,
        paddingBottom:5,
        justifyContent:'center',
        alignItems:'center',
        alignSelf:'center'
      },
      HeaderTitle:{
        color:Colors.lightTxtClr,
        fontWeight:'bold',
        fontSize:24,
        marginTop:10
      }
    });
    

  export default GlobalStyles