import react from "react";
import { TouchableOpacity } from "react-native";
import { Colors } from "./Branding";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
function GoBack(){
    const navigation = useNavigation()
    return(
        <TouchableOpacity
        onPress={()=>navigation.goBack()}
        >
  
      <Ionicons name="arrow-back-circle" size={28} color={Colors.PrimaryColor} />
        </TouchableOpacity>
    )
}
export default GoBack