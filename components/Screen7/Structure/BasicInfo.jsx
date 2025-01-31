import { useSelector } from 'react-redux'
import { View, Text, Image, StyleSheet } from 'react-native'
import { myStyle } from '../../../data'
import { helpers } from '../../../shared'
import { useTranslation } from 'react-i18next'

const BasicInfo= ({state, seasons})=>{
    const { t } = useTranslation()
    const {currentMedia} = useSelector((state) => state?.portals)
    return (
        <View style={styles.detail}>
            <View>
                <Text style={styles.heading}>{t('release_date')}</Text>
                <View style={{flexDirection:'row',alignItems:'center'}}>
                    <Text style={styles.text2}>
                        {
                            state?.releaseDate || helpers?.extractYear(state?.name) || 'N/A'
                        }
                    </Text>
                </View>                      
            </View>
            <View>
                <Text style={styles.heading}>{t('category')}</Text>
                <View style={{flexDirection:'row',alignItems:'center'}}>
                    <Text style={styles.text2}>{state?.category}</Text>
                </View>                      
            </View>
            {
                currentMedia===3 &&
                <View>
                    <Text style={styles.heading}>{t('seasons')}</Text>
                    <View style={{flexDirection:'row',alignItems:'center'}}>
                        <Text style={styles.text2}>{seasons || 0}</Text>
                    </View>                      
                </View>
            }
            <View>
                <Text style={styles.heading}>{t('rest')}</Text>
                <View style={{flexDirection:'row',alignItems:'center'}}>
                    <Text style={styles.text2}>{state?.restriction || 'N/A'}</Text>
                </View>                      
            </View>
            <View>
                <Text style={styles.heading}>{t('rating')}</Text>
                <View style={{flexDirection:'row',alignItems:'center'}}>
                    <Text style={styles.text2}>{state?.rating || '0'}</Text>
                    <Image 
                        source={require('../../../assets/icons/star.png')} 
                        style={styles.image1}
                    />
                </View>                      
            </View>
            
        </View>
    )
}
const styles = StyleSheet.create({
    detail: {
        flexDirection: 'row',
        gap: 40,
        marginTop: 25,
    },
    heading: {
        fontSize: myStyle?.primaryFontSize?.fontSize,
        color: '#fff',
        fontWeight: '600',
        marginBottom: 2
    },
    text2: {
        fontSize:  myStyle?.primaryFontSize?.fontSize -2,
        color: '#fff',
        paddingRight: 3
    },
    image1:{
        width:12,
        height:12,
    }
})
export  default BasicInfo