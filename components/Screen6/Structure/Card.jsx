import { useState } from 'react'
import { useNavigation } from '@react-navigation/core'
import { View, TouchableHighlight ,ImageBackground, Text, StyleSheet, Dimensions} from 'react-native'
import { Icon } from 'react-native-elements'

const Card= ({item, index, categoryID})=>{

    const navigation = useNavigation()
    const windowHeight = Dimensions.get('window').height
    const [currentItem, setCurrentItem] = useState(null)

    const onPressItem = (item, index) => {
        setCurrentItem(index)
        navigation.navigate('Screen7', { itemDetail: item, categoryID })
    }
    return (
        <View style={[styles.card, {height: windowHeight/2}]}>
            <TouchableHighlight
                onPress={()=> onPressItem(item, index)}
                onFocus={() => setCurrentItem(index)}
                onBlur={() => setCurrentItem(null)}
            >
                <View style={[styles?.cardInner,  currentItem === index && styles.activeCard]}>
                    <ImageBackground
                        
                        source={(item?.cover || item['tvg-logo']) ? { uri: item?.cover || item['tvg-logo'] } : require('../../../assets/movieposter4.jpg')}
                        style={styles.imagestyle}
                    >
                        {
                            currentItem === index && 
                            <Text style={styles.title}>
                                {
                                    item.name || item['tvg-name']
                                }
                            </Text>
                        }
                        <Icon name='eye' type="ionicon" size={30} color="white" style={styles.eyeIcon} />
                    </ImageBackground>
                </View>
            </TouchableHighlight>
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        paddingTop: 20,
        paddingHorizontal: 10,
        width: '25%',
    },
    cardInner: {
        borderRadius: 15
    },
    activeCard: {
        transform: [{ scaleX: 1.1 }, { scaleY: 1.1 }],
        elevation: 2,
        overlayColor: 'rgba(0,0,0,0.9)',
        backgroundColor: 'rgba(0,0,0,1)',
        borderColor: 'white',
        borderWidth: 4
      },
    title: {
      position: 'absolute',
      top: '20%',
      left: 0,
      right: 0,
      textAlign: 'center',
      color: 'white',
      fontWeight: '900',
      zIndex: 1,
      paddingHorizontal: 5,
      fontSize: 19,
    },
    imagestyle: {
      width: "100%",
      height: "100%",
    },
    eyeIcon: {
      position: 'absolute',
      top: 10,
      right: 10,
    }
  })
export {Card}