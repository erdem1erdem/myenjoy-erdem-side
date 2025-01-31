import { Image, StyleSheet, View, ActivityIndicator } from 'react-native'
import { myStyle } from '../../data'

const Screen12 = () => {

  return (
    <View style={styles?.container}>
      <Image 
        style={styles?.logo} 
        source={require('../../assets/images/logo1.png')} 
      />
      <ActivityIndicator size="400" color= {myStyle?.colors?.primaryColor} />
    </View>
  )
}
  const styles = StyleSheet.create({
    container:{
      flex:1,
      backgroundColor:'black', 
      justifyContent: 'center',
      alignItems: 'center',
    },
    logo: {
      width: 533,
      height: 158,
      marginBottom: 20
    }
  })
export {Screen12}