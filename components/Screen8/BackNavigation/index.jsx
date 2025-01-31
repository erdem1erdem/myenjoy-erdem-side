import { useNavigation } from '@react-navigation/core'
import { Image, StyleSheet, Text, TouchableHighlight, View } from 'react-native'
import { myStyle } from '../../../data'
import { useTranslation } from 'react-i18next'

const BackNavigation = ({focused, setfocused}) => {
    const navigation = useNavigation()
    const {t} = useTranslation()

    return (
        <TouchableHighlight
            onFocus={()=>setfocused(true)}
            onPress={()=>navigation.navigate('Screen1')}
        >
            <View style={styles.container}>
                <Image
                    source={require('../../../assets/icons/backbutton.png')}
                    style={styles.image}
                />
                <Text style={[styles.text, {color: focused === true? myStyle?.colors?.primaryColor : 'white'}]}>{t('main_menu')}</Text>
            </View>
        </TouchableHighlight>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection:'row',
        alignItems:'center',
        gap:10,
        marginLeft:20
    },
    image: {
        width: 15,
        height: 15,
    },
    text:{
        color:'white',
        fontSize:14,
        fontWeight:'400',
        borderBottomColor:'white',
        borderBottomWidth:1
    }
})

export { BackNavigation }
