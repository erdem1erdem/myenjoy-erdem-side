import {View, Text, StyleSheet} from "react-native"
import { RadioButton } from "react-native-paper"
const MyRadioButton= ({name, value, selectedOption, handleChange})=>{
    return (
        <View style={styles.radioButton2}>
            <RadioButton
                value={value}
                status={selectedOption === value ? 'checked' : 'unchecked'}
                onPress={(item) => handleChange(item)}
                color="#fff"
            />
            <Text style={styles.text2}>{name}</Text>
        </View>
    )
}
const styles = StyleSheet.create({
    text2: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '500',
    },
    radioButton2: {
        flexDirection: 'row',
        alignItems: 'center'
    }
})
export {MyRadioButton}