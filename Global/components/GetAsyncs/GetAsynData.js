import AsyncStorage from "@react-native-async-storage/async-storage";

async function getAsynData(){
    try{
        const data = await AsyncStorage.getItem("user")
        const dataParsed = JSON.parse(data)
        if(dataParsed){
            return dataParsed
        }
        else{
            return null
        }
    }catch{
         return null
    }
}
export default getAsynData