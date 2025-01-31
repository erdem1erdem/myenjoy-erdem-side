import React, { useState} from 'react';
import { StyleSheet, Text,TouchableHighlight, View, KeyboardAvoidingView, Platform, Keyboard } from 'react-native';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

const UserInfo = () => {

  const {macAddress}= useSelector(state => state?.portals)
  const {settings} = useSelector((state) => state?.other)
  const { t } = useTranslation();
  

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
      <View style={styles.inputCont}>
        <Text style={styles.label}>{t('mac_address1')}</Text>
        <TouchableHighlight
        underlayColor='#979797'  
        style={styles.touchableInput} 
       >
          <Text style={styles.input}>{settings?.macAddress}</Text>
        </TouchableHighlight>
      </View>
      <View style={styles.inputCont}>
        <Text style={styles.label}>{t('serial_number')}</Text>
        <TouchableHighlight
        underlayColor='#979797'  
        style={styles.touchableInput} 
        >
          <Text style={styles.input}>{settings?.serialNumber}</Text>
        </TouchableHighlight>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  input: {
    fontWeight: '400',
    color: 'white',
    fontSize: 13,
    marginLeft:10,
  },
  label: {
    color: 'white',
    fontSize: 13,
    fontWeight: '600',
  },
  inputCont: {
    paddingBottom: 15,
  },
  touchableInput: {
    justifyContent:'center',
    marginTop: 10,
    borderWidth: 0.7,
    borderColor: 'white',
    borderRadius: 5,
    width:400,
    height:38
    
  },
});

export { UserInfo }
