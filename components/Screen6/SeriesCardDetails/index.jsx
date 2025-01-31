import { useNavigation } from '@react-navigation/core'
import React, { useState,useEffect } from 'react'
import { Image, StyleSheet, Text, TouchableHighlight, View } from 'react-native'
import { SeasonModal } from '../SeasonModal'
import { EpisodeModal } from '..'
import { Icon } from 'react-native-elements'
import { useDispatch, useSelector } from "react-redux"
import { actionsApi } from '../../../shared'
import { useTranslation } from 'react-i18next'

const SeriesCardDetails = ({detail}) => {
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const seriesDetail = useSelector((state) => state?.series.SeriesDetailsData)
    const portID = useSelector((state) => state?.portals.portalid)
    const [isactive, setIsActive] = useState(null)
    const [showSeasonModal, setShowSeasonModal] = useState(false)
    const [showEpisodeModal, setShowEpisodeModal] = useState(false)
    const [selectedSeason,setSelectedSeason] = useState(1)
    const [selectedEpisode,setSelectedEpisode] = useState(1)
    const [num,setNum] = useState(1)
    const navigation = useNavigation()
    useEffect(() => {
        dispatch(actionsApi?.getSeriesDetails({...detail,portID}))
      }, [])

    const toggleSeasonModal = () => {
        setShowSeasonModal(!showSeasonModal)
    }

    const toggleEpisodeModal = () => {
        setShowEpisodeModal(!showEpisodeModal)
    }

    const data = {
        details: [
            {
                title: t('year'),
                desc: seriesDetail?.info?.releaseDate,
            },
            {
                title: t('category'),
                desc: 'Netflix 2021 Films',
            },
            
            {
                title:  t('seasons'),
                desc: seriesDetail?.seasons?.length,
            },
            {
                title:t('rest'),
                desc: 'Rated R',
            },
            {
                title:t('rating'),
                desc: seriesDetail?.info?.rating_5based,
                rat: require('../../../assets/icons/star.png')
            },
            
            
        ],
        Newbtns: [
            {
                iconname:'film-outline',
                text: t('season'),
            },
            {
                iconname:'albums-outline',
                text: t('episode'),
            },
        ],
        btns: [
            {
                icons: "play",
                text: t('watch_now'),
            },
            {
                icons:"play-skip-forward",
                text:t('resume'),
            },
            {
                icons:"heart",
                text: t('add_favorite'),
            },
        ]
    }
    const handlePress = (index)=>{
        setIsActive(index)
        const season = selectedSeason.toString()
        const episode = seriesDetail?.episodes[season]?.find(ep => ep?.episode_num === selectedEpisode)
        navigation.navigate('Screen5',{num,episode,seriesDetail })    
    }
 
    return (
        <View style={{ flexDirection: 'row', height: '100%', backgroundColor: '#000' }}>
            <View style={styles.leftbanner}>
                <Image source={detail?.cover? { uri: detail?.cover} : require('../../../assets/movieposter4.jpg')} style={{ width: '100%', height: '100%' }} />
            </View>
            <View style={styles.rightdetails}>
                <Text numberOfLines={1} style={styles.title}>{detail?.name}</Text>
                <Text numberOfLines={6} style={styles.text1}>{detail?.plot}</Text>
                <View style={styles.detail}>
                    {
                        data?.details?.map((data, index) =>
                        <View key={index}>
                        <Text style={styles.heading}>{data?.title}</Text>
                        <View style={{flexDirection:'row',alignItems:'center'}}>
                            <Text style={styles.text2}>{data?.desc}</Text>
                            {
                                data.title === 'Rating' && <Image source={data?.rat} style={styles.image1}/>
                            }
                        </View>                      
                    </View>
                        )
                    }
                </View>
                <View style={styles.btnview}>
                    <View style={styles.btn2}>
                        <TouchableHighlight
                            activeOpacity={1}
                            underlayColor='#F83605'
                            onFocus={() => setIsActive(3)}
                            onBlur={() => setIsActive(null)}
                            onPress={toggleSeasonModal}
                            style={[styles.touchablestyle,{backgroundColor: isactive === 3 ?'#F83605':'#3C3F45'}]}
                        >
                            <View style={{alignItems:'center'}}>
                            <Icon name='film-outline' type="ionicon" size={20} color="white" /> 
                            </View>
                        </TouchableHighlight>
                        {
                            isactive === 3 && <Text style={[styles.title2]}>Season</Text>
                        }
                    </View>
                    <View style={[styles.btn2,{marginLeft:-15}]}>
                        <TouchableHighlight
                            activeOpacity={1}
                            underlayColor='#F83605'
                            onFocus={() => setIsActive(4)}
                            onBlur={() => setIsActive(null)}
                            onPress={toggleEpisodeModal}
                            style={[styles.touchablestyle,{backgroundColor: isactive === 4 ?'#F83605':'#3C3F45'}]}
                        >
                            <View style={{alignItems:'center'}}>
                            <Icon name='albums-outline' type="ionicon" size={20} color="white" /> 
                            </View>
                        </TouchableHighlight>
                        {
                            isactive === 4 && <Text style={[styles.title2]}>Episode</Text>
                        }
                    </View>
                    {
                        data?.btns?.map((btn, index) =>
                            <TouchableHighlight
                                key={index}
                                onPress={() => handlePress(index)}
                                onFocus={() => setIsActive(index)}
                            >
                                <View style={[styles.btn, { backgroundColor: isactive === index ? '#F83605' : '#3C3F45' }]}>
                                <Icon name={btn?.icons} type="ionicon" size={20} color="white" /> 
                                    <Text
                                        style={
                                            [styles.text2, { fontWeight: '400' }]
                                        }
                                    >{btn?.text}</Text>
                                </View>
                            </TouchableHighlight>
                        )
                    }
                </View>
            </View>
            {showSeasonModal && (
                <SeasonModal 
                visible={showSeasonModal} 
                totalSeasons={seriesDetail?.seasons?.length} 
                onClose={toggleSeasonModal} 
               {...{setSelectedSeason,selectedSeason}}
                />
            )}
            {showEpisodeModal && (
                <EpisodeModal 
                visible={showEpisodeModal} 
                onClose={toggleEpisodeModal}
                totalEpi={(seriesDetail.seasons.length > 0 && selectedSeason > 0 ) 
                    && 
                    seriesDetail.seasons[selectedSeason - 1].episode_count?
                    seriesDetail.seasons[selectedSeason - 1].episode_count 
                    :0
                }
                {...{selectedEpisode,setSelectedEpisode}}
                />
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    leftbanner: {
        width: '40%',
        height: '100%'
    },
    rightdetails: {
        height: '100%',
        width: '60%',
        paddingHorizontal: 30,
        justifyContent: 'center'
    },
    image: {
        width: 35,
        height: 35,
    },
    title: {
        fontSize: 40,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 8,
    },
    text1: {
        fontSize: 14,
        color: '#fff',
        fontWeight: '400'
    },
    title2: {
        paddingTop:3,
        color: 'white',
        fontSize: 12,
        textAlign: 'center',
        fontWeight: "600",
        position:"absolute", 
        bottom:-12
        
    },
    detail: {
        flexDirection: 'row',
        gap: 40,
        marginTop: 25,
    },
    heading: {
        fontSize: 13,
        color: '#fff',
        fontWeight: '600'
    },
    text2: {
        fontSize: 12,
        color: '#fff',
        fontWeight: "400"
    },
    btnview: {
        flexDirection: 'row',
        gap: 13,
        marginTop: 25,
        marginLeft:-13,
        alignItems:'center',
    },
    btn: {
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 4,
        flexDirection: 'row',
        gap: 5,
        alignItems: 'center'
    },
    btn2:{ 
        flex:1,
        alignItems: 'center', 
        justifyContent:'center',
        height: 55, 
        width: 55,
        position:"relative"
    },
    touchablestyle: {
        alignItems: 'center',
            justifyContent:'center',
            width: 35,
            height:35,
            borderRadius:35/2,
           
      },
    btn33:{ 
        height: 70,
        alignItems: 'center',
        width:55
       
    },
    image1:{
        width:12,
        height:12,
        marginLeft:4
    }
})


export { SeriesCardDetails }