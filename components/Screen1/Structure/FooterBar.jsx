import { useSelector } from "react-redux"
import {View, Text, StyleSheet} from "react-native"
import { useTranslation } from "react-i18next"

const FooterBar= ()=>{
    const { t } = useTranslation();
    const {macAddress} = useSelector((state) => state?.portals)
    return (
        <View style={styles.mac}>
            <Text style={[styles.macaddress, { fontWeight: '600' }]}>{t('mac_address')}</Text>
            <Text style={styles.macaddress}>
                {
                    macAddress || "XX:XX:XX:XX:XX:XX"
                }
            </Text>
        </View>
    )
}
const styles = StyleSheet.create({
    mac: {
        flexDirection: 'row',
        width: '100%',
        height: 50,
        backgroundColor: '#F83605',
        alignItems: 'center',
        position: 'absolute',
        justifyContent: 'center',
        bottom: 0,
        left: 0,
        right: 0
    },
    macaddress: {
        color: 'white',
        fontSize: 18,

    }
})
export {FooterBar}