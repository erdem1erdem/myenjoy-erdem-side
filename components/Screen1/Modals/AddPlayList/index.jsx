import React, {useState, useEffect} from 'react';
import {Modal, View, StyleSheet} from 'react-native';
import {Header} from './Header';
import {Footer} from './Footer';
import {TopSection} from './TopSection';
import {MainView} from './MainView';
import {actionsApi} from '../../../../shared';
import {useDispatch, useSelector} from 'react-redux';
import {apiCalls} from '../../../../shared/apiCalls';

const AddPlayList = ({visible, onClose}) => {
  const dispatch = useDispatch();
  const [selectedApi, setSelectedApi] = useState('xstream');
  const {macAddress} = useSelector(state => state?.portals);
  const [currentMethod, setCurrentMethod] = useState(1);
  const [showAndroidModal, setshowAndroidModal] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    xstream: {
      title: '',
      userName: '',
      password: '',
      url: '',
    },
    stalker: {
      title: '',
      macAddress: '',
      url: '',
    },
    m3u: {
      title: '',
      url: '',
    },
  });

  useEffect(() => {
    if (macAddress)
      setFormData({...formData, stalker: {...formData['stalker'], macAddress}});
  }, [macAddress]);

  const toggleModal = () => {
    setshowAndroidModal(!showAndroidModal);
  };
  const handleConfirm = async () => {
    setLoading(true);
    const methodType =
      selectedApi === 'm3u' ? 1 : selectedApi === 'stalker' ? 2 : 3;
    const data = {...formData[selectedApi], macAddress, methodType};
    const result = await apiCalls?.portal?.addPortal(data);
    setLoading(false);
    if (result) {
      onClose();
      dispatch(actionsApi?.getPortals({macAddress}));
    }
  };
  const handleChange = (name, value, key) => {
    formData[key] = {
      ...formData[key],
      [name]: value,
    };
    setFormData({...formData});
  };
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}>
      <View style={styles.background}>
        <View style={styles.container}>
          <Header {...{onClose}} />
          <View>
            <TopSection
              {...{
                toggleModal,
                setSelectedApi,
                currentMethod,
                setCurrentMethod,
              }}
            />
            <MainView {...{selectedApi, formData, handleChange}} />
          </View>
          <Footer {...{loading, handleConfirm, onClose}} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: '#1F1F1F',
    width: '45%',
    borderRadius: 7,
  },
});

export {AddPlayList};
