import React, {Suspense, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {
  SideBar,
  MainRightSideArea,
  FooterBar,
  BoxNotRegistered,
} from '../../components/Screen1';
import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {actionsApi} from '../../shared';
import {NativeModules} from 'react-native';
import {ActivityIndicator} from '../../components';
import {apiCalls} from '../../shared/apiCalls';
const {EthernetModule} = NativeModules;
const {ExitApp} = NativeModules;

const PING_INTERVAL = 30000; // Ping every 30 seconds

const Screen1 = () => {
  const dispatch = useDispatch();
  const {data, loading, deviceStatus} = useSelector(state => state?.portals);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    getEthernetMacAddress();
  }, []);

  useEffect(() => {
    if (!loading && !deviceStatus) setShowModal(!showModal);
  }, [loading]);
  useEffect(() => {
    let intervalId;
    if (deviceStatus) {
      // dispatch(actionsApi?.pingServer())
      // intervalId = setInterval(()=>{dispatch(actionsApi?.pingServer())}, PING_INTERVAL);
    } else clearInterval(intervalId);
    return () => clearInterval(intervalId);
  }, [deviceStatus]);
  const getEthernetMacAddress = async () => {
    try {
      const macAddress = await EthernetModule?.getEthernetMacAddress();
      if (typeof macAddress === 'string') {
        dispatch(actionsApi?.getPortals({macAddress}));
        dispatch(actionsApi?.setMacAddress(macAddress));
      } else throw new Error('Invalid data type received from native module');
    } catch (e) {
      dispatch(actionsApi?.setMacAddress('02:00:00:00:00:00'));
      dispatch(actionsApi?.getPortals({macAddress: '02:00:00:00:00:00'}));
      return null;
    }
  };
  const handleExit = () => {
    dispatch(actionsApi?.resetDevice());
    ExitApp.exitApp()
      .then(() => {})
      .catch(error => {
        console.error('Failed to exit app: ', error);
      });
  };
  useEffect(() => {
    return () => dispatch(actionsApi?.resetDevice());
  }, []);
  const Fallback = () => (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color="white" />
    </View>
  );

  return (
    <>
      <Suspense>
        {loading ? (
          <Fallback />
        ) : !deviceStatus && !loading ? (
          <View style={styles.messageContainer}></View>
        ) : (
          <View style={{flex: 1, backgroundColor: 'black'}}>
            <View style={styles.container}>
              <SideBar />
              <MainRightSideArea />
              <FooterBar />
            </View>
          </View>
        )}
      </Suspense>
      <BoxNotRegistered visible={showModal} onClose={handleExit} />
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: '100%',
    width: '100%',
  },
  messageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  messageText: {
    color: 'white',
    fontSize: 18,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
});

export {Screen1};
