import { useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Modal, View, Text, StyleSheet, Keyboard, KeyboardAvoidingView } from 'react-native'
import { UIActivityIndicator } from 'react-native-indicators'
import { MyButton } from '../MyButton'
import { myStyle } from '../../../data'
import { apiCalls } from '../../../shared/apiCalls'
import { showMessage } from 'react-native-flash-message'
import { actionsApi } from '../../../shared'
import { OtpInput } from "react-native-otp-entry"
import { useTranslation } from 'react-i18next'

const PinModal = ({ visible, channelID,channelCat,isLocked, onLockConfirm, unLockChannel, onClose, onVerify, title,setPin }) => {
    const dispatch = useDispatch()
    const { t } = useTranslation();
    const { portalid: portalID, macAddress } = useSelector((state) => state?.portals)
    const { category, lockedChannels } = useSelector((state) => state?.other)
    const { value: currentChannel } = useSelector(state => state?.currentChannel)
    const [loading, setLoading] = useState(false)
    const [incorrectPin, setIncorrectPin] = useState(null)
    const otpInputRef = useRef(null)
    
    const resetPin = (result = null) => {
        if (otpInputRef.current) {
            otpInputRef.current.clear()
            otpInputRef.current.focus()
        }
        setIncorrectPin(result)
    }
    const handlePinInput = async (text) => {
        const pinn = text
        if(title === 'Reset Settings'){
            setPin.current = pinn
        }
        Keyboard.dismiss()
        if (onLockConfirm || onVerify || unLockChannel) {
            setLoading(true)
            let result = await apiCalls?.other?.checkPin({ pin: pinn, macAddress })
            if (result === 1) {
                if (unLockChannel)
                    unLockChannel()
                else if (title)
                    onVerify()
                else
                    onLockConfirm()
                onClose()
            }
            else
                resetPin(result)
            setLoading(false)
        }
        else
            lockUnlockChannel(pinn)
    }
    const lockUnlockChannel = async (pin) => {
        setLoading(true)
        let result
        result = await apiCalls?.other?.checkPin({ pin, macAddress })
        if (result === 1) {
           
            let payload = { portalID, channelID, category: channelCat['group-title'] || category?.id }
            result = await apiCalls?.other?.lockUnLockChannel(payload)
            if (result) {
                if (isLocked) {
                    let temp = lockedChannels?.filter(fin => fin?.channelID !== channelID)
                    dispatch(actionsApi?.lockedChannelsResponse([...temp]))
                    dispatch(actionsApi?.setCurrentChannel({ ...currentChannel, isLocked: false }))
                }
                else {
                    dispatch(actionsApi?.setCurrentChannel({ ...currentChannel, isLocked: true }))
                    dispatch(actionsApi?.lockedChannelsResponse([...lockedChannels, payload]))
                }
                onClose()
                showMessage({ message: result, type: "success", style: { alignItems: 'center', zIndex: 1000 } })
                
            }
            else
                showMessage({ message: 'something went wrong!!!', type: "danger", style: { alignItems: 'center', zIndex: 1000 } })
        }
        else
            resetPin(result)
        setLoading(false)
    }
    return (
        <Modal
            visible={visible}
            transparent={true}
            animationType="slide"
            onRequestClose={onClose}
        >
            <View style={styles.background} >
                <View style={styles.container}>
                    <Text style={styles.heading}>{t('input_pin')}</Text>
                    <KeyboardAvoidingView>
                        <View style={styles.pinContainer}>
                            <OtpInput
                                ref={otpInputRef}
                                numberOfDigits={4}
                                focusColor={myStyle?.colors?.primaryColor}
                                focusStickBlinking
                                Duration={10}
                                onFilled={(text) => handlePinInput(text)}
                                textInputProps={{
                                    accessibilityLabel: "One-Time Password",
                                }}
                                theme={{
                                    containerStyle: styles.pinContainer,
                                    pinCodeContainerStyle: styles.pinBox,
                                    pinCodeTextStyle: {color: '#fff'}
                                }}
                            />
                        </View>
                    </KeyboardAvoidingView>
                    {
                        incorrectPin &&
                        <Text style={styles?.incorrectPin}>
                            {incorrectPin}
                        </Text>
                    }
                    <View style={styles.buttoncontainer}>
                        <MyButton
                            title={t('clear')}
                            onPress={() => resetPin()}
                            style={{ width: 90 }}
                        />
                        <MyButton
                            title={loading ? <UIActivityIndicator color='white' size={22} /> : (title ? title : 'Lock channel')}
                            onPress={lockUnlockChannel}
                            style={{ width: 110 }}
                        />
                    </View>
                </View>
            </View>
        </Modal >
    )
}
const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        justifyContent: 'center',
        paddingBottom: 50,
        alignItems: 'center'
    },
    container: {
        backgroundColor: myStyle?.colors?.grey,
        width: 400,
        borderRadius: myStyle?.primaryBorderRadius,
        display: 'flex',
        alignItems: 'center',
        paddingVertical: 18
    },
    pinContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 25,
        marginVertical: 17
    },
    pinBox: {
        width: 50,
        borderRadius:10
    },
    incorrectPin: {
        color: "rgb(139, 0,0)",
        ...myStyle?.primaryFontSize,
        marginBottom: 20,
        fontWeight: "500"
    },
    buttoncontainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 20,
    },
    heading: {
        color: 'white',
        ...myStyle?.primaryFontSize,
        fontWeight: '500',
    }
})
export { PinModal }