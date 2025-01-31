import React, {useRef, useState, useEffect, useCallback} from 'react';
import {
  StyleSheet,
  View,
  requireNativeComponent,
  SafeAreaView,
  useTVEventHandler,
  TouchableWithoutFeedback,
  ToastAndroid,
  Text,
} from 'react-native';
import {PlayerFooter} from './PlayerFooter';
import {VLCPlayer, VlCPlayerView} from 'react-native-vlc-media-player';
import Video, {SelectedTrackType, selectedAudioTrack} from 'react-native-video';
import KeepAwake from 'react-native-keep-awake';
import {apiCalls} from '../../../shared/apiCalls';
import {actionsApi} from '../../../shared';
import {useDispatch, useSelector} from 'react-redux';
const VLCPlayerViewB = requireNativeComponent('VLCPlayerViewB');

const LiveTvPlayer = ({channelinfo, channels}) => {
  const dispatch = useDispatch();
  const videoRef = useRef(null);
  const [showBar, setShowBar] = useState(true);
  const [visiblePinModal, setVisiblePinModal] = useState(false);
  // const [url, setUrl] = useState(true)
  const {
    portalid: portalID,
    methodType,
    currentMedia,
  } = useSelector(state => state?.portals);
  const {value: channelIndex} = useSelector(state => state?.channelIndex);
  const indexRef = useRef(null);
  const urlRef = useRef(null);

  useEffect(() => {
    KeepAwake.activate();
  }, []);

  useEffect(() => {
    if (!visiblePinModal) resetTimer();
  }, [visiblePinModal]);

  const timerRef = useRef(null);
  const resetTimer = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = setTimeout(() => {
      setShowBar(false);
    }, 8000);
  }, []);

  // const timerRef2 = useRef(null)
  // const resetTimer2 = useCallback(() => {
  //   if (timerRef2.current) {
  //     clearTimeout(timerRef2.current)
  //   }
  //   timerRef2.current = setTimeout(() => {
  //     setUrl(false)
  //   }, 1000)
  // }, [])

  const eventHandler = useCallback(
    evt => {
      if (
        ['select', 'playPause', 'up', 'down', 'left', 'right'].includes(
          evt.eventType,
        )
      ) {
        setShowBar(true);
        resetTimer();
        if (evt.eventType === 'down') {
          // setUrl(true)
          // resetTimer2()
          let index =
            channelIndex === '0' ? channels?.length - 1 : channelIndex - 1;
          dispatch(actionsApi?.setChannelIndex(index.toString()));
          indexRef.current = index;
          let url = null;
          // fun(url, index)
          fun(index, url);
        }
        if (evt.eventType === 'up') {
          // setUrl(true)
          // resetTimer2()
          let index =
            channelIndex === (channels?.length - 1)?.toString()
              ? 0
              : parseInt(channelIndex) + 1;
          dispatch(actionsApi?.setChannelIndex(index.toString()));
          indexRef.current = index;
          let url = null;
          // fun(url, indexRef?.current)
          fun(index, url);
        }
      }
    },
    [resetTimer, channelIndex, channels],
  );
  useTVEventHandler(eventHandler);

  const fun = async indexx => {
    if (methodType === '3') {
      const body = {
        portalID,
        streamID: channels[indexx]?.stream_id,
        extension: 'ts',
      };
      url = await apiCalls.liveTV.createTvUrl({...body});
    }
    dispatch(actionsApi?.setChannelUrl(channels[indexx]?.url || url));
  };

  return (
    <SafeAreaView style={styles?.container}>
      <TouchableWithoutFeedback style={{flex: 1, backgroundColor: 'black'}}>
        <View>
          {channelinfo && (
            //    <Video
            //    key={channelinfo}
            //    ref={videoRef}
            //    style={styles?.video}
            //    resizeMode="contain"
            //    controls={false}
            //    fullscreen={true} // or false
            //    source={{
            //      uri: channelinfo,
            //    }}
            //     hwDecoderEnabled={0}
            //    hwDecoderForced={true}
            //    onError={(e) => {
            //      console.error(e);
            //      ToastAndroid.showWithGravity(
            //        'Something went wrong. Please switch to another channel',
            //        10000,
            //        ToastAndroid.CENTER
            //      );
            //    }}

            //    bufferConfig={{
            //      minBufferMs: 10000,
            //      maxBufferMs: 25000,
            //      bufferForPlaybackMs: 2500,
            //      bufferForPlaybackAfterRebufferMs: 5000,
            //    }}
            //    minLoadRetryCount={5}
            //  />
            <VLCPlayerViewB
              // key={channelinfo}
              ref={videoRef}
              style={styles.video}
              url={channelinfo}
            />
          )}
          {(showBar || visiblePinModal) && (
            <PlayerFooter
              channelInformation={channelinfo}
              {...{channels, indexRef, visiblePinModal, setVisiblePinModal}}
            />
          )}
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
  },
  video: {
    width: '100%',
    height: '100%',
    backgroundColor: 'black',
  },
});

export {LiveTvPlayer};
