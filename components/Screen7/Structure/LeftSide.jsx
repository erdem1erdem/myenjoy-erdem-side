import {View, Image, StyleSheet} from "react-native"

const LeftSide= ({cover})=>{
    return (
        <View style={styles.leftbanner}>
            <Image 
                source={cover? { uri: cover} : require('../../../assets/movieposter4.jpg')} 
                style={{ width: '100%', height: '100%' }} 
            />
        </View>
    )
}
const styles = StyleSheet.create({
    leftbanner: {
        width: '40%',
        height: '100%'
    }
})
export {LeftSide}