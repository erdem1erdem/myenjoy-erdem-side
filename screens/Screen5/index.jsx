import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react'
import Video,{SelectedTrackType,textTracksSelectionBy} from 'react-native-video'
import { Dimensions, SafeAreaView, StyleSheet, View, BackHandler, TouchableWithoutFeedback, useTVEventHandler, Alert } from 'react-native'
import { PlayerScreen } from './PlayerScreen'
import { useDispatch, useSelector } from "react-redux"
import { actionsApi } from '../../shared'
import { useNavigation } from '@react-navigation/core'
import { apiCalls } from '../../shared/apiCalls'
const windowWidth = Dimensions.get('window').width
const Screen5 = ({ route }) => {
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const {currentMedia, portalid : portalID, methodType} = useSelector(state => state?.portals)
  const {movieUrl, movieMediasState, movieMediasStateByCategory} = useSelector(state => state?.movies)
  const {seriesUrl, seriesMediasState, seriesMediasStateByCategory} = useSelector(state => state?.series)
  const {category} = useSelector((state) => state?.other)
  const [state, setState] = useState(route?.params || null)
  const [showBar, setShowBar] = useState(true)
  const [paused, setPaused] = useState(true)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const currentTimeRef = useRef(currentTime)
  const videoRef = useRef(null)
  const [audioTracks, setAudioTracks] = useState([]);
  const [textTracks, setTextTracks] = useState([]);
  const [selectedAudioTrack, setSelectedAudioTrack] = useState(null)
  const [selectedTextTrack, setSelectedTextTrack] = useState(null)
 
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
    const backAction = () => {
      saveMediaState()
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
        time:  '8447.24',
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
    if (videoRef.current) {
      videoRef.current.seek(0)
      setCurrentTime(0)
      currentTimeRef.current = 0
      setPaused(false)
    }
  }, [])
  const onProgress = useCallback((data) => {
    setCurrentTime(prevTime => {
      const newTime = data.currentTime
      if (Math.abs(newTime - prevTime) >= 1) {
        currentTimeRef.current = newTime
        return newTime
      }
      return prevTime
    })
  }, [])
  const playpause = useCallback(() => {
    setPaused((prevPaused) => {
      if (prevPaused && videoRef.current) {
        videoRef.current.seek(currentTimeRef.current)
      }
      return !prevPaused
    })
  }, [])
  const onEnd = useCallback(() => {
    setCurrentTime(0)
    currentTimeRef.current = 0
    setPaused(true)
  }, [])
  const onSliderChange = useCallback((value) => {
    if (videoRef?.current) {
      videoRef?.current?.seek(value)
      setCurrentTime(value)
      currentTimeRef.current = value
    }
  }, [])
  // const onAudioTracks = (data) => {
  //   const selectedTrack = data.audioTracks?.find((x) => {
  //     return x.selected;
  //   });
  //   if (selectedTrack?.index) {
  //     setAudioTracks(data.audioTracks);
  //     setSelectedAudioTrack({
  //       type: SelectedTrackType.INDEX,
  //       value: selectedTrack.index,
  //     });
  //   } else {
  //     setAudioTracks(data.audioTracks);
  //   }
  // };

  // const onTextTracks = (data) => {
  //   const selectedTrack = data.textTracks?.find((x) => {
  //     return x?.selected;
  //   });

  //   if (selectedTrack?.language) {
  //     setTextTracks(data.textTracks);
  //     if (textTracksSelectionBy === 'index') {
  //       setSelectedTextTrack({
  //         type: SelectedTrackType.INDEX,
  //         value: selectedTrack?.index,
  //       });
  //     } else {
  //       setSelectedTextTrack({
  //         type: SelectedTrackType.LANGUAGE,
  //         value: selectedTrack?.language,
  //       });
  //     }
  //   } else {
  //     setTextTracks(data.textTracks);
  //   }
  // };
  
  const onLoad = useCallback((data) => {
    if(state?.contineWatch>0){
      let contineWatch= parseInt(state?.contineWatch)
      currentTimeRef.current = contineWatch
      videoRef?.current?.seek(contineWatch)
      setCurrentTime(contineWatch)
    }
   
    setDuration(data?.duration)
    setTextTracks(data.textTracks)
    setAudioTracks(data.audioTracks)
    // onAudioTracks(data);
    // onTextTracks(data);
  }, [])
  const jumpBackward = useCallback(() => {
    if (videoRef?.current) {
      let newTime = currentTime - 10
      if (newTime < 0) newTime = 0
      setCurrentTime(newTime)
      currentTimeRef.current = newTime
      videoRef?.current?.seek(newTime)
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
  const formatTime = useCallback((time) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
  }, [])
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
        // resetTimer()
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
            <Video
              ref={videoRef}
              source={{uri:videoSource.uri}}
              style={styles.video}
              onProgress={onProgress}
              onLoad={onLoad}
              onEnd={onEnd}
              paused={paused}
              resizeMode="contain"
              muted={false}
              // onAudioTracks={onAudioTracks}
              // onTextTracks={onTextTracks}
              selectedTextTrack={selectedTextTrack}
              selectedAudioTrack={selectedAudioTrack}
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
  )
}
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
    height: '100%',
    backgroundColor: '#000',
  },
})
export { Screen5 };