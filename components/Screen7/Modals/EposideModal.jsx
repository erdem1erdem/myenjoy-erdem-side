import React, { useEffect, useState } from 'react';
import { Image, Modal, ScrollView, StyleSheet, Text, TouchableHighlight, TouchableOpacity, View } from 'react-native';
import { RadioButton } from 'react-native-paper';
import { Icon } from 'react-native-elements'

const EpisodeModal = ({ visible, onClose ,totalEpi,selectedEpisode,setSelectedEpisode}) => {
  
    const [activeradio, setactiveradio] = useState(null)
    const [actbutton, setactbutton] = useState(null)
    const [checked, setChecked] = useState(0)
  
    const data = Array.from({ length: totalEpi }, (_, index) => ({
        label: `Episode ${index + 1}`
    }))
    
    const handleRadioPress = index => {
        if (index === checked) {

            setChecked(null);
        } else {
            setChecked(index);
        }
    }

    useEffect(() => {
        setChecked(selectedEpisode-1)
       }, [])

    return (
        <View style={styles.centeredView}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={visible}
                onRequestClose={onClose}>
                <View style={styles.centeredView}>

                    <View style={styles.modalView}>
                        <TouchableOpacity onPress={onClose} style={styles.closebtn}>
                            <Image source={require('../../../assets/icons/close.png')} style={{ width: 30, height: 30 }} />
                        </TouchableOpacity>
                        <View style={{alignItems:'center'}}>
                            <View style={styles.btun}>
                                <Icon name='albums-outline' type="ionicon" size={20} color="white" />
                            </View>
                            <Text style={styles.modalText}>Episode</Text>
                        </View>
                        <ScrollView style={{ maxHeight: 300 }} >
                            <View style={styles.radiocontainer}>
                                {
                                    data?.map((item, index) =>
                                        <TouchableHighlight
                                            key={index}
                                            onFocus={() => { setactiveradio(index) }}
                                            onPress={() => handleRadioPress(index)}
                                            underlayColor='transparent'

                                        >
                                            <View style={styles.innerview}>
                                                <RadioButton
                                                    value={checked}
                                                    status={checked === index ? 'checked' : 'unchecked'}
                                                    onPress={() => setChecked(index)}
                                                    color='#fff'
                                                />
                                                <Text style={[styles.label, { color: activeradio === index ? '#F83605' : 'white' }]}>{item?.label}</Text>
                                                <Image source={require('../../../assets/icons/vis.png')} style={styles.imgg} />
                                            </View>
                                        </TouchableHighlight>
                                    )
                                }
                            </View>
                        </ScrollView>
                        <View style={styles.bottombtn}>
                            <TouchableHighlight
                                onFocus={() => setactbutton(1)}
                                onPress={() => { setactbutton(1); onClose(); }}
                                style={[styles.btn, { backgroundColor: actbutton === 1 ? '#F83605' : '#3C3F45' }]}
                                underlayColor='#F83605'
                            >
                                <Text style={styles.text}>Cancel</Text>
                            </TouchableHighlight>
                            <TouchableHighlight
                                underlayColor='#F83605'
                                onFocus={() => setactbutton(2)}
                                onPress={()=>{setSelectedEpisode(checked+1);onClose()}}
                                style={[styles.btn, { backgroundColor: actbutton === 2 ? '#F83605' : '#3C3F45' }]}
                            >
                                <Text style={styles.text}>Confirm</Text>
                            </TouchableHighlight>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

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
        fontSize: 14,
        fontWeight: '500',
        paddingTop: 5,
        color: '#fff'
    },
    imgsize: {
        width: 30,
        height: 30,
    },
    radiocontainer: {
        width: '100%',
        alignItems: 'flex-start',
        paddingHorizontal: 10,
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
        marginTop: 20,
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
        color: '#fff',
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
    imgg: {
        width: 20,
        height: 20
    },
    btun: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 35,
        height: 35,
        backgroundColor: '#F83605',
        borderRadius: 50
    }
});

export { EpisodeModal };
