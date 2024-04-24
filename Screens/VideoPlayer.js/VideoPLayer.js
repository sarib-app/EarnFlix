import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity ,StyleSheet} from 'react-native';
// import GlobalStyles from './Global/Styling/GlobalStyles';
import GlobalStyles from '../../Global/Styling/GlobalStyles';
import HeaderMain from '../../Global/components/HeaderMain';
import { WebView } from 'react-native-webview';
import { Colors } from '../../Global/Styling/Branding';

const API_KEY = 'AIzaSyCfm2NMzrDNmzdj0-wvQTjPPtL8cwesOFI';
const API_URL = 'https://www.googleapis.com/youtube/v3/videos';

const   VideoPlayer = ({route}) => {
    const {videoID} = route.params
  const [VideoDetails, setVideoDetails] = useState(null);

  useEffect(() => {
    if(!VideoDetails){

        fetchVideoDetails();
    }
  }, []);

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

  return (
    <View style={[GlobalStyles.container,{backgroundColor:Colors.SecondaryDark}]}>
        <HeaderMain/>
        {
            VideoDetails != null &&
     <RenderVideoItem />
        }
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
