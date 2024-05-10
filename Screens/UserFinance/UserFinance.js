import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Colors } from '../../Global/Styling/Branding';
import HeaderMain from '../../Global/components/HeaderMain';
import { useNavigation } from '@react-navigation/native';
import BaseUrl from '../../Url';
import getAsynData from '../../Global/components/GetAsyncs/GetAsynData';
const API_URL = 'http://api.earnflixofficial.com/api/get-user-finance/5';

const FinanceScreen = () => {
  const [financeData, setFinanceData] = useState(null);
  const navigation = useNavigation()



  const [user,setUser]=useState(null)

  useEffect(() => {
   async function getAsync(){
    const data = await getAsynData()
    // setUser(data)
    fetchFinanceData(data);
   }
   getAsync()
  }, []);


//   useEffect(() => {
 
//   }, []);

  const fetchFinanceData = async (user) => {
    console.log(user.id)
    try {
      const response = await fetch(`${BaseUrl}get-user-finance/${user.id}`);
      const data = await response.json();
      console.log(data)
      if(data.status === 200)
 
        setFinanceData(data.data);
       else {
        console.error('Failed to fetch finance data:', data.message);
      }
    } catch (error) {
      console.error('Error fetching finance data:', error);
    }
  };
  const Widget = ({ icon, label, value ,color}) => (
    <View style={styles.widgetContainer}>
      <AntDesign name={icon} size={30} color={color} />
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
  
  const ActionWidget = ({ icon, label ,color, route}) => (
    <TouchableOpacity 
    onPress={()=> navigation.navigate(route) }
    
    style={styles.actionWidgetContainer}>
      <AntDesign name={icon} size={30} color={color} />
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
  return (
    <View style={styles.container}>
        <HeaderMain/>
        <View style={styles.containerI}>

      <Widget
        icon="arrowdown"
        label="Total Withdraw"
        value={financeData ? financeData.total_withdraw : '-'}
        color={Colors.danger}
      />
      <Widget
        icon="bank"
        label="Total Balance"
        value={financeData ? financeData.total_balance : '-'}
        color={Colors.deposit}

      />
      <Widget
        icon="arrowup"
        label="Total Income"
        value={financeData ? financeData.total_income : '-'}
        color={Colors.send}

      />
      <ActionWidget icon="bank" label="Withdraw Now"  color={Colors.PrimaryColor} route="WithdrawFormScreen" />
      <ActionWidget icon="filetext1" label="Withdraw History" color={Colors.SeconderyColor} route="WithdrawHistoryScreen"/>
      <ActionWidget icon="linechart" label="Income History" color={Colors.send} route="SegmentEarning"/>
      </View>

    </View>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    // flexDirection: 'row',
    // flexWrap: 'wrap',
    // justifyContent: 'space-between',
    // padding: 0,
    // paddingTop:0,
    backgroundColor: '#222',
  },
  containerI: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 20,
    // paddingTop:0,
    backgroundColor: '#222',
  },

  widgetContainer: {
    width: '48%',
    backgroundColor: '#333',
    padding: 15,
    marginBottom: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  actionWidgetContainer: {
    width: '48%',
    backgroundColor: '#333',
    padding: 15,
    marginBottom: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    textAlign:'center'
  },
  value: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default FinanceScreen;
