import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity ,StyleSheet, ScrollView} from 'react-native';
// import GlobalStyles from './Global/Styling/GlobalStyles';
import GlobalStyles from '../../Global/Styling/GlobalStyles';
import RegionalStyles from './RegionalStyles';
import HeaderMain from '../../Global/components/HeaderMain';
import { flushSync } from 'react-dom';

const API_KEY = 'AIzaSyCfm2NMzrDNmzdj0-wvQTjPPtL8cwesOFI';
const API_URL = 'https://www.googleapis.com/youtube/v3/search';
import { useNavigation } from '@react-navigation/native';

const   RegionalScreen = () => {
    const navigation = useNavigation()
  const [videos, setVideos] = useState([]);
  const [videosUs,setVideosUS]=useState([])
  const [videosIn,setVideosIn]=useState([])

  const [videosUk,setVideosUK]=useState([])
  const [selected,setSelected]=useState("US")


  useEffect(() => {
    if(videos.length < 1){

      fetchTopVideos(selected);
    }
  }, []);

  const fetchTopVideos = async (selected) => {
    try {
      const response = await fetch(`${API_URL}?key=${API_KEY}&part=snippet&maxResults=30&type=video&chart=mostPopular&regionCode=${selected}`);
      const data = await response.json();
      if(selected === "US" ){
        
          setVideosUS(data.items);
      }
      else if(selected === "UK"){
        setVideosUK(data.items);

      }
      else if(selected === "IN"){
        setVideosIn(data.items);

      }
      setVideos(data.items)
    //   console.log(data.items)
    } catch (error) {
      console.error('Error fetching top videos:', error);
    }
  };

 function handleVideo(selected){
    if(selected === "US" && videosUs.length < 1){
        
        fetchTopVideos(selected);
    }
    else if(selected === "UK" && videosUk.length < 1 ){
        fetchTopVideos(selected);

    }
    else if(selected === "IN" && videosIn.length < 1){
        fetchTopVideos(selected);

    }
    else{
        console.log("nothing fetched")
    }
 }

 const data = selected === "US" ? videosUs :selected === "UK" ? videosUk:videosIn

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
  

  const handleVideoPress = (videoId) => {
    // Handle video press (e.g., navigate to video player screen)
    navigation.navigate("VideoPlayer",{videoID:videoId})
  };

  const Regions  = [
    {
        id:1,
        code:"US"
    },
    {
        id:2,
        code:"UK"
    },
    {
        id:3,
        code:"IN"
    }
  ]
  return (
    <View style={GlobalStyles.container}>
        <HeaderMain/>
        <View style={{height:60}}>

        <ScrollView 
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        >
            {
                Regions.map((item)=>{
                    return(
<TouchableOpacity
onPress={()=> {
    handleVideo(item.code)
    setSelected(item.code)}}
            style={{borderColor:"white",backgroundColor:selected === item.code ? "white":"transparent",borderWidth:1,
            
            borderRadius:1000,width:100,height:30,margin:5,justifyContent:'center',alignItems:'center'}}
            >
                <Text style={{color:selected === item.code ? "black":"white"}}>
                    {item.code}
                </Text>

            </TouchableOpacity>
                    )
                })
            }
            
        </ScrollView>
        </View>

      <FlatList
        data={data}
        numColumns={2}
        renderItem={renderVideoItem}
        keyExtractor={(item) => item.id.videoId}
      />
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
export default  RegionalScreen;
