import { Image, Modal, StyleSheet, TouchableOpacity, View } from 'react-native'
import { LeftSide } from './LeftSide'

const EpisodeModal = ({ visible, onClose ,seasons}) => {

    return (
        <View style={styles.centeredView}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={visible}
                onRequestClose={onClose}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <View style={styles?.topSection}>
                            <TouchableOpacity onPress={onClose}>
                                <Image source={require('../../../../assets/icons/close.png')} style={{ width: 30, height: 30 }} />
                            </TouchableOpacity>
                        </View>
                        <LeftSide {...{seasons, visible, onClose}}/>
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
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: '#1F1F1F',
        borderRadius: 7,
        width: '60%',
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
    topSection:{
        display: 'flex',
        alignItems: 'flex-end'
    }
})

export { EpisodeModal };
