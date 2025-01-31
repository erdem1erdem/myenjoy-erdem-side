import { useState,useEffect, memo } from "react"
import { View, Text, StyleSheet, ImageBackground, TVEventHandler} from "react-native"
import { EPGModal } from "./EPGModal"
import { useDispatch, useSelector } from "react-redux"
import { MyButton, PinModal } from "../../../components"
import { myStyle } from "../../../data"
import { actionsApi } from "../../../shared"
import { apiCalls } from "../../../shared/apiCalls"
import { useNavigation } from "@react-navigation/core"
import { useTranslation } from "react-i18next"

const PlayerFooter = ({channelInformation,indexRef, channels,visiblePinModal, setVisiblePinModal}) => {
  const { t } = useTranslation();
  const navigation = useNavigation()
  const dispatch= useDispatch()
  // const {value: currentChannel} = useSelector(state=> state?.currentChannel)
  const {favoriteChannels,lockedChannels} = useSelector(state=> state?.other)
  const {value: category}= useSelector(state => state?.category)
  const {portalid: portalID, methodType} = useSelector((state) => state?.portals)
  const [visibleModal, setvisibleModal] = useState(false)
  const currentDate = new Date()
  // const [visiblePinModal, setVisiblePinModal]= useState(false)
  const [channelID, setChannelID]= useState(null)
  const [isFavorite, setIsFavorite]= useState(false)
  const [isLocked, setisLocked]= useState(false)
  const {value: channelIndex}= useSelector(state => state?.channelIndex)
  const [currentChannel, setCurrentChannel]= useState(null)
 
  useEffect(()=>{
    if(channels?.length && channelIndex!==null)
      setCurrentChannel(channels[parseInt(channelIndex)])
  }, [channels, channelIndex])

  useEffect(()=>{
    if(channelInformation && currentChannel && favoriteChannels?.length){
      let channelID= currentChannel['tvg-name']?.trim() || currentChannel?.stream_id || currentChannel?.series_id
      let index= favoriteChannels?.findIndex(channel=> channel?.mediaID === channelID)
      let index2= lockedChannels?.findIndex(channel=> channel?.channelID === channelID)
      setIsFavorite(index>-1)
      setisLocked(index2>-1)
    }
  }, [channelInformation, favoriteChannels, currentChannel,lockedChannels])



  const options = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone: 'Europe/Istanbul' 
  }

const date = currentDate.toLocaleString('tr-TR', options)
  const toggleModal = () => {
    setvisibleModal(!visibleModal)
  }

  const buttons = [
    {
      id: 0,
      iconname: 'menu',
      title: t('categories'),
      screen: "LiveTVCategories",
    },
    {
      id: 7,
      iconname:isLocked ? 'lock-closed-outline' :'lock-open-outline',
      title: isLocked ? t('unlock') : t('lock'),
      onPress: () => console.log('Lock button pressed')
    },
    {
      id: 1,
      iconname: 'heart-outline',
      title: t('favorite'),
      onPress: () => console.log('My List button pressed')
    }
  ]

  const handleButtonPress = (button) => {
    if (button?.title==="Lock" || button?.title==='Unlock'){
      setChannelID(currentChannel['tvg-name']?.trim())
      setVisiblePinModal(true)
    }
    else if(button?.title==='Favorite')
      addToFavorite()
    else
      navigation.goBack()
  }
  const addToFavorite= async ()=>{
    let payload= {
        // category: category?.id,
        category:currentChannel['group-title'] || category?.id,
        mediaType: 1, 
        portalID,
        mediaID: methodType==="1" ? currentChannel['tvg-name']?.trim() : (currentChannel?.stream_id || currentChannel?.series_id)
    }
    let index=-1
    let data=[]
    index = favoriteChannels.findIndex(channel=> channel?.mediaID===payload?.mediaID)
    data= [...favoriteChannels]
    if (index > -1)
        data.splice(index, 1)   
    else
        data=[...data, payload]
    setIsFavorite(!isFavorite)
    apiCalls?.other?.addToFavorite(payload)
    dispatch(actionsApi?.favoritesResponse({data, mediaType: 1}))
  }

  return (
    <View style={styles.container}>
      <View style={styles.leftview}>
        <Text style={styles.text}>{indexRef.current===null?parseInt(channelIndex)+1:indexRef?.current+1}</Text>
        {/* {
          currentChannel &&
          <ImageBackground 
            source={{ uri: methodType==="1"? currentChannel['tvg-logo'] : currentChannel?.stream_icon}} 
            resizeMode="contain" 
            style={styles.logo}
          >
          </ImageBackground>  
        } */}
        {currentChannel && 
         <ImageBackground 
         source={{ uri: methodType==="1"?  (indexRef.current !==null?channels[indexRef.current]['tvg-logo']:currentChannel['tvg-logo'] ) : currentChannel?.stream_icon}} 
         resizeMode="contain" 
         style={styles.logo}
       >
       </ImageBackground>  
        }
        
        {/* <Text 
          numberOfLines={1} 
          style={[styles?.text,{maxWidth: 250}]}
        >
          {currentChannel ? (currentChannel['tvg-name'] || currentChannel?.name) : null}
        </Text> */}
        <Text 
          numberOfLines={1} 
          style={[styles?.text,{maxWidth: 250}]}
        >
               {currentChannel &&((indexRef.current !==null)?channels[indexRef?.current]['tvg-name'] :currentChannel['tvg-name'] || currentChannel?.name)}
        </Text>
        <Text style={[styles.date,{marginTop:5}]}>{date}</Text>
      </View>
      <View style={styles.rightView}>
        {
          buttons.map((button, index) => (
            <View key={button.id}>
              <MyButton
                hasTVPreferredFocus={index===0}
                isCircular
                title= {button.title}
                icon={button?.iconname}
                onPress={()=>handleButtonPress(button)}
                buttonCoverStyle={{width: index===0 ? 65 : 55}}
                buttonStyle={isFavorite && index===2  && {backgroundColor: myStyle.colors?.primaryColor}}
              />
            </View>
          ))
        }
      </View>
      <EPGModal visible={visibleModal} onClose={toggleModal} />
      <PinModal 
          visible={visiblePinModal} 
          channelID={channelID}
          channelCat={currentChannel}
          title={isLocked ? 'Unlock channel' : 'Lock channel'}
          isLocked={isLocked}
          onClose={()=>{setVisiblePinModal(false); setChannelID(null)}}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    height: 90,
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'transparent',
    paddingHorizontal: 20
  },
  text: {
    fontSize: 24,
    color: 'white'
  },
  leftview: {
    alignItems: 'center',
    gap: 12,
    flexDirection: 'row',
  },
  logo: {
    width: 120,
    height: 40,
  },
  date: {
    color: 'white',
    fontWeight:'600',
    fontSize: myStyle?.primaryFontSize?.fontSize,
  },
  rightView: {
    flexDirection: 'row',
    gap: 12,
    height: 80
  }
})

export { PlayerFooter }

