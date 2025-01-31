import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TouchableHighlight } from 'react-native';
import Slider from '@react-native-community/slider';
import { Image } from 'react-native-elements';
import { SoundModal } from '../SoundModal';
import { LanguageModal } from '../LanguageModal';
import { BrightnessModal } from '..';
import { EpisodeModal } from '../../Screen6';
import { Icon } from 'react-native-elements';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

const PlayerScreen = ({formatTime, currentTime, duration, paused, jumpForward, jumpBackward, onSliderChange,
   playpause,restartVideo,number1,playDetail,}) => {
  const { t } = useTranslation()
  const [ toggled, setToggled ] = useState(false)
  const [ toggledtwo, setToggledTwo ] = useState(false)
  const [actindex, setactIndex] = useState(null)
  const [ visible, setVisible ] = useState(false)
  const [ visiblesound, setVisibleSound ] = useState(false)
  const [ visiblemodal, setVisiblemodal ] = useState(false)
  const [ visiblebright, setVisiblebright ] = useState(false)
  const [showEpisodeModal, setShowEpisodeModal] = useState(false)
  const [playbutton, setplaybutton] = useState(null)
  const {methodType} = useSelector((state) => state?.portals)
  const toggleEpisodeModal = () => {
    setShowEpisodeModal(!showEpisodeModal)
}  
  const button1 = [
    {
      title: t('episode'),
      iconname:'albums-outline',
      onPressFunction: () => {toggleEpisodeModal()}
    },
    {
      title: 'Brightness',
      iconname:'sunny-outline',
      onPressFunction: () => { setVisiblebright(true); setVisiblemodal(true); }
    },
    {
      title: t('favorite'), 
      iconname:'heart-outline',
      onPressFunction: () => { }
    },
    {
      title: t('restart'), 
      iconname:'refresh-outline',
      onPressFunction: restartVideo
    },
    {
      title: t('audio'),
      iconname:'musical-note-outline',
      onPressFunction: () => { setToggled(true); setVisible(true); }
    },
    {
      title: t('subtitle'),
      iconname:'language-outline',
      onPressFunction: () => { setToggledTwo(true); setVisibleSound(true); }
    }
  ];
  const formatedTime = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = Math.floor(totalSeconds % 60);
  
    // Format hours, minutes, and seconds to ensure they have two digits
    const formattedHours = String(hours).padStart(2, '0');
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(seconds).padStart(2, '0');
  
    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
  }
  
   const buttons = number1!== 1?button1.slice(1):button1

  return (
    <View style={styles.parentview}>
      <View style={{flexDirection:'row'}}>
      <View style={styles.container}>
        <Image source={{uri:methodType==="1" ? playDetail['tvg-logo'] :number1===1?playDetail?.info?.cover:playDetail?.info?.cover_big}} style={styles.image} />
        <Text numberOfLines={1} style={[styles.title,{width:100}]}>{methodType==="1" ? playDetail['tvg-name']:number1===1?playDetail?.info?.name:playDetail?.movie_data?.name}</Text>
        <View style={styles.midView}>
          <Text style={styles.subtext}>{formatedTime(currentTime)}</Text>
          <Slider
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
        {buttons.map((button, index) => (
           <View key ={index} style={styles.innerview1}>
            <TouchableHighlight 
             underlayColor='#F83605'
             style={[styles.touchablestyle,{backgroundColor:actindex === index ?'#F83605':'#3C3F45'}]}
            key={index} 
            onPress={()=>{button.onPressFunction();setactIndex(index)}}
            onFocus={()=>{setactIndex(index)}}
             onBlur={()=>{setactIndex(null)}}
            >
             
                <View style={{alignItems:'center'}}>
            
                 <Icon name={button.iconname} type="ionicon" size={21} color="white" />
                </View>
        
            </TouchableHighlight>
            <Text style={[styles.text, { display: actindex === index ? 'flex' : 'none' }]}>
                  {button.title}
                </Text>
            </View>
          ))}
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
      {showEpisodeModal && (
                <EpisodeModal visible={showEpisodeModal} onClose={toggleEpisodeModal} />
            )}
      <BrightnessModal setVisiblebright={setVisiblebright} visiblemodal={visiblemodal} onClose={()=>setVisiblemodal(false)} />
      <SoundModal setToggled={setToggled} visible={visible} onClose={()=>setVisible(false)} />
      <LanguageModal setToggledTwo={setToggledTwo} visiblesound={visiblesound} onClose={()=>setVisibleSound(false)} />
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
  title: {
    fontSize: 15,
    fontWeight: '500',
    color: '#fff',
  },
  midView: {
    flex: 1,
    flexDirection:'row',
    justifyContent:"center",
    alignItems:'center'
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
    marginTop:12,
    paddingLeft:10,
    flexDirection: 'row',
    alignItems:'center',
    paddingTop: 5,
    gap:3
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
