import React, { useState, useEffect } from 'react'
import { Image, Modal, ScrollView, StyleSheet, Text, TouchableHighlight, TouchableOpacity, View } from 'react-native'
import { Icon } from 'react-native-elements'
const BrightnessModal = ({ setVisiblebright, visiblemodal, onClose }) => {
    const [actbutton, setactbutton] = useState(null)

    return (
        <View style={styles.centeredView}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={visiblemodal}
                onRequestClose={onClose}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <TouchableOpacity onPress={onClose} style={styles.closebtn}>
                            <Image source={require('../../../assets/icons/close.png')} style={{ width: 30, height: 30 }} />
                        </TouchableOpacity>
                        <View style={{alignItems:'center'}}>
                            <View style={styles.btun}>
                                <Icon name='sunny' type="ionicon" size={20} color="white" />
                            </View>
                            <Text style={styles.modalText}>Brightness</Text>
                        </View>
                        <View style={styles.bottombtn}>
                            <TouchableHighlight
                                onFocus={() => setactbutton(1)}
                                onBlur={() => setactbutton(null)}
                                onPress={() => { onClose(); setVisiblebright(false);setactbutton(null) }}
                                style={[styles.btn, { backgroundColor: actbutton === 1 ? '#F83605' : '#3C3F45' }]}
                                underlayColor='#F83605'
                            >
                                <Text style={styles.text}>{t('cancel')}</Text>
                            </TouchableHighlight>
                            <TouchableHighlight
                                underlayColor='#F83605'
                                onFocus={() => setactbutton(2)}
                                onBlur={() => setactbutton(null)}
                                onPress={() => { onClose(); setactbutton(null) }}
                                style={[styles.btn, { backgroundColor: actbutton === 2 ? '#F83605' : '#3C3F45' }]}
                            >
                                <Text style={styles.text}>{t('confirm')}</Text>
                            </TouchableHighlight>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: '#1F1F1F',
        borderRadius: 7,
        padding: 25,
        width: '50%',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        position: 'relative'
    },
    modalText: {
        color: 'white',
        fontSize: 14,
        fontWeight: '500',
        paddingTop: 5,
    },
    imgsize: {
        width: 30,
        height: 30,
    },
    radiocontainer: {
        height: 100,
        width: '100%',
        alignItems:'center'

    },
    innerview: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
        gap: 10,
    },
    label: {
        fontSize: 12,
        color: 'white'
    },
    bottombtn: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 10,
        borderTopColor: '#313131',
        borderTopWidth: 1,
        width: '100%',
        paddingTop: 15,
    },
    btn: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 7,
    },
    text: {
        color: 'white',
        fontSize: 13,
        fontWeight: '500',
        textAlign: 'center',
    },
    closebtn: {
        position: 'absolute',
        top: 10,
        right: 10,
        zIndex: 1,
    },
    btun: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 35,
        height: 35,
        backgroundColor: '#F83605',
        borderRadius: 50
    }
})

export { BrightnessModal }
