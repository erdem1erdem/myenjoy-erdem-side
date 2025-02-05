import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableHighlight, ImageBackground } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import Slider from '@react-native-community/slider'
import { SoundModal } from '../../components/Screen3/SoundModal'
import { LanguageModal } from '../../components/Screen3/LanguageModal'
import { MyButton } from '../../components'
import { Icon } from 'react-native-elements'
import { apiCalls } from '../../shared/apiCalls'
import { actionsApi } from '../../shared'
import { myStyle } from '../../data'

const PlayerScreen = ({currentTime, duration, paused, jumpForward, jumpBackward, onSliderChange, playpause,restartVideo, playDetail,setSelectedTextTrack,audioTracks,textTracks, setSelectedAudioTrack}) => {
  
  const dispatch= useDispatch()
  const {isFavorite, moviesFavorite, seriesFavorite} = useSelector((state) => state?.other)
  const {value: category}= useSelector(state => state?.category)
  const {currentMedia, portalid: portalID} = useSelector((state) => state?.portals)
  const [ visible, setVisible ] = useState(false)
  const [ visiblesound, setVisibleSound ] = useState(false)
  const [playbutton, setplaybutton] = useState(null)
  const buttons = [
    {
      title: 'Favorite', 
      iconname:'heart-outline',
      onPress: () => addToFavorite()
    },
    // {
    //   title: 'Episode',
    //   iconname:'albums-outline',
    //   onPress: () => {toggleEpisodeModal()}
    // },
    {
      title: 'Restart', 
      iconname:'refresh-outline',
      onPress: () =>{restartVideo()}
    },
    {
      title: 'Audio Tracks',
      iconname:'musical-note-outline',
      onPress: () => {setVisible(true); }
    },
    {
      title: 'Subtitle',
      iconname:'language-outline',
      onPress: () => {setVisibleSound(true); }
    }
  ]

  const formatedTime = (Tseconds) => {  
    const hours = Math.floor(Tseconds / 3600);
    const minutes = Math.floor((Tseconds % 3600) / 60)
    const seconds = Math.floor(Tseconds % 60);
    const formattedHours = String(hours).padStart(2, '0');
    const formattedMinutes = String(minutes).padStart(2, '0')
    const formattedSeconds = String(seconds).padStart(2, '0')
    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`
  }
  
  const addToFavorite= async ()=>{
    let payload= {
        category: category?.id,
        mediaType: currentMedia, 
        portalID,
        mediaID: playDetail?.mediaID
    }
    let index=-1
    let data=[]
    if(currentMedia===2){
        index = moviesFavorite.findIndex(movie=> movie?.mediaID===payload?.mediaID)
        data= [...moviesFavorite]
    }
    else{
        index = seriesFavorite.findIndex(season=> season?.mediaID===payload?.mediaID)
        data= [...seriesFavorite]
    }
    if (index > -1)
        data.splice(index, 1)   
    else
        data=[...data, payload]
    dispatch(actionsApi?.setIsFavorite(!isFavorite))
    apiCalls?.other?.addToFavorite(payload)
    dispatch(actionsApi?.favoritesResponse({data, mediaType: currentMedia}))
  }
 
  const sliderRef= useRef()
 
  return (
    <View style={styles.parentview}>
      <View style={{flexDirection:'row'}}>
        <View style={styles.container}>
          <ImageBackground 
            source={{ uri: playDetail?.cover}} 
            resizeMode="contain" 
            style={styles.logo}
          >
          </ImageBackground>  
          <View style={styles.midView}>
            <Text style={styles.subtext}>{formatedTime(currentTime)}</Text>
            <Slider
              ref={sliderRef}
              style={styles.slider}
              minimumValue={0} 
              maximumValue={duration}
              value={currentTime}
              onValueChange={onSliderChange}
              minimumTrackTintColor="#F83605"
              maximumTrackTintColor="#fff"
              thumbTintColor="#F83605"

            />
            <Text style={styles.subtext}>{formatedTime(duration)}</Text>
          </View>
        </View>
      <View style={styles.playerview}>
        {
            buttons?.map((btn, index) =>
              <View key={'player-control-button'+ index}>
                <MyButton
                  hasTVPreferredFocus={index===0}
                  title={btn?.title}
                  onPress={btn?.onPress}
                  icon= {btn?.iconname}
                  isCircular
                  buttonCoverStyle={{width: 55}}
                  isFavorite
                  favoriteColor= {isFavorite && !index  ? myStyle?.colors?.primaryColor : null}
                  buttonStyle={isFavorite && !index && {backgroundColor: myStyle?.colors?.primaryColor}}
                />
              </View>
            )
        }
      </View>
      </View>
     
      <View style={styles.controls}>
          <TouchableHighlight
          underlayColor='#F83605' 
          onPress={jumpBackward}
          onFocus={()=>setplaybutton(0)} 
           onBlur={()=>setplaybutton(null)}  
          style={[styles.playbutton,{width:30,height:30,backgroundColor:playbutton===0?'#F83605':'#3C3F45'}]}
          >
          <Icon name="play-skip-back" type="ionicon" size={18} color="white" />
          </TouchableHighlight>
          <TouchableHighlight 
          
          underlayColor='#F83605'
          onFocus={()=>setplaybutton(1)} 
           onBlur={()=>setplaybutton(null)} 
          onPress={playpause} 
          style={[styles.playbutton,{backgroundColor:playbutton===1?'#F83605':'#3C3F45'}]}>
            <View style={{marginLeft:paused?4:null}}>
              {
                paused? <Icon name="play" type="ionicon" size={28} color="white" />:<Icon name="pause" type="ionicon" size={30} color="white" />
              }
           
            </View>
          </TouchableHighlight>
          <TouchableHighlight 
          underlayColor='#F83605'
          onPress={jumpForward}
          onFocus={()=>setplaybutton(2)} 
          onBlur={()=>setplaybutton(null)}  
          style={[styles.playbutton,{width:30,height:30,backgroundColor:playbutton===2?'#F83605':'#3C3F45'}]}
          >
          <Icon name="play-skip-forward" type="ionicon" size={18} color="white" />
          </TouchableHighlight>
      </View>
      <SoundModal setSelectedAudioTrack={setSelectedAudioTrack} audios={audioTracks} visible={visible} onClose={()=>setVisible(false)} />
      <LanguageModal setSelectedTextTrack={setSelectedTextTrack} subtitle={textTracks} visiblesound={visiblesound} onClose={()=>setVisibleSound(false)} />
    </View>
  );
};

const styles = StyleSheet.create({
  parentview:{
    flex:1,
    backgroundColor:'rgba(0,0,0,.5)',
    padding:10,
    height:153
  
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    gap:15,
    
  },
  image: {
    width: 70,
    height: 80,
  },
  logo: {
    width: 80,
    height: 80,
    
  },
  midView: {
    flex: 1,
    flexDirection:'row',
    justifyContent:"center",
    alignItems:'center',
    gap:5
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap:10,
  
  },
  slider: {
    display:'flex',
    flex:1,
   
  },
  
  subtext: {
    fontSize: 10,
    fontWeight:'500',
    color: '#fff',
    textAlign: 'center',
  },
  icon2:{
    width:40,
    height:40,
  },
  playerview: {
    flexDirection: 'row',
    paddingLeft:10,
    gap:3,
    height: 90,
  },
  playbutton:{
  alignItems:'center',
  justifyContent:'center',
  borderRadius:50,
  width:45,
  height:45
  },
  text:{
    fontSize:11,
    color:"#fff",
    fontWeight:'500',
    textAlign:"center"
  },
  innerview1: {
    height: 55,
    alignItems: 'center',
    width:53,
   
  },
  touchablestyle: {
    alignItems: 'center',
        justifyContent:'center',
        width: 40,
        height:40,
        borderRadius:40/2,
       
  },
});

export { PlayerScreen };
