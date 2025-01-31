import { useState} from "react"
import  {View, TouchableHighlight, StyleSheet, Text, useTVEventHandler} from "react-native"
import { Icon } from "react-native-elements"
import { colors, myStyle } from "../../data"

const MyButton2 =({ title, icon, onPress,onLongPress, style, index, ...props}) => {
  
    const [isFocused, setIsFocused]= useState(false)
    const [longPress, setLongPress] = useState(false)
    
    const handleTVEvent = evt => {
        if (evt) {
            if (evt.eventType === 'longSelect' && isFocused) {              
                if (!longPress) {
                    setLongPress(true)
                    if (onLongPress) onLongPress()
                }
            }
            else setLongPress(false)
        }
    }
     useTVEventHandler(handleTVEvent)
    return (
        <>
                <TouchableHighlight
                    key={index}
                    onPress={onPress}                 
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    underlayColor={colors?.primaryColor}
                    style={[styles?.button, style]}
                    {...props}   
                >
                    <View style={styles?.buttonInner}>
                        {
                            icon && 
                            <Icon 
                                name={icon} 
                                type="ionicon" 
                                size={22} 
                                color="white" 
                            /> 
                        }
                        { 
                            <Text style={styles?.text2}>
                                {title}
                            </Text>
                        }
                    </View>
                </TouchableHighlight>
        </>
    )
}
const styles = StyleSheet.create({
   
    button: {
        borderRadius: 4,
        backgroundColor: colors?.secondaryColor,
        height: 41
    },
    buttonInner: {
        flex:1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10
    },
  
    text2: {
        fontSize: myStyle?.primaryFontSize?.fontSize,
        color: '#fff'
    },
})

export {MyButton2}