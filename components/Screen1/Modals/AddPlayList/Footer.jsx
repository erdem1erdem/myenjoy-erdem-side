import { View, Text, TouchableHighlight, StyleSheet } from "react-native"
import { UIActivityIndicator } from 'react-native-indicators'
import { useSelector } from "react-redux"
import { useTranslation } from "react-i18next"
const Footer= ({loading, handleConfirm})=>{
    const { t } = useTranslation();
    return (
        <View style={styles.buttoncontainer}>
            <TouchableHighlight
                underlayColor="#F83605"
                onPress={handleConfirm}
                style={styles.button}
            >
                <View>
                {loading ? (
                        <UIActivityIndicator color='white' size={22} />
                      ) : (
                        <Text style={{ color: '#fff' }}>{t('add_portal')}</Text>
                      )}
                </View>
            </TouchableHighlight>
        </View>
    )
}
const styles = StyleSheet.create({
    button: {
        borderRadius: 3,
        alignItems: 'center',
        justifyContent: 'center',
        width: 83,
        height: 30,
        backgroundColor: '#3C3F45'
    },
    buttoncontainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "center",
        height: 50,
    }
})
export {Footer}