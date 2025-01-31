import { useNavigation } from '@react-navigation/core'
import { useState } from 'react'
import { View, StyleSheet, ToastAndroid } from 'react-native'
import { MyButton, PinModal } from '../Helpers'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next';

const EndButtons = () => {
    const { t } = useTranslation();
    const {portalExpiry}= useSelector(state=> state?.portals)
    const [visiblePinModal, setVisiblePinModal]= useState(false)
    const navigation = useNavigation()
  
    const button2 = [
        {
            title: t('main_menu'),
            iconname: 'menu',
            onPress: () => navigation.navigate('Screen1')
        },
        {
            title: t('settings'),
            iconname: 'settings-outline',
            onPress: ()=> setVisiblePinModal(true),
            
        },
        {
            title: t('expire_date'),
            iconname: 'calendar-outline'
        }

    ]

    const handlePress = (index, item) => {
        if(index===2)
            ToastAndroid.showWithGravity(portalExpiry, 10000, ToastAndroid.CENTER)
        else if (index === 0 || index === 1) 
            item.onPress()
    }

    return (
        <>
            <View style={styles.lastview}>
                {
                    button2.map((item, index) => (
                        <View key={index} style={styles.innerview}>
                            <MyButton
                                isCircular
                                icon={item.iconname}
                                title={item.title}
                                onPress={() => handlePress(index, item)}
                                buttonCoverStyle={{width: 85}}
                            />
                        </View>
                    ))
                }
            </View>
            <PinModal
                visible={visiblePinModal} 
                onVerify= {()=>{navigation.navigate('Screen8')}}
                onClose={()=>{setVisiblePinModal(false)}}
                title = {t('go_to_settings')}
            />
        </>
    )
}
const styles = StyleSheet.create({
 
    lastview: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: 90,
    }
})

export { EndButtons }


