import React, { useState,useEffect } from 'react';
import { Image, Modal, ScrollView, StyleSheet, Text, TouchableHighlight, TouchableOpacity, View } from 'react-native';
import { RadioButton } from 'react-native-paper';
import { Icon } from 'react-native-elements'
import { useTranslation } from 'react-i18next';

const SeasonModal = ({ visible, onClose ,totalSeasons,setSelectedSeason,selectedSeason}) => {
    const { t } = useTranslation()
    const [activeradio, setactiveradio] = useState(null)
    const [actbutton, setactbutton] = useState(null)
    const data = Array.from({ length: totalSeasons }, (_, index) => ({
        label: `Season ${index + 1}`
    }))

    const [checked, setChecked] = useState(0)
    const handleRadioPress = index => {
        if (index === checked) {
        
            setChecked(null);
        } else {
            setChecked(index);
        }
    }
   
    useEffect(() => {
        setChecked(selectedSeason-1)
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
                    <TouchableOpacity  onPress={onClose} style={styles.closebtn}>
                        <Image source={require('../../../assets/icons/close.png')} style={{ width: 30, height: 30 }} />
                    </TouchableOpacity>
                    <View style={{alignItems:'center'}}>
                            <View style={styles.btun}>
                                <Icon name='film-outline' type="ionicon" size={20} color="white" />
                            </View>
                            <Text style={styles.modalText}>Season</Text>
                        </View>

                        <ScrollView style={{maxHeight:100}} >
                            <View style={styles.radiocontainer}>
                                {
                                    data?.map((item, index) =>
                                        <TouchableHighlight 
                                        key={index} 
                                        onFocus={()=>{setactiveradio(index)}} 
                                        onPress={() => {handleRadioPress(index)}}
                                        underlayColor='transparent'
                                        
                                        >
                                            <View style={styles.innerview}>
                                                <RadioButton
                                                    value={checked}
                                                    status={checked === index ? 'checked' : 'unchecked'}
                                                    onPress={() => setChecked(index)}
                                                    color='#fff'
                                                />
                                                <Text style={[styles.label , {color:activeradio===index?'#F83605':'white'}]}>{item?.label}</Text>
                                            </View>
                                        </TouchableHighlight>
                                    )
                                }
                            </View>
                        </ScrollView>
                        <View style={styles.bottombtn}>
                            <TouchableHighlight 
                            onFocus={()=> setactbutton(1)} 
                            onPress={() => { setactbutton(1); onClose(); }}
                            style={[styles.btn, { backgroundColor: actbutton===1? '#F83605':'#3C3F45' }]}
                            underlayColor='#F83605'
                            >
                            <Text style={styles.text}>{t('cancel')}</Text>
                            </TouchableHighlight>
                            <TouchableHighlight
                            underlayColor='#F83605'
                            onFocus={()=>setactbutton(2)}
                            onPress={()=>{setSelectedSeason(checked+1);onClose()}}
                            style={[styles.btn,  { backgroundColor: actbutton===2? '#F83605':'#3C3F45' }]}
                            >
                                <Text style={styles.text}>{t('confirm')}</Text>
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
        color:'#fff'
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
        color:'white'
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
    btun: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 35,
        height: 35,
        backgroundColor: '#F83605',
        borderRadius: 50
    }
});

export { SeasonModal };
