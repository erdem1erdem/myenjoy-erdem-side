// filepath: /c:/Users/erdtp/iptv-turkey-application-ui-972a95d5d57e/components/Screen9/DeleteModal/index.jsx
import React, { useState } from 'react';
import { Image, Modal, StyleSheet, Text, View } from 'react-native';
import { myStyle } from '../../../data';
import { MyButton } from '../../Helpers';
import { UIActivityIndicator } from 'react-native-indicators';
import { useTranslation } from 'react-i18next';

const DeleteModal = ({ showDeleteModal, toggleDeleteModal, deletePortal, loading, setLoading }) => {
  const { t } = useTranslation();

  const handleConfirm = () => {
    deletePortal();
  };

  const handleCancel = () => {
    toggleDeleteModal();
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={showDeleteModal}
      onRequestClose={toggleDeleteModal}>
      <View style={styles.modalContainer}>
        <View style={styles.modalView}>
          <View style={{ alignItems: 'center' }}>
            <Image source={require('../../../assets/icons/Delete.png')} style={styles.imgsize} />
            <Text style={styles.modalText}>{t('delete_portal')}</Text>
          </View>
          <Text style={styles.modalContentText}>{t('delete_confirmation')}</Text>
          <View style={styles.bottomButtons}>
            <MyButton
              title={t('cancel')}
              onPress={handleCancel}
              style={{ width: 110 }}
            />
            <MyButton
              title={loading ? <UIActivityIndicator color="white" size={22} /> : t('confirm')}
              onPress={handleConfirm}
              style={{ width: 110 }}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    backgroundColor: myStyle?.colors?.grey,
    width: 400,
    borderRadius: 7,
    padding: 25,
    alignItems: 'center',
  },
  modalText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    marginTop: 10,
  },
  modalContentText: {
    color: 'white',
    fontWeight: '400',
    textAlign: 'center',
    marginTop: 20,
  },
  imgsize: {
    width: 30,
    height: 30,
  },
  bottomButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
    gap: 10,
    borderTopColor: '#313131',
    borderTopWidth: 1,
    width: '100%',
    paddingTop: 15,
  },
});

export { DeleteModal };