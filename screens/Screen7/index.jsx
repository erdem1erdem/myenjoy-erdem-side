import { View, StyleSheet} from 'react-native'
import { LeftSide, RightSide } from '../../components/Screen7'

const Screen7 = ({route}) => {
  const {item} = route.params
  
  return (
    <View style={styles?.container}>
      <LeftSide cover={item['tvg-logo'] || item?.screenshot_uri || item?.stream_icon || item?.cover}/>
      <RightSide {...{item}}/>
    </View>
  )
}
const styles = StyleSheet.create({
  container:{
    flexDirection: 'row', 
    height: '100%', 
    backgroundColor: '#000' 
  }
})

export {Screen7}