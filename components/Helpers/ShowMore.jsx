import { View, TouchableHighlight, Text, StyleSheet } from "react-native"
import { UIActivityIndicator } from 'react-native-indicators'

const ShowMore= ({loading, onPress, totalMovies})=>{
    return (
        <View style={styles.settingbut} >
            <TouchableHighlight
                underlayColor='#F83605'
                onPress={onPress}
                style={styles.btn}
                disabled={loading}
            >
                <View style={styles?.settingButtonInner}>
                    {
                        loading ? 
                        <UIActivityIndicator color='white' size={22} />
                        : 
                        <Text style={{ color: '#fff' }}>{totalMovies}</Text>
                    }
                </View>
            </TouchableHighlight>
        </View>
    )
}
const styles = StyleSheet.create({
    settingbut: {
        width: 200,
        alignItems: 'center'
    },
    settingButtonInner:{
        alignItems: 'center', 
        justifyContent: 'center', 
        gap: 5 
    },
    btn: {
        backgroundColor: '#3C3F45',
        height: 40,
        borderRadius: 4,
        justifyContent: 'center',
        width: '65%'
    },
})  
export {ShowMore}