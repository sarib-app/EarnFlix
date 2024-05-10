import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker'; // Import Picker from @react-native-picker/picker
import { Colors } from '../../Global/Styling/Branding';
import HeaderMain from '../../Global/components/HeaderMain';
import BaseUrl from '../../Url';
import getAsynData from '../../Global/components/GetAsyncs/GetAsynData';
import { ScrollView } from 'react-native-gesture-handler';

// Sample list of banks for dropdown
const bankList = [
  { label: 'UBL', value: 'UBL' },
  { label: 'HBL', value: 'HBL' },
  { label: 'MCB', value: 'MCB' },
  { label: 'Meezan', value: 'Meezan' },
  { label: 'JazzCash', value: 'JazzCash' },
  { label: 'EasyPaisa', value: 'EasyPaisa' },
  // Add more banks as needed
];

const WithdrawFormScreen = () => {
  const [userId, setUserId] = useState('');
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [accountType, setAccountType] = useState('Meezan'); // Default account type
  const [accountTitle, setAccountTitle] = useState('');
  const [loading, setLoading] = useState(false);
  const [user,setUser]=useState(null)

  useEffect(() => {
   async function getAsync(){
    const data = await getAsynData()
    setUser(data)
   }
   getAsync()
  }, []);

  const handleSubmit = () => {
    // Form submission logic here, you can send data to API
    if(withdrawAmount && accountNumber && accountTitle){

        submitForm()
        console.log('Form submitted');
    }
    else{
        Alert.alert("Error","Please fill al the fields.")
    }
  };


  function submitForm(){
    setLoading(true)
    const formdata = new FormData();
formdata.append("userId", user.id);
formdata.append("withdrawAmount", withdrawAmount);
formdata.append("accountNumber", accountNumber);
formdata.append("accountType", accountType);
formdata.append("accountTitle", accountTitle);

const requestOptions = {
  method: "POST",
  body: formdata,
  redirect: "follow"
};

fetch(`${BaseUrl}withdraw-request`, requestOptions)
  .then((response) => response.json())
  .then((result) =>{
    console.log(result)
if(result.status == 200){
    Alert.alert("Success","Congratulations! your withdraw request has been submitted, you will soon recieve the amount!")
}else if(result.status === 401){
    Alert.alert("Error",result.message)
}
else{
    Alert.alert("Error","Something went wron please try again later !")
}

  })
  .catch((error) => console.error(error))
  .finally(()=>{
    setLoading(false)
  })
  }
  return (
    <View style={styles.container}>

        <HeaderMain/>
        <View style={styles.containerI}>
            <ScrollView>


      {/* <TextInput
        style={styles.input}
        placeholder="User ID"
        placeholderTextColor={Colors.placeHolder}
        value={userId}
        onChangeText={setUserId}
        keyboardType="numeric"
      /> */}
      <TextInput
        style={styles.input}
        placeholderTextColor={Colors.placeHolder}

        placeholder="Withdraw Amount"
        value={withdrawAmount}
        onChangeText={setWithdrawAmount}
        keyboardType="decimal-pad"
      />
      <TextInput
        style={styles.input}
        placeholderTextColor={Colors.placeHolder}

        placeholder="Account Number"
        value={accountNumber}
        onChangeText={setAccountNumber}
        keyboardType="numeric"
      />
      <View style={styles.pickerContainer}>
        <Text style={styles.label}>Account Type</Text>
        <Picker
          selectedValue={accountType}
          style={styles.picker}
          onValueChange={(itemValue) => setAccountType(itemValue)}>
          {bankList.map((bank, index) => (
            <Picker.Item key={index} label={bank.label} value={bank.value} color='black'/>
          ))}
        </Picker>
      </View>
      <TextInput
        style={styles.input}
        placeholderTextColor={Colors.placeHolder}

        placeholder="Account Title"
        value={accountTitle}
        onChangeText={setAccountTitle}
      />
      {
        loading === true ?
     <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Loading....</Text>
     </TouchableOpacity>
       :
     <TouchableOpacity style={styles.button} onPress={()=>handleSubmit()}>
       <Text style={styles.buttonText}>Submit</Text>
     </TouchableOpacity>
      }
     <View style={{height:300,width:10}}>

     </View>
     </ScrollView>

      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#222',
    // padding: 20,
  },
  containerI: {
    flex: 1,
    backgroundColor: '#222',
    padding: 20,
  },
  input: {
    backgroundColor: '#333',
    borderRadius: 10,
    color: '#fff',
    fontSize: 16,
    padding: 15,
    marginBottom: 20,
  },
  pickerContainer: {
    backgroundColor: '#333',
    borderRadius: 10,
    marginBottom: 20,
  },
  label: {
    color: '#fff',
    fontSize: 16,
    padding: 15,
  },
  picker: {
    color: '#fff',
  },
  button: {
    backgroundColor: Colors.send,
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default WithdrawFormScreen;
