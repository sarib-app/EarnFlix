import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity ,StyleSheet} from 'react-native';
// import GlobalStyles from './Global/Styling/GlobalStyles';
import GlobalStyles from '../../Global/Styling/GlobalStyles';
import HeaderMain from '../../Global/components/HeaderMain';
import { useNavigation } from '@react-navigation/native';
import BannerAdGlobal from '../Ads/BannerAbsolute';
const API_KEY = 'AIzaSyCfm2NMzrDNmzdj0-wvQTjPPtL8cwesOFI';
const API_URL = 'https://www.googleapis.com/youtube/v3/search';

const   HomeScreen = () => {
  const [videos, setVideos] = useState([]);
const navigation = useNavigation()
  useEffect(() => {
    if(videos.length < 1){

      fetchTopVideos();
    }
  }, []);

  const fetchTopVideos = async () => {
    try {
      const response = await fetch(`${API_URL}?key=${API_KEY}&part=snippet&maxResults=30&type=video&chart=mostPopular&regionCode=PK`);
      const data = await response.json();
      setVideos(data.items);
      console.log(data.items)
    } catch (error) {
      console.error('Error fetching top videos:', error);
    }
  };

  const renderVideoItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleVideoPress(item.id.videoId)}>
      <View style={GlobalStyles.videoContainer}>
        <Image
          source={{ uri: item.snippet.thumbnails.high.url }}
          style={GlobalStyles.thumbnail}
        />
        <View style={GlobalStyles.videoDetails}>
          <Text style={GlobalStyles.videoTitle}>{item.snippet.title}</Text>
          <Text style={GlobalStyles.channelName}>{item.snippet.channelTitle}</Text>
        
        </View>
      </View>
    </TouchableOpacity>
  );

  const handleVideoPress = (videoId) => {
    // Handle video press (e.g., navigate to video player screen)
    navigation.navigate("VideoPlayer",{videoID:videoId})
  };

  return (
    <View style={GlobalStyles.container}>
        <HeaderMain/>
        <BannerAdGlobal/>
      <FlatList
        data={videos}
        renderItem={renderVideoItem}
        keyExtractor={(item) => item.id.videoId}
      />
      <View style={{position:'absolute',bottom:100}}>
      <BannerAdGlobal/>
      </View>
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
export default  HomeScreen;
