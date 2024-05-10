import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, AppState, BackHandler ,StyleSheet, Alert} from 'react-native';
// import GlobalStyles from './Global/Styling/GlobalStyles';
import GlobalStyles from '../../Global/Styling/GlobalStyles';
import HeaderMain from '../../Global/components/HeaderMain';
import { WebView } from 'react-native-webview';
import { Colors } from '../../Global/Styling/Branding';
import { useFocusEffect } from '@react-navigation/native';
import { useIsFocused } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import getAsynData from '../../Global/components/GetAsyncs/GetAsynData';
import BaseUrl from '../../Url';
import BannerAdLarge from '../Ads/BannerAdLarge';
import BannerAdGlobal from '../Ads/BannerAbsolute';
const API_KEY = 'AIzaSyCfm2NMzrDNmzdj0-wvQTjPPtL8cwesOFI';
const API_URL = 'https://www.googleapis.com/youtube/v3/videos';

const   VideoPlayer = ({route}) => {
  const focused = useIsFocused()
  const navigation = useNavigation()
    const {videoID} = route.params
  const [VideoDetails, setVideoDetails] = useState(null);
  const [loading, setLaoding] = useState(false);
  const [user,setUser]=useState(null)

  useEffect(() => {
   async function getAsync(){
    const data = await getAsynData()
    setUser(data)
   }
   getAsync()
  }, []);
  useEffect(() => {
    if(!VideoDetails){

        fetchVideoDetails();
    }
  }, []);








  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setSeconds((prevSeconds) => prevSeconds + 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [focused]);

 

  const sendSeconds = async () => {
  setLaoding(true)
  console.log(seconds,seconds*0.01)
  const formdata = new FormData();
  formdata.append("userId", user.id);
  formdata.append("timeSpent", seconds);
  formdata.append("segmentEarning", seconds*0.01);
  
  const requestOptions = {
    method: "POST",
    body: formdata,
    redirect: "follow"
  };
  
  fetch(`${BaseUrl}post-user-records`, requestOptions)
    .then((response) => response.json())
    .then((result) => {

      if(result.status === 200){
        Alert.alert("Success","Progress save successfully!")
        setSeconds(0)
        navigation.goBack()
      }
    })
    .catch((error) => console.error(error))
    .finally(()=>{
      setLaoding(false)
  
      
    })
  };


  const fetchVideoDetails = async () => {
    try {
      const response = await fetch(`${API_URL}?id=${videoID}&key=${API_KEY}&part=snippet,contentDetails,statistics,status`);
      const data = await response.json();
      console.log(data)
      if (data.items && data.items.length > 0) {
        const videoDetails = data.items[0];
        console.log('Video Details:', videoDetails);
        setVideoDetails(videoDetails);
      } else {
        console.error('Video not found');
        // return null;
      }
    } catch (error) {
      console.error('Error fetching video details:', error);
    //   return null;
    }
  };
  
  const RenderVideoItem = () => (
  
      <View style={GlobalStyles.videoPlayerContainer}>
        {/* <Image
          source={{ uri: item.snippet.thumbnails.high.url }}
          style={GlobalStyles.thumbnail}
        /> */}

<WebView
     style={[GlobalStyles.VideoContainerWrap]}
    javaScriptEnabled={true}
    source={{uri: `https://www.youtube.com/embed/${videoID}?rel=0&autoplay=0&showinfo=0&controls=0`}}
/>
        <View style={GlobalStyles.videoPlayerDetails}>
          <Text style={GlobalStyles.videoTitle}>{VideoDetails?.snippet?.title}</Text>
          <View style={{flexDirection:'row',width:"100%",justifyContent:'space-between'}}>
          <Text style={GlobalStyles.channelName}>Views {VideoDetails?.statistics.viewCount}</Text>

          <Text style={GlobalStyles.channelName}>Likes {VideoDetails?.statistics.likeCount}</Text>
          </View>
          <Text style={GlobalStyles.channelName}>Published on: {new Date(VideoDetails.snippet.publishedAt).toDateString()}</Text>
          
        
        </View>
      </View>
 
  );

  const handleVideoPress = (videoId) => {
    // Handle video press (e.g., navigate to video player screen)
  };
console.log("S",seconds)
  return (
    <View style={[GlobalStyles.container,{backgroundColor:Colors.MainBgColor}]}>
        <HeaderMain/>
        <BannerAdGlobal/>
        {
            VideoDetails != null &&
            
      <View style={GlobalStyles.videoPlayerContainer}>
        {/* <Image
          source={{ uri: item.snippet.thumbnails.high.url }}
          style={GlobalStyles.thumbnail}
        /> */}

<WebView
     style={[GlobalStyles.VideoContainerWrap]}
    javaScriptEnabled={true}
    source={{uri: `https://www.youtube.com/embed/${videoID}?rel=0&autoplay=0&showinfo=0&controls=0`}}
/>
        <View style={GlobalStyles.videoPlayerDetails}>
          <Text style={GlobalStyles.videoTitle}>{VideoDetails?.snippet?.title}</Text>
          <View style={{flexDirection:'row',width:"100%",justifyContent:'space-between'}}>
          <Text style={GlobalStyles.channelName}>Views {VideoDetails?.statistics.viewCount}</Text>

          <Text style={GlobalStyles.channelName}>Likes {VideoDetails?.statistics.likeCount}</Text>
          </View>
          <Text style={GlobalStyles.channelName}>Published on: {new Date(VideoDetails.snippet.publishedAt).toDateString()}</Text>
          
        
        </View>
      </View>
    //  <RenderVideoItem />
        }

        <Text style={{color:Colors.FontColorI,textAlign:'center',margin:20}}>
          Make sure to hit the save progress button before you close app or this screen, otherwise you will loose your income.
        </Text>
        {loading ? 
          <TouchableOpacity 
          // onPress={()=> sendSeconds()}
          
          style={{paddingHorizontal:100,padding:15,borderRadius:10,backgroundColor:Colors.PrimaryColor}}>
          <Text style={{color:Colors.FontColorI,textAlign:'center',fontWeight:'bold',fontSize:16}}>Loading....</Text>
          </TouchableOpacity>:
            <TouchableOpacity 
            onPress={()=> sendSeconds()}
            
            style={{paddingHorizontal:100,padding:15,borderRadius:10,backgroundColor:Colors.PrimaryColor}}>
            <Text style={{color:Colors.FontColorI,textAlign:'center',fontWeight:'bold',fontSize:16}}> Save Progress</Text>
            </TouchableOpacity>
        }

        <BannerAdLarge/>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
flex:1,
    backgroundColor: '#1e1e1e', // Dark background color
    padding: 10,
  },
  videoContainer: {
    // flexDirection: 'row',
    width:"100%",
    backgroundColor:"black",
    // alignItems: 'center',
    marginBottom: 5,
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
  statsContainer: {
    flexDirection: 'row',
  },
  statsText: {
    color: '#9e9e9e', // Lighter text color
    fontSize: 12,
    marginRight: 10,
  },
});
export default  VideoPlayer;
