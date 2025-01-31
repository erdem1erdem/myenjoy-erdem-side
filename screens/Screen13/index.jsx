import { VLCPlayer } from 'react-native-vlc-media-player'
import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react'
import { Dimensions, SafeAreaView, StyleSheet, View, BackHandler, TouchableWithoutFeedback, useTVEventHandler, Alert } from 'react-native'
import { PlayerScreen } from '../Screen5/PlayerScreen'
import { useDispatch, useSelector } from "react-redux"
import { actionsApi } from '../../shared'
import { useNavigation } from '@react-navigation/core'
import { apiCalls } from '../../shared/apiCalls'
import KeepAwake from 'react-native-keep-awake'
const windowWidth = Dimensions.get('window').width

const VideoPlayer = ({ route }) => {

    const dispatch = useDispatch()
    const navigation = useNavigation()
    const {currentMedia, portalid : portalID, methodType} = useSelector(state => state?.portals)
    const {movieUrl, movieMediasState, movieMediasStateByCategory} = useSelector(state => state?.movies)
    const {seriesUrl, seriesMediasState, seriesMediasStateByCategory} = useSelector(state => state?.series)
    const {settings} = useSelector((state) => state?.other)
    const {value: category}= useSelector(state => state?.category)
    const [state, setState] = useState(route?.params || null)
    const [showBar, setShowBar] = useState(true)
    const [paused, setPaused] = useState(true)
    const [currentTime, setCurrentTime] = useState(0)
    const [duration, setDuration] = useState(0)
    const currentTimeRef = useRef(0)
    const totalTimeRef = useRef(duration)
    const videoRef = useRef(null)
    const [audioTracks, setAudioTracks] = useState([])
    const [textTracks, setTextTracks] = useState([])
    const [selectedAudioTrack, setSelectedAudioTrack] = useState(null)
    const [selectedTextTrack, setSelectedTextTrack] = useState(null)
    const backTimeRef = useRef(null)

    useEffect(() => {
      KeepAwake.activate()   
      return () => {
        KeepAwake.deactivate()
      };
    }, [])

    useEffect(() => {
        if (route?.params) {
          setState(route?.params)
        }
      }, [route])

      useEffect(() => {
        if (methodType === "3" && state) {
          const { extension, stream_id: streamID } = state
          if (currentMedia === 2) {
            dispatch(actionsApi?.getMovieURL({ methodType, portalID, extension, streamID }))
          } else {
            dispatch(actionsApi?.getSeriesURL({ methodType, portalID, extension, streamID }))
          }
        }
      }, [methodType, state, currentMedia, portalID, dispatch])
      useEffect(() => {
        if (videoRef?.current && state?.contineWatch>0) {
          let contineWatch= parseInt(state?.contineWatch)
          videoRef.current.seek(contineWatch);
          currentTimeRef.current = contineWatch
          setCurrentTime(contineWatch)
        }
      }, [state])

      useEffect(() => {
        const backAction = () => {
          if(settings?.eye=="0"){
            saveMediaState()
          }
          navigation.goBack()
          return true
        }
        const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction)
        return () => backHandler.remove()
      }, [navigation])
    
      useEffect(() => {
        return () => {
          dispatch(actionsApi?.movieUrlClear())
        }
      }, [dispatch])

      const saveMediaState= ()=>{
        try {
          let payload={
            portalID,
            mediaType: currentMedia,
            category: category?.id,
            mediaID: state?.mediaID,
            episodeID: state?.episodeID,
            time:  totalTimeRef?.current?.toString(),
            duration: String(Math.floor(currentTimeRef?.current))
          }
          if(currentMedia===2){
            let index= movieMediasStateByCategory?.findIndex(media=> media?.mediaID==state?.mediaID)
            if(index>-1){
              let temp=[...movieMediasStateByCategory]
              let temp2=[...movieMediasState]
              temp?.splice(index, 1, payload)
              let index2= movieMediasState?.findIndex(media=> media?.mediaID==state?.mediaID)
              temp2?.splice(index2, 1, payload)
              dispatch(actionsApi?.movieMediasStateByCategoryResponse([...temp]))
              dispatch(actionsApi?.movieMediasStateResponse([...temp2]))
            }
            else{
              dispatch(actionsApi?.movieMediasStateByCategoryResponse([...movieMediasStateByCategory, payload]))
              dispatch(actionsApi?.movieMediasStateResponse([...movieMediasState, payload]))
            }
          }
          else {
            let index= seriesMediasStateByCategory?.findIndex(media=> media?.mediaID==state?.mediaID && state?.episodeID === media?.episodeID)
            if(index>-1){
              let temp=[...seriesMediasStateByCategory]
              let temp2=[...seriesMediasState]
              temp?.splice(index, 1, payload)
              let index2= seriesMediasState?.findIndex(media=> media?.mediaID==state?.mediaID && state?.episodeID === media?.episodeID)
              temp2?.splice(index2, 1, payload)
              dispatch(actionsApi?.seriesMediasStateByCategoryResponse([...temp]))
              dispatch(actionsApi?.seriesMediasStateResponse([...temp2]))
            }
            else{
              dispatch(actionsApi?.seriesMediasStateByCategoryResponse([...seriesMediasStateByCategory, payload]))
              dispatch(actionsApi?.seriesMediasStateResponse([...seriesMediasState, payload]))
            }
          }
          apiCalls?.other?.saveMediaState(payload)
        }
        catch (e){
          Alert.alert(JSON.stringify(e))
        }
      }
    
      const restartVideo = useCallback(() => {
        setPaused(true)
        if (videoRef.current) {
          videoRef.current.seek(0)
          setCurrentTime(0)
          currentTimeRef.current = 0
         
        }
      }, [currentTime])
 

      const playpause = useCallback(() => {
        setPaused((prevPaused) => {
          if (prevPaused && videoRef.current) {
            videoRef.current.seek(currentTimeRef.current);
          }
          return !prevPaused
        })
      }, [])
      const onEnd = () => {
        // setCurrentTime(0)
        // currentTimeRef.current = 0
        if((currentMedia===2 && settings.movie=="1") || (currentMedia===3 && settings.serialNumber =="2")){
          navigation.goBack()
        }   
      }

  
      const onProgress = useCallback((data) => {
          if(!paused ){
        const newTime = Math.floor(data.currentTime / 1000)
        if (currentTimeRef.current < newTime || backTimeRef.current > newTime) {
          currentTimeRef.current = newTime
            setCurrentTime(newTime)
        }
      
        if((currentTimeRef.current == duration - 2) && ((currentMedia===2 && settings.movie=="0") || (currentMedia===3 && settings.series =="0"))){
          videoRef.current?.seek(0)
          setCurrentTime(0)
          currentTimeRef.current = 0
        } 
    }
      },[paused])
    
      const onSliderChange = useCallback((value) => { 
        resetTimer() 
        let val=Math.floor(value)
        if (videoRef?.current) {
          videoRef?.current?.seek(val)
          //  setCurrentTime(val)
           currentTimeRef.current = val       
        }    
      }, [currentTime])
     
      const onLoad = ({audioTracks, textTracks,duration}) => {
       totalTimeRef.current = Math.floor(duration / 1000)
        setPaused(false)
        setDuration(Math.floor(duration / 1000));
        setTextTracks(textTracks)
        setAudioTracks(audioTracks)
        if(state?.contineWatch>0){
          let contineWatch= parseInt(state?.contineWatch)
          videoRef.current.seek(contineWatch);
          currentTimeRef.current = contineWatch
          setCurrentTime(contineWatch)
        }
      }
    
      const jumpBackward = useCallback(() => {     
        if (videoRef?.current) {
          let newTime = currentTime - 10
          if (newTime < 0) newTime = 0
          setCurrentTime(newTime)
          backTimeRef.current = newTime
          // currentTimeRef.current = newTime
          videoRef?.current?.seek(newTime )     
        }
      }, [currentTime])
      const jumpForward = useCallback(() => {
       
        if (videoRef?.current) {
          let newTime = currentTime + 10
          if (newTime > duration) newTime = duration
          setCurrentTime(newTime)
           currentTimeRef.current = newTime
          videoRef?.current?.seek(newTime)
          
        }
      }, [currentTime, duration])
   
    const formatTime = (totalSeconds) => {
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = Math.floor(totalSeconds % 60);
      
        return {
          hours,
          minutes,
          seconds,
        };
      };
      const videoSource = useMemo(() => ({
        uri: movieUrl || seriesUrl || state?.url
      }), [movieUrl, seriesUrl, state])
    
    
      const timerRef = useRef(null)
      const resetTimer = useCallback(() => {
        if (timerRef.current) {
          clearTimeout(timerRef.current)
        }
        timerRef.current = setTimeout(() => {
          setShowBar(false)
        }, 5000)
      }, [])
      const eventHandler = useCallback(
        (evt) => {
          if (['select', 'playPause', 'up', 'down', 'left', 'right'].includes(evt.eventType)) {
            setShowBar(true)
          
             resetTimer()
          }
        },
        [resetTimer]
      )
      useTVEventHandler(eventHandler)
  
  return (
    
    <SafeAreaView style={styles.container}>
    <TouchableWithoutFeedback>
      <View>
        {videoSource.uri && (
          <VLCPlayer
            ref={videoRef}
            source={{
              uri: videoSource?.uri,
            }}
            style={styles?.video}
            onProgress={onProgress}
            onLoad={onLoad}
            onEnd={()=>onEnd()}
            paused={paused}
            resizeMode="contain"
            audioTrack={selectedAudioTrack}
            textTrack={selectedTextTrack}
            
          />
        )}
      </View>
    </TouchableWithoutFeedback>
    {
      showBar &&
      <View style={styles.videobar}>
        <PlayerScreen
          formatTime={formatTime}
          paused={paused}
          jumpForward={jumpForward}
          jumpBackward={jumpBackward}
          onSliderChange={onSliderChange}
          restartVideo={restartVideo}
          playpause={playpause}
          currentTime={currentTime}
          duration={duration}
          number1={route?.params?.num}
          playDetail={state}
          setSelectedTextTrack={setSelectedTextTrack}
          audioTracks={audioTracks}
          textTracks={textTracks}
          selectedTextTrack={selectedTextTrack}
          selectedAudioTrack={selectedAudioTrack}
          setSelectedAudioTrack={setSelectedAudioTrack}
        />
      </View>
    }
  </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      height: '100%',
      backgroundColor: '#000',
    },
    videobar: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      width: windowWidth,
      justifyContent: 'center',
      flexDirection: 'row',
      alignItems: 'center',
    },
    video: {
      width: '100%',
      height: '100%'
    },
  })

export {VideoPlayer};