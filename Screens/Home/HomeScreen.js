import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import GlobalStyles from '../../Global/Styling/GlobalStyles';
import HeaderMain from '../../Global/components/HeaderMain';
import BannerAdGlobal from '../Ads/BannerAbsolute';
import BannerAdSmall from '../Ads/BAnnerAdsSmall';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { InterstitialAd, AdEventType, TestIds } from 'react-native-google-mobile-ads';

const API_KEY = 'AIzaSyCfm2NMzrDNmzdj0-wvQTjPPtL8cwesOFI';
const API_URL = 'https://www.googleapis.com/youtube/v3/search';

const interstitialAdId = __DEV__ ? TestIds.INTERSTITIAL : 'ca-app-pub-3440105356857943/1889997557';
const interstitial = InterstitialAd.createForAdRequest(interstitialAdId);

const HomeScreen = () => {
  const [videos, setVideos] = useState([]);
  const [isAdLoaded, setIsAdLoaded] = useState(false);
  const navigation = useNavigation();
const focused = useIsFocused()
  useEffect(() => {
    checkAndFetchVideos();
// AsyncStorage.clear()
    // Load interstitial ad
    const unsubscribe = interstitial.addAdEventListener(AdEventType.LOADED, () => {
      setIsAdLoaded(true);
    });

    interstitial.load();

    return () => {
      unsubscribe();
    };
  }, [focused]);

  const checkAndFetchVideos = async () => {
    try {
      const savedVideos = await AsyncStorage.getItem('topVideos');
      if (savedVideos) {
        setVideos(JSON.parse(savedVideos));
        console.log('Loaded videos from AsyncStorage');
      } else {
        fetchTopVideos();
      }
    } catch (error) {
      console.error('Error checking and fetching videos:', error);
    }
  };

  const fetchTopVideos = async () => {
    console.log("function ran")
    try {
      const response = await fetch(`${API_URL}?key=${API_KEY}&part=snippet&maxResults=30&type=video&chart=mostPopular&regionCode=PK`);
      const data = await response.json();
      setVideos(data.items);
      await AsyncStorage.setItem('topVideos', JSON.stringify(data.items));
      console.log('Fetched and saved videos to AsyncStorage');
    } catch (error) {
      console.error('Error fetching top videos:', error);
    }
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

  return (
    <View style={GlobalStyles.container}>
      <HeaderMain />
      <BannerAdGlobal />
      <FlatList
        data={videos}
        renderItem={renderVideoItem}
        keyExtractor={(item) => item.id.videoId}
      />
      <View style={{ position: 'absolute', bottom: 100 }}>
        <BannerAdSmall />
      </View>
    </View>
  );
};

export default HomeScreen;
