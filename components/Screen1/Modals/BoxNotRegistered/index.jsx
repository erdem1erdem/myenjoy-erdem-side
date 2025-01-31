import { StyleSheet, Text, TouchableHighlight, View, Modal } from 'react-native'


const BoxNotRegistered = ({ visible, onClose }) => {
    return (
        <View style={{}}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={visible}
                onRequestClose={onClose}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>"Oops! It looks like this Android TV box isn't registered with our service yet. To enjoy our content, please register your device through our web admin panel.
                            If you need assistance, feel free to reach out to our support team. Thank you!"</Text>

                        <TouchableHighlight
                            underlayColor='#F83605'
                            style={[styles.button, styles.buttonClose]}
                            onPress={onClose}
                        >
                            <Text style={styles.textStyle}>Exit</Text>
                        </TouchableHighlight>
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
        
    },
    modalView: {
        width:500,
        backgroundColor: '#1F1F1F',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        width: 100,
        borderRadius: 4,
        padding: 5,
        elevation: 2,
    },
    buttonClose: {
        backgroundColor: '#3C3F45'
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 17
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
        fontSize: 16,
        fontWeight: '500',
        color: '#fff'
    },
})

export { BoxNotRegistered }