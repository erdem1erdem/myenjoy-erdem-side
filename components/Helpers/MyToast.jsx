import { View, StyleSheet, Text} from "react-native"

const MyToast= ({type, message})=>{
    retrun (
        <View style={styles?.containter}>
            <Text>
            This is RN Toast
            </Text>
        </View>
    )
}
const styles = StyleSheet.create({
})
export {MyToast}