import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import HeaderMain from '../../Global/components/HeaderMain';
import getAsynData from '../../Global/components/GetAsyncs/GetAsynData';
import BaseUrl from '../../Url';
import { Colors } from '../../Global/Styling/Branding';

const API_URL = 'http://api.earnflixofficial.com/api/get-all-withdraws-user-id/1';

const WithdrawHistoryScreen = () => {
  const [withdraws, setWithdraws] = useState([]);

  useEffect(() => {
    async function getAsync(){
     const data = await getAsynData()
     // setUser(data)
     fetchWithdraws(data);
    }
    getAsync()
   }, []);
 
 

  const fetchWithdraws = async (user) => {
    try {
      const response = await fetch(`${BaseUrl}get-all-withdraws-user-id/${user.id}`);
      const data = await response.json();
      console.log(data)
      if (response.status=== 200) {
        setWithdraws(data.data);
      } else {
        console.error('Failed to fetch withdraw history:', data.message);
      }
    } catch (error) {
      console.error('Error fetching withdraw history:', error);
    }
  };

  return (
    <View style={styles.container}>
         <HeaderMain/>
         {
                withdraws.length < 1 &&
                <Text style={{color:Colors.FontColorI,fontWeight:'bold',fontSize:18,alignSelf:'center',marginTop:300}}>We could not find any record</Text>
            }
        <View style={styles.containerI}>
          
      {withdraws.map((withdraw, index) => (
        <WithdrawCard key={index} withdraw={withdraw} />
      ))}
      </View>
    </View>
  );
};

const WithdrawCard = ({ withdraw }) => (
  <View style={styles.card}>
    <View style={styles.row}>
      <Text style={styles.label}>Withdraw Amount:</Text>
      <Text style={styles.value}>{withdraw.withdraw_amount}</Text>
      <TouchableOpacity style={styles.arrow}>
        <AntDesign name="arrowup" size={24} color="red" />
      </TouchableOpacity>
    </View>
    <View style={styles.row}>
      <Text style={styles.label}>Account Type:</Text>
      <Text style={styles.value}>{withdraw.account_type}</Text>
    </View>
    <View style={styles.row}>
      <Text style={styles.label}>Approved:</Text>
      <Text style={styles.value}>{withdraw.approved === '1' ? 'Yes' : 'No'}</Text>
    </View>
    <View style={styles.row}>
      <Text style={styles.label}>Created At:</Text>
      <Text style={styles.value}>{withdraw.created_at}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#222',
  },
  containerI: {
    flex: 1,
    padding: 20,
  },
  card: {
    backgroundColor: '#333',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
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
  arrow: {
    marginLeft: 10,
  },
});

export default WithdrawHistoryScreen;
