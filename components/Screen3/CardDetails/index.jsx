import { useNavigation } from '@react-navigation/core'
import React, { useState,useEffect } from 'react'
import { Image, StyleSheet, Text, TouchableHighlight, TouchableOpacity, View } from 'react-native'
import { Icon } from 'react-native-elements'
import { useDispatch, useSelector } from "react-redux"
import { actionsApi } from '../../../shared'
import { useTranslation } from 'react-i18next';


const CardDetails = ({detail}) => {
    const { t } = useTranslation();

    const dispatch = useDispatch()
    const movieDetail = useSelector((state) => state?.movies.movieDetailsData)
    const portID = useSelector((state) => state?.portals.portalid)
    const [ isactive, setIsActive ] = useState(0)
    const navigation = useNavigation()
    const {methodType} = useSelector((state) => state?.portals)
    useEffect(() => { 
        if(methodType==="3"){
            dispatch(actionsApi?.getMovieDetails({...detail,portID}))
        }     
      }, [])

    const data = {
        details:[
            {
                title: t('year'),
                desc: methodType==="1"?"N/A":movieDetail?.info?.releasedate,
            },
            {
                title: t('category'),
                desc:methodType==="1"?detail['group-title'] :'Netflix 2021 Films',
            },
            {
                title:'Length',
                desc: methodType==="1"?"N/A": movieDetail?.info?.duration,
            },
            {
                title:'Restriction',
                desc: 'Rated R',
            },
            {
                title:t('rating'),
                desc:methodType==="1"?"N/A": movieDetail?.info?.rating,
                rat: require('../../../assets/icons/star.png')
            },
            
        ],
        btns: [
            {
                icons: "play",
                text: t('watch_now'),
            },
            {
                icons:"play-skip-forward",
                text:'Resume',
            },
            {
                icons:"heart",
                text: 'Add to Favorite',
            },
        ]
    }
const handlePress =(index)=>{
    setIsActive(index)
    navigation.navigate('Screen5',methodType==="1"?MovieD={detail}:MovieD={movieDetail})
}


  return (
    <View style={{flexDirection:'row',height:'100%',backgroundColor:'#000'}}>
        <View style={styles.leftbanner}>
            <Image source={methodType==="1" ? {uri:detail['tvg-logo']} : detail.stream_icon? { uri: detail.stream_icon} : require('../../../assets/movieposter4.jpg')} style={{width:'100%',height:'100%'}}/>
        </View>
        <View style={styles.rightdetails}>
            <Text style={styles.title}>{methodType==="1"?detail['tvg-name']:detail?.name}</Text>
            <Text numberOfLines={7} style={styles.text1}>{movieDetail?.info?.description}</Text>
            <View style={styles.detail}>
                {
                    data?.details?.map((data,index)=>
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
                {
                    data?.btns?.map((btn,index)=>
                    <TouchableHighlight 
                        key={index} 
                        onPress={()=>handlePress(index)} 
                        onFocus={()=>setIsActive(index)}
                    >
                        <View style={[styles.btn,{backgroundColor: isactive===index? '#F83605':'#3C3F45'}]}>
                        <Icon name={btn?.icons} type="ionicon" size={20} color="white" /> 
                            <Text 
                                style={
                                    [styles.text2,{fontWeight:'400'}]
                                }
                            >{btn?.text}</Text>
                        </View>
                    </TouchableHighlight>
                    )
                }
            </View>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    leftbanner:{
        width:'40%',
        height:'100%'
    },
    rightdetails:{
        height:'100%',
        width:'60%',
        paddingHorizontal:18,
        justifyContent:'center'
    },
    title:{
        fontSize:40,
        fontWeight:'bold',
        color:'#fff',
        marginBottom:8,
    },
    text1:{
        fontSize: 14,
        color:'#fff',
        fontWeight:'400'
    },
    detail:{
        flexDirection:'row',
        gap:40,
        marginTop:25,
    },
    heading:{
        fontSize: 13,
        color: '#fff',
        fontWeight: '600'
    },
    text2:{
        fontSize:12,
        color:'#fff',
        fontWeight:'400',
    },
    btnview:{
        flexDirection:'row',
        gap:15,
        marginTop:25,
    },
    btn:{
        paddingHorizontal:16,
        paddingVertical:10,
        borderRadius:4,
        flexDirection:'row',
        gap:10,
        alignItems:'center'
    },
    image1:{
        width:12,
        height:12,
        marginLeft:4
    }
})


export {CardDetails}