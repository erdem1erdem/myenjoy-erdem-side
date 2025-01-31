import { useState} from 'react'
import { View, Image, Text, StyleSheet, Dimensions} from 'react-native'
import { AddPlayList } from '..'
import { MyButton } from '../../Helpers'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'


    const MainRightSideArea= ()=>{
    const { t } = useTranslation();
    const windowHeight = Dimensions.get('window').height
    const port = useSelector((state) => state?.portals)
    const [showModal, setShowModal] = useState(false)
    const currentDate = new Date()

    const options = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
        timeZone: 'Europe/Istanbul' 
    };
    
    const date = currentDate.toLocaleString('tr-TR', options);
    const toggleModal = () => {
        setShowModal(!showModal)
    }

    return (
        <>
            <View style={[styles.rightView, {height: windowHeight - 50}]}>
                {/* <View style={{ position: 'absolute', right:10, top: 10 }}>
                    <Text style={styles.date}>{date}</Text>
                </View> */}
                <View style={{ alignItems: 'center', justifyContent: 'center', marginBottom: 10 }}>
                    <View style={{borderRadius: 4, alignItems: 'center' }}>
                        <Image source={require('../../../assets/logo1.png')} style={styles.logo1} />
                    </View>
                    <MyButton
                        hasTVPreferredFocus={!port?.data?.length}
                        title= {t('add_new_portal')}
                        onPress={toggleModal}         
                        icon= "add-circle"
                        style={{width: 160, marginTop: 10}}
                    />
                </View>
            </View>
            <AddPlayList 
                visible={showModal} 
                onClose={toggleModal} 
            />
        </>
    )
}
const styles = StyleSheet.create({
    rightView: {
        flex: 0.8,
        backgroundColor: 'black',
        height: '100%',
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        fontSize: 16,
        color: 'white',
    },
    logo1: {
        width: 300,
        height: 90
    },
    date: {
        backgroundColor: '#F83605',
        width: 170,
        height: 40,
        paddingTop: 10,
        textAlign: 'center',
        color: 'white',
        fontWeight: '500',
        borderRadius: 4
    }
})
export {MainRightSideArea}