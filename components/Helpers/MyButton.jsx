import { useEffect, useState,forwardRef,useRef, useCallback } from "react"
import  {View, TouchableHighlight, StyleSheet, Text, useTVEventHandler, findNodeHandle} from "react-native"
import { Icon } from "react-native-elements"
import { UIActivityIndicator } from 'react-native-indicators'
import { colors, myStyle } from "../../data"


const MyButton =({name, title, isRadio, isCircularLeftSideBar,currentMedia, isCircular, favoriteColor, buttonCoverStyle, buttonStyle, icon, loading, onPress,onLongPress, style, index, ...props}) => {

    const [isFocused, setIsFocused]= useState(false)
    const touchableHighlightRef = useRef(null)
    const onRef = useCallback((ref) => {
      if (ref) {
        touchableHighlightRef.current = ref
      }
    }, [isCircularLeftSideBar,index])

    useEffect(()=>{
        if(isFocused && isRadio)
            onPress()
    }, [isFocused])

    return (
        <>
            {
                isCircularLeftSideBar ?
                <View style={[styles.circularButton, buttonCoverStyle]}>
                    <TouchableHighlight
                        ref={onRef}
                        underlayColor={myStyle?.colors?.secondaryColor}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(null)}
                        nextFocusDown={(index==5 && currentMedia===1)?findNodeHandle(touchableHighlightRef.current):(index==4 && [2,3].includes(currentMedia))?findNodeHandle(touchableHighlightRef.current) : null}
                        nextFocusUp={index==0?findNodeHandle(touchableHighlightRef.current) : null}
                        onPress={onPress}
                        style={[styles?.touchablestyle, style]}
                        {...props}
                    >
                        <View style={{alignItems:'center'}}>
                            <Icon 
                                name={icon} 
                                type="ionicon" 
                                size={27} 
                                color="white" 
                            /> 
                        </View>
                    </TouchableHighlight>
                    {
                        isFocused && 
                        <Text style={styles?.title}>{title}</Text>
                    }
                </View>
                :
                isCircular ?
                <View style={[styles.circularButton, buttonCoverStyle]}>
                    <TouchableHighlight
                        underlayColor={favoriteColor || colors?.primaryColor}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(null)}
                        onPress={onPress}
                        style={[styles?.touchablestyle, buttonStyle || {}]}
                        {...props}
                    >
                        <View style={{alignItems:'center'}}>
                            <Icon 
                                name={icon} 
                                type="ionicon" 
                                size={27} 
                                color="white" 
                            /> 
                        </View>
                    </TouchableHighlight>
                    {
                        isFocused && 
                        <Text numberOfLines={1}  style={[styles.title2]}>{title}</Text>
                    }
                </View>
                : isRadio ?
                <TouchableHighlight
                    hasTVPreferredFocus={true}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(null)}
                    onPress={onPress}
                    underlayColor= '#F83605'
                    style={styles.radioButton}
                >
                    <Text style={styles.radioText}>
                        {
                            name
                        }
                    </Text>
                </TouchableHighlight>
                :
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
                            loading ?  <UIActivityIndicator color='white' size={22} />: 
                            <Text style={styles?.text2}>
                                {title}
                            </Text>
                        }
                    </View>
                </TouchableHighlight>
            }
        </>
    )
}
const styles = StyleSheet.create({
    radioButton: {
        borderRadius: 3,
        paddingHorizontal: 10,
        paddingVertical: 8,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#3C3F45'
    },
    radioText: {
        color: 'white',
        fontSize: 13,
    },
    circularButton:{ 
        flex:1,
        alignItems: 'center', 
        justifyContent:'center',
        height: 55, 
        width: 55,
        position:"relative"
    },
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
    touchablestyle: {
        alignItems: 'center',
        justifyContent:'center',
        width: 45,
        height:45,
        borderRadius: 45/2,  
        backgroundColor: myStyle?.colors?.secondaryColor
    },
    
    title: {
        paddingTop:3,
        color: 'white',
        fontSize: 12,
        textAlign: 'center',
        fontWeight: "600",
    },
    title2: {
        paddingTop:3,
        color: 'white',
        fontSize: 12,
        textAlign: 'center',
        fontWeight: "600",
        position:"absolute", 
        bottom:-1
    },
    text2: {
        fontSize: myStyle?.primaryFontSize?.fontSize,
        color: '#fff'
    },
})

export {MyButton}