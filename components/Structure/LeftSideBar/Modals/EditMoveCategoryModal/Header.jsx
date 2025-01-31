import {View, TouchableHighlight, Image, StyleSheet} from "react-native"
const Header= ({onClose})=>{
    return (
        <View style={{ alignItems: 'flex-end'}}>
            <TouchableHighlight
                activeOpacity={1}
                underlayColor='#F83605'
                onPress={onClose}
            >
                <Image 
                    style={styles?.image} 
                    source={require('../../../../../assets/icons/close-icon.png')} 
                />
            </TouchableHighlight>
        </View>
    )
}

const styles = StyleSheet.create({
    image: {
        width: 35,
        height: 35,
    }
})
export {Header}