import React, { useRef, useState, useEffect, useCallback } from 'react'
import { StyleSheet, View,requireNativeComponent, SafeAreaView, useTVEventHandler } from 'react-native'
import { VLCPlayer, VlCPlayerView } from 'react-native-vlc-media-player'
import KeepAwake from 'react-native-keep-awake'
import Video from 'react-native-video'
const VLCPlayerViewA = requireNativeComponent('VLCPlayerViewA')

import { useFocusEffect } from '@react-navigation/core'

const LiveTvPlayer = ({ channelinfo }) => {
  const videoRef = useRef(null)
  const [volumeVisible, setVolumeVisible] = useState(false)
  const [showBar, setShowBar] = useState(true)
  const [key, setkey] = useState(0)
  
  useFocusEffect(
    useCallback(() => {
      KeepAwake.activate()
      return () => {
        if (videoRef.current) {
          if (typeof videoRef.current.stop === 'function') 
            videoRef.current.stop()
          if (typeof videoRef.current.release === 'function') 
            videoRef.current.release()
        }
      }
    }, [])
  )

  useEffect(() => {
    const hideVolumeTimer = setTimeout(() => {
      setVolumeVisible(false)
    }, 6000)

    return () => {
      clearTimeout(hideVolumeTimer)
    }
  }, [volumeVisible])

  const [focusChannel, setFocusChannel]= useState(false)
  useFocusEffect(
    useCallback(() => {
      setFocusChannel(true)
      return () => {
        setFocusChannel(false)
      }
    }, [])
  );


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

    <SafeAreaView style={styles?.container}>
      <View style={{ flex: 1, backgroundColor: 'black' }}>
        <View>
          {
            channelinfo && focusChannel && (
            // <VLCPlayer
            //   ref={videoRef}
            //   style={styles?.video}
            //   resizeMode="contain"
            //   controls={false}
            //   source={{
            //     uri: channelinfo,
            //   }}     
            //   repeat={true}
            //   hwDecoderForced={true}
            //   initOptions={[
            //     '--network-caching=1500',
            //     '--codec=avcodec'
            //   ]}
            //   onError={(e) => {
            //     console.error(e);
            //     ToastAndroid.showWithGravity(
            //       'Something went wrong. Please switch to another channel',
            //       10000,
            //       ToastAndroid.CENTER
            //     );
            //   }}
            //   autoplay={true}
            //   onBuffering={handleBuffering}
            //   onPlaying={handlePlaying}
            //   onTimeChanged={handleTimeChanged}
            //   hwDecoderEnabled={true}
            //   videoAspectRatio="16:9"
            //   initType={2}
            //   mediaOptions={[
            //     "--no-video-title-show",
            //     "--audio-time-stretch",
            //     "--network-caching=0",
            //     "--file-caching=0",
            //     "--live-caching=0",
            //     "--rtsp-caching=0",
            //     "--sout-keep",
            //     "--rtsp-tcp",
            //     "--avcodec-hw=any",
            //     "--codec=all",
            //     "--http-reconnect",
            //     "--audio-desync=-1",
            //     "--aout=opensles",
            //     "--gain=1.0",
            //     "--drop-late-frames",
            //     "--skip-frames",
            //     "--clock-jitter=100",
            //     "--clock-synchro=0",
            //     "--vout=android-display",
            //     "--video-filter=deinterlace",
            //     "--deinterlace-mode=blend",
            //     "-vvv"
            //   ]}
            // />
            // <Video
            //   key={channelinfo+key}
            //   ref={videoRef}
            //   style={styles?.video}
            //   resizeMode="contain"
            //   controls={false}
            //   fullscreen={false} // or false
            //   source={{
            //     uri: channelinfo,
            //   }}
            //      hwDecoderEnabled={0}
            //   hwDecoderForced={true}
            //   onError={(e) => {
            //     console.error(e);
            //     ToastAndroid.showWithGravity(
            //       'Something went wrong. Please switch to another channel',
            //       10000,
            //       ToastAndroid.CENTER
            //     );
            //   }}
            
            //   bufferConfig={{
            //     minBufferMs: 15000,
            //     maxBufferMs: 50000,
            //     bufferForPlaybackMs: 2500,
            //     bufferForPlaybackAfterRebufferMs: 5000,
            //   }}
            //   minLoadRetryCount={5}
            // />
            
            <VLCPlayerViewA
              // ref={videoRef}
              // key={channelinfo}
              style={styles.video} 
              url={channelinfo} 
            />
          )}
        </View>
      </View>
    </SafeAreaView>

  )
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
  },
  video: {
    width: "100%",
    height: '100%',
  }
})

export { LiveTvPlayer }

