import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity,Dimensions } from 'react-native';
import HeaderMain from '../../Global/components/HeaderMain';
import { Colors } from '../../Global/Styling/Branding';
import BaseUrl from '../../Url';
import getAsynData from '../../Global/components/GetAsyncs/GetAsynData';
import { useIsFocused } from '@react-navigation/native';
const WindowWidth = Dimensions.get('window').width
const WindowHeight = Dimensions.get('window').height; 

// const API_URL = `http://api.earnflixofficial.com/api/get-user-records/`;

const SegmentEarning = () => {
    const focused = useIsFocused()
  const [records, setRecords] = useState([]);

  useEffect(() => {
    async function getAsync(){
     const data = await getAsynData()
     // setUser(data)
     fetchRecords(data);
    }
    getAsync()
   }, [focused]);
 
 
  const fetchRecords = async (user) => {
    try {
      const response = await fetch(`${BaseUrl}get-user-records/${user.id}`);
      const data = await response.json();
      if (response.status===200) {
        setRecords(data.data);
      } else {
        console.error('Failed to fetch records:', data.message);
      }
    } catch (error) {
      console.error('Error fetching records:', error);
    }
  };

  return (
    <View style={styles.container}>
        <HeaderMain/>
        {
                records.length < 1 &&
                <Text style={{color:Colors.FontColorI,fontWeight:'bold',fontSize:18,alignSelf:'center',marginTop:300}}>We could not find any record</Text>
            }
      {records.map((record, index) => (
        <View key={index} style={styles.card}>
          <View style={styles.cardRow}>
            <Text style={styles.label}>Time Spent:</Text>
            <Text style={styles.value}>{record.time_spent}</Text>
          </View>
          <View style={styles.cardRow}>
            <Text style={styles.label}>Earning:</Text>
            <Text style={styles.value}>{record.segment_earning}</Text>
            <TouchableOpacity style={styles.incomeIndicator}>
              <Text style={styles.incomeArrow}>↓</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.cardRow}>
            <Text style={styles.label}>Created At:</Text>
            <Text style={styles.value}>{record.created_at}</Text>
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#222',
    width:WindowWidth,
    alignItems:'center'
    // padding: 20,
  },
  card: {
    backgroundColor: '#333',
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
    width:WindowWidth/1.05
  },
  cardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  label: {
    flex: 1,
    color: '#fff',
    fontWeight: 'bold',
  },
  value: {
    flex: 2,
    color: '#fff',
  },
  incomeIndicator: {
    // backgroundColor: 'green',
    borderRadius: 20,
    padding: 5,
  },
  incomeArrow: {
    color: "green",
    fontSize: 22,
    transform: [{ rotate: '45deg' }],
    
  },
});

export default SegmentEarning;
