import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, Text, ScrollView, View, KeyboardAvoidingView, Platform, Keyboard } from 'react-native';
import { UIActivityIndicator } from 'react-native-indicators';
import { MyButton } from '../../Helpers';
import { useSelector } from 'react-redux';
import { showMessage } from 'react-native-flash-message';
import { PinComponent } from './PinComponent';
import { apiCalls } from '../../../shared/apiCalls';
import { OtpInput } from "react-native-otp-entry"
import { myStyle } from '../../../data'
import { useTranslation } from 'react-i18next';
const ChangePassword = () => {
  const { t } = useTranslation();
  const [oldPin, setOldPin] = useState('');
  const [newPin, setNewPin] = useState('');
// const [confirmPin, setConfirmPin] = useState(['', '', '', '']);
  const confirmRef = useRef(null)
  const [loading, setLoading] = useState(false);
  const { macAddress } = useSelector((state) => state?.portals);

  const oldPinRef = useRef(null);
  const newPinRef = useRef(null);
  const confirmPinRef = useRef(null);
  const resetButtonRef = useRef(null);

  const resetPin = () => {
   
      oldPinRef.current.clear()
      newPinRef.current.clear()
      confirmPinRef.current.clear()
     
    
}

  useEffect(() => {
    if (oldPinRef.current) {
      oldPinRef.current.focus();
    }
  }, []);
  // useEffect(() => {
  //   if (confirmPin.every(d => d !== '')) {
  //     handleReset()
  //   }
  // }, [confirmPin])

  const handleReset = async () => {
    Keyboard.dismiss()
   let confirm = String(confirmRef.current)
    setLoading(true)
    const payload = {
      'macAddress': macAddress,
      'oldPin': oldPin,
      'pin': newPin,
      'confirmationPin': confirm
    }
    let result = await apiCalls?.other?.resetPin({ ...payload })
    setLoading(false)
    if (result === 1) {
      resetPin()
      showMessage({
        message: t('success_reset'),
        type: "success",
        style: { alignItems: 'center' }
      });
    } else {
      resetPin()
        oldPinRef.current.focus()
      showMessage({
        message: result || t('went_wrong'),
        type: "danger",
        style: { alignItems: 'center' }
      });
    }
   
    setOldPin('')
    setNewPin('')
    confirmPinRef.current=null
    

  };

  return (
    <ScrollView>
      <KeyboardAvoidingView behavior={Platform.OS === 'android' ? 'padding' : 'height'} style={styles.container}>
        <View style={{ flex: 1, gap: 20 }}>
          <View style={{width:280}}>
            <Text style={styles.text}>{t('enter_old_pin')}</Text>
            {/* <PinComponent
              ref={oldPinRef}
              pin={oldPin}
              setPin={setOldPin}
              onSubmitEditing={() => newPinRef.current.focus()}
            /> */}
            <OtpInput
              ref={oldPinRef}
              numberOfDigits={4}
              focusColor={myStyle?.colors?.primaryColor}
              focusStickBlinking
              Duration={10}
              onFilled={(text) =>{setOldPin(text); newPinRef.current.focus()}}
              textInputProps={{
                accessibilityLabel: "One-Time Password",
              }}
              theme={{
                containerStyle: styles.pinContainer,
                pinCodeContainerStyle: styles.pinBox,
                pinCodeTextStyle: { color: '#fff' }
              }}
            />
          </View>
          <View style={{width:280}}>
            <Text style={styles.text}>{t('enter_new_pin')}</Text>
            {/* <PinComponent
              ref={newPinRef}
              pin={newPin}
              setPin={setNewPin}
              onSubmitEditing={() => confirmPinRef.current.focus()}
            /> */}
             <OtpInput
              ref={newPinRef}
              autoFocus={false}
              numberOfDigits={4}
              focusColor={myStyle?.colors?.primaryColor}
              focusStickBlinking
              Duration={10}
              onFilled={(text) =>{setNewPin(text);confirmPinRef.current.focus()}}
              textInputProps={{
                accessibilityLabel: "One-Time Password",
              }}
              theme={{
                containerStyle: styles.pinContainer,
                pinCodeContainerStyle: styles.pinBox,
                pinCodeTextStyle: { color: '#fff' }
              }}
            />
          </View>
          <View style={{width:280}}>
            <Text style={styles.text}>{t('confirm_new_pin')}</Text>
            {/* <PinComponent
              ref={confirmPinRef}
              pin={confirmPin}
              setPin={setConfirmPin}
            /> */}
             <OtpInput
              ref={confirmPinRef}
              autoFocus={false}
              numberOfDigits={4}
              focusColor={myStyle?.colors?.primaryColor}
              focusStickBlinking
              Duration={10}
              onFilled={(text) =>{confirmRef.current = text;handleReset()}}
              textInputProps={{
                accessibilityLabel: "One-Time Password",
              }}
              theme={{
                containerStyle: styles.pinContainer,
                pinCodeContainerStyle: styles.pinBox,
                pinCodeTextStyle: { color: '#fff' }
              }}
            />
          </View>
          <MyButton
            title={loading ? <UIActivityIndicator color="white" size={22} /> : t('reset_pin')}
            onPress={handleReset}
            style={{ width: 110 }}
          />
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '400',
  },
  pinContainer: {
    flexDirection: 'row',
    gap: 2,
    marginVertical: 17,
},
pinBox: {
    width: 50,
    borderRadius:10
},
});

export { ChangePassword };
