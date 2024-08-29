import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import GlobalStyles from '../../Global/Styling/GlobalStyles';
import RegionalStyles from './RegionalStyles';
import HeaderMain from '../../Global/components/HeaderMain';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BannerAdSmall from '../Ads/BAnnerAdsSmall';
import { InterstitialAd, AdEventType, TestIds } from 'react-native-google-mobile-ads';

const API_KEY = 'AIzaSyCfm2NMzrDNmzdj0-wvQTjPPtL8cwesOFI';
const API_URL = 'https://www.googleapis.com/youtube/v3/search';

const interstitialAdId = __DEV__ ? TestIds.INTERSTITIAL : 'ca-app-pub-3440105356857943/1889997557';
const interstitial = InterstitialAd.createForAdRequest(interstitialAdId);

const RegionalScreen = () => {
  const navigation = useNavigation();
const focused = useIsFocused()

  const [videos, setVideos] = useState([]);
  const [videosUs, setVideosUS] = useState([]);
  const [videosIn, setVideosIn] = useState([]);
  const [videosUk, setVideosUK] = useState([]);
  const [selected, setSelected] = useState('US');
  const [isAdLoaded, setIsAdLoaded] = useState(false);

  useEffect(() => {
    loadVideosFromStorage(selected);

  }, [selected]);
useEffect(()=>{
  const unsubscribe = interstitial.addAdEventListener(AdEventType.LOADED, () => {
    setIsAdLoaded(true);
  });

  interstitial.load();

  return () => {
    unsubscribe();
  };
},[focused])
  const loadVideosFromStorage = async (regionCode) => {
    try {
      const storedVideos = await AsyncStorage.getItem(`videos_${regionCode}`);
      if (storedVideos) {
        const parsedVideos = JSON.parse(storedVideos);
        updateVideosState(regionCode, parsedVideos);
      } else {
        fetchTopVideos(regionCode);
      }
    } catch (error) {
      console.error('Error loading videos from storage:', error);
      fetchTopVideos(regionCode);
    }
  };

  const fetchTopVideos = async (regionCode) => {
    console.log("api running")
    try {
      const response = await fetch(`${API_URL}?key=${API_KEY}&part=snippet&maxResults=30&type=video&chart=mostPopular&regionCode=${regionCode}`);
      const data = await response.json();
      saveVideosToStorage(regionCode, data.items);
      updateVideosState(regionCode, data.items);
    } catch (error) {
      console.error('Error fetching top videos:', error);
    }
  };

  const saveVideosToStorage = async (regionCode, videos) => {
    try {
      await AsyncStorage.setItem(`videos_${regionCode}`, JSON.stringify(videos));
    } catch (error) {
      console.error('Error saving videos to storage:', error);
    }
  };

  const updateVideosState = (regionCode, videos) => {
    if (regionCode === 'US') {
      setVideosUS(videos);
    } else if (regionCode === 'UK') {
      setVideosUK(videos);
    } else if (regionCode === 'IN') {
      setVideosIn(videos);
    }
    setVideos(videos);
  };

  const handleVideo = (regionCode) => {
    setSelected(regionCode);
  };


  const handleVideoPress = (videoId) => {
    if (isAdLoaded) {
      interstitial.show();
      interstitial.addAdEventListener(AdEventType.CLOSED, () => {
        navigation.navigate('VideoPlayer', { videoID: videoId });
        interstitial.load(); // Load the next ad
      });
    } else {
      navigation.navigate('VideoPlayer', { videoID: videoId });
    }
  };

  const renderVideoItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleVideoPress(item.id.videoId)}>
      <View style={RegionalStyles.videoContainer}>
        <Image
          source={{ uri: item.snippet.thumbnails.high.url }}
          style={RegionalStyles.thumbnail}
        />
      </View>
    </TouchableOpacity>
  );


  const Regions = [
    {
      id: 1,
      code: 'US',
    },
    {
      id: 2,
      code: 'UK',
    },
    {
      id: 3,
      code: 'IN',
    },
  ];

  return (
    <View style={GlobalStyles.container}>
      <HeaderMain />
      <View style={{ height: 60 }}>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          {Regions.map((item) => (
            <TouchableOpacity
              key={item.id}
              onPress={() => handleVideo(item.code)}
              style={{
                borderColor: 'white',
                backgroundColor: selected === item.code ? 'white' : 'transparent',
                borderWidth: 1,
                borderRadius: 1000,
                width: 100,
                height: 30,
                margin: 5,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Text style={{ color: selected === item.code ? 'black' : 'white' }}>
                {item.code}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
<BannerAdSmall/>
      <FlatList
        data={videos}
        numColumns={2}
        renderItem={renderVideoItem}
        keyExtractor={(item) => item.id.videoId}
      />
           <View style={{position:'absolute',bottom:100}}> 

<BannerAdSmall/>
</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    backgroundColor: '#1e1e1e',
    padding: 10,
  },
  videoContainer: {
    width: '100%',
    backgroundColor: 'black',
    marginBottom: 5,
  },
  thumbnail: {
    width: '100%',
    height: 200,
    marginRight: 10,
  },
  videoDetails: {
    flex: 1,
    margin: 10,
  },
  videoTitle: {
    color: '#ffffff',
    fontSize: 16,
    marginBottom: 5,
  },
  channelName: {
    color: '#9e9e9e',
    fontSize: 14,
    marginBottom: 5,
  },
  statsContainer: {
    flexDirection: 'row',
  },
  statsText: {
    color: '#9e9e9e',
    fontSize: 12,
    marginRight: 10,
  },
});

export default RegionalScreen;
