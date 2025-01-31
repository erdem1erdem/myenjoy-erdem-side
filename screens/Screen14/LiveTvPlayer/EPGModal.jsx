import React from 'react'
import { Modal, View, Text,StyleSheet, Image,TouchableHighlight } from 'react-native'

const EPGModal = ({ visible, onClose }) => {
    return (
        <Modal
            visible={visible}
            transparent={true}
            animationType="fade"
            onRequestClose={onClose}
        >
            <View style={styles.background} >
                <View style={styles.upperview}>
                    <TouchableHighlight
                        underlayColor='#FE5112'
                        onPress={onClose}
                    >
                        <Image style={styles.image} source={require('../../../assets/icons/backbutton.png')} />
                    </TouchableHighlight>
                    <Text style={styles.text}>TRT SPOR</Text>
                </View>
                <View style={styles.secondview}>
                    <Text style={styles.text2}>Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. </Text>
                    <Text style={styles.text3}>6.8/10 | Horror/Crime | 75% liked this film | 2018 | 2h 35m </Text>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        width: '100%',
        height: '100%'
    },
    upperview: {
        flexDirection: 'row',
        gap: 20,
        height: 80,
        alignItems: 'center',
        padding: 37,

    },
    secondview: {
        alignItems: 'flex-start',
    },

    image: {
        width: 20,
        height: 18,
    },
    text: {
        color: '#FE5112',
        fontSize: 24,
        fontWeight: '800',
        height: 30,
    },
    text2: {
        color: 'white',
        fontSize: 16,
        fontWeight: '400',
        paddingHorizontal: 38
    },
    text3: {
        marginTop: 15,
        color: 'white',
        fontSize: 14,
        fontWeight: '300',
        paddingHorizontal: 38
    }
})

export { EPGModal }
