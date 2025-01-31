import { useNavigation } from '@react-navigation/core'
import { View, TouchableHighlight, StyleSheet, Text } from 'react-native'
import { Icon } from 'react-native-elements'
import { useDispatch, useSelector } from 'react-redux'
import { actionsApi } from '../../shared'
import { myStyle } from '../../data'
import { useTranslation } from 'react-i18next';


const MainOptions= ()=>{
    const { t } = useTranslation();
    const navigation = useNavigation()
    const dispatch= useDispatch()
    const {portalid : portalID, methodType} = useSelector((state) => state?.portals)
    const { liveTvCategories, liveTvChannels } = useSelector(state => state?.liveTv)
    const { movieCategories, movies} = useSelector(state => state?.movies)
    const { seriesCategories, series} = useSelector(state => state?.series)
    
    const buttons = [
        {
            id:1,
            icon: 'tv-outline',
            title: t('live_tv'),
            path: 'Screen3'

        },
        {
            id:2,
            icon: 'film-outline',
            title: t('movies'),
            path: 'Screen3'
        },
        {
            id:3,
            icon: "albums-outline",
            title: t('series'),
            path: 'Screen3'

        }
    ]

    const onPress= (data)=>{
        if(data?.id===1 && !liveTvCategories?.length && !liveTvChannels?.length)
            dispatch(actionsApi?.getLiveTvCategoriesChannels({portalID, methodType}))
        else if(data?.id===2 && !movieCategories?.length && !movies?.length)
            dispatch(actionsApi?.getMovieCategoriesMovies({portalID, methodType}))
        else if(data?.id===3 && !seriesCategories?.length && !series?.length)
            dispatch(actionsApi?.getSeriesCategoriesSeries({portalID, methodType}))
    }
    return (
        <View style={styles.buttonsview}>
            {
                buttons.map((data, index) => (
                    <View key={index} style={{ alignItems: 'center' }}>
                        <TouchableHighlight
                            hasTVPreferredFocus={index === 0}
                            underlayColor={myStyle?.colors?.primaryColor}
                            onFocus={() => dispatch(actionsApi?.setCurrentMedia(data?.id)) }
                            onPress={() => {
                                onPress(data)
                                navigation.navigate(data?.path)
                            }}
                            style={styles.btn}
                        >
                            
                                <View style={{ alignItems: 'center'}}>
                                    <Icon 
                                        name= {data?.icon}
                                        type='ionicon'
                                        size={75} 
                                        color="white" 
                                    />
                                </View>
                            
                        </TouchableHighlight>
                        <Text style={styles.text}>{data.title}</Text>
                    </View>
                ))
            }
        </View>
    )
}
const styles = StyleSheet.create({
    btn: {
        display: 'flex',
        marginBottom: 10,   
        height: 150,
        width: 150,
        borderRadius: 8,
        backgroundColor:'#3C3F45',  
        justifyContent: 'center',
        alignItems: 'center'

    },
    activebtn: {
        alignItems: 'center',
        borderColor:'white',
        borderWidth:3,
    },
    buttonsview: {
        flexDirection: 'row',
        marginTop: 70,
        gap: 40,
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        fontSize: 16,
        fontWeight:'600',
        color: 'white',
    },
    image: {
        width: 45,
        height: 45,
    }
})
export {MainOptions}