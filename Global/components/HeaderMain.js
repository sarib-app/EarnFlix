import react from "react";
import { View,Text } from "react-native";
import GlobalStyles from "../Styling/GlobalStyles";
function HeaderMain(){
return(
    <View style={GlobalStyles.MainHeaderView}>
        <Text style={GlobalStyles.HeaderTitle}>
            Earn Flix
        </Text>
    </View>
)
}
export default HeaderMain