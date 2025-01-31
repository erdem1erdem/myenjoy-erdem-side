import {View, Image, StyleSheet, Text} from "react-native"
import { myStyle } from "../../data"
const MyMessage = ({title})=>{
    return (
        <View style={styles?.container}>
            <Image
              source={require('../../assets/icons/no-results.png')}
              style={{ width: 120, height: 120 }}
            />
            <Text style={styles?.text}>
                {title}
            </Text>
        </View>
    )
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        gap: 15
    },
    text:{
        color: '#fff',
        ...myStyle?.primaryFontSize,
        fontWeight: "600"
    }
  })
export {MyMessage}