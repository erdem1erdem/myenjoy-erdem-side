import React, { useState,useEffect,useRef } from 'react'
import { Modal, View, Text, TouchableOpacity, StyleSheet, Image,TextInput,Keyboard, TouchableHighlight } from 'react-native'
import { useNavigation } from '@react-navigation/core'
import { Icon } from 'react-native-elements'
import { useTranslation } from 'react-i18next'
const PasswordModal = ({ visible, onClose }) => {
    const { t } = useTranslation()
    const [actButton, setActButton] = useState(null)
    const [pinCode, setPinCode] = useState(['', '', '', ''])
    const inputRefs = useRef([])
    const cancelButtonRef = useRef(null)
    const confirmButtonRef = useRef(null)
    const navigation = useNavigation()

    const handlePinInput = (text, index) => {
        const newPinCode = [...pinCode]
        newPinCode[index] = text
        setPinCode(newPinCode)
        if (text && index < pinCode.length - 1) {
            inputRefs.current[index + 1].focus()
        }
    }

    useEffect(() => {
        if (visible) {
            inputRefs.current[0].focus()
          
        }
    }, [])

   

    return (
        <Modal
            visible={visible}
            transparent={true}
            animationType="fade"
            onRequestClose={onClose}
          
        >
            <View style={styles.background} >
                <View style={styles.container}>
                    <View style={{ alignItems: 'flex-end' }}>
                    </View>
                    <View style={{ borderBottomColor: 'white', borderBottomWidth: 0.3, marginBottom: 17 }}>
                    <View style={{alignItems:'center',paddingTop:10}}>
                            <View style={[styles.btun]}>
                                <Icon name='shield-checkmark-outline' type="ionicon" size={20} color="white" />
                            </View>
                            <Text style={styles.modalText}>Password</Text>
                        </View>
                            <View style={styles.pinContainer}>
                                {pinCode.map((digit, index) => (
                                   
                                   <TextInput
                                       key={index}
                                       ref={(ref) => (inputRefs.current[index] = ref)}
                                       style={styles.pinInput}
                                       keyboardType="numeric"
                                       maxLength={1}
                                       value={digit}
                                       onChangeText={(text) => handlePinInput(text, index)}
                                       onSubmitEditing={() => {
                                        if (index === pinCode.length - 1) {  
                                            inputRefs.current[index].blur() 
                                            cancelButtonRef.current.focus() 
                                        }
                                    }}
                                    onFocus={() => setActButton(index)}
                                   />
                               
                                ))}
                            </View>
                      
                    </View>
                    <View style={styles.buttoncontainer}>
                        <TouchableHighlight
                        underlayColor='#F83605'
                            onPress={onClose}
                            ref={cancelButtonRef}
                            style={[styles.button]}
                            onFocus={() => setActButton(pinCode.length)}
                        >
                            <Text style={{ color: 'white' }}>{t('cancel')}</Text>
                        </TouchableHighlight>

                        <TouchableHighlight
                        underlayColor='#F83605'
                            ref={confirmButtonRef}
                            style={[styles.button]}
                            onFocus={() => setActButton(pinCode.length + 1)}
                            onPress={()=>{onClose();navigation.navigate('Screen8')}}
                        >
                            <Text style={{ color: 'white' }}>{t('confirm')}</Text>
                        </TouchableHighlight>

                    </View>
                </View>

            </View>



        </Modal >
    )
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
       
    },
    container: {
        backgroundColor: '#1F1F1F',
        width: '40%',
        borderRadius: 7,
        position:'relative'
    },
    dropdown: {    
        paddingBottom:6,
        height: 35,        
      },
      item: {
        padding:5,
        backgroundColor:'#1F1F1F',       
      },
      textItem: {
        color:'white',
        fontSize: 14,
      },
     
      placeholderStyle: {
        color:'white',
        fontSize: 13,
        paddingHorizontal:10
      },
      selectedTextStyle: {
        color:'white',
        fontSize: 14,
      },
      
    image: {
        width: 35,
        height: 35,

    },
    imagecont: {
        alignItems: 'center',
        marginTop: -10
    },
    text: {
        color: 'white',
        fontSize: 13,
        paddingTop: 5
    },
    textfield: {
        marginTop: -13

    },
    pickeritem: {
        borderWidth: 0.5,
        borderColor: 'white',
        height: 30,
        marginTop: 5,
        marginBottom: 20,
        paddingHorizontal:5,
        alignContent: 'center',
        borderRadius: 4
    },
   
    pinContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap:20,
        marginTop: 20,
        marginBottom:20
    },
    pinInput: {
        borderWidth: 1,
        borderColor: 'white',
        color: 'white',
        fontSize: 16,
        width: '10%',
        height: 40,
        textAlign: 'center',
        borderRadius: 5,
    },
    button: {
        borderRadius: 3,
        alignItems: 'center',
        justifyContent: 'center',
        width: 83,
        height: 30,
        backgroundColor: '#3C3F45'
    },
    buttoncontainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 20,
        paddingBottom: 15
    },
    btun: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 35,
        height: 35,
        backgroundColor: '#F83605',
        borderRadius: 50
    },
modalText: {
        color: 'white',
        fontSize: 14,
        fontWeight: '500',
        paddingTop: 5,
    },
})

export { PasswordModal }
