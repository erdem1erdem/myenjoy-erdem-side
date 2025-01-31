import { useNavigation } from "@react-navigation/core"
import { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import { TouchableHighlight, Text, StyleSheet, View, ImageBackground } from "react-native"
import { myStyle } from "../../../../data"

const Eposide= ({episode, index, onClose})=>{
    const navigation= useNavigation()
    const {media: Media } = useSelector((state) => state?.other)
    const {seriesMediasStateByCategory} = useSelector((state) => state?.series)
    const [isFocus, setIsFocus]= useState(false)
    const [mediaState, setMediaState]= useState(0)
    const [isResume, setIsResume]= useState(0)

    useEffect(()=>{
        if(episode && seriesMediasStateByCategory?.length){
            let mediaID= Media?.id
            let media= seriesMediasStateByCategory?.find(media=> media?.mediaID==mediaID && media?.episodeID == (episode['tvg-name'] || episode?.id))
            let percent= (media?.duration/media?.time) * 100
            if(media){
                setMediaState(percent)
                setIsResume(media?.duration)
            }
            else{
                setMediaState(0)
                setIsResume(media?.duration)
            }
        }
    }, [episode, seriesMediasStateByCategory])
    const toggleFocus= ()=>{
        setIsFocus(!isFocus)
    }
    const play = ()=>{
        let payload={
                name:  episode['tvg-name'] || episode?.title,
                stream_id: episode?.id,
                extension: episode?.container_extension,
                mediaID: Media?.id,
                episodeID:  episode['tvg-name'] || episode?.id,
                url: episode?.url || null,
                cover: episode['tvg-logo'] || episode?.screenshot_uri || episode?.stream_icon || episode?.cover,
                contineWatch: isResume>0 ? isResume : 0
            }
        onClose()
        navigation.navigate('Screen13', media= payload)
    }

    return (
        <TouchableHighlight 
            onFocus={toggleFocus}
            onBlur={toggleFocus}
            onPress={play}
            key={'eposide-'+index}
            underlayColor= '#333333'
            style={[styles?.episode]}
        >
            <View style={styles?.episodeInnerMain}>
                <Text style={[styles?.textWhite, styles?.weight500]}>{index+1}</Text>
                <View style={styles?.episodeInner}>
                    <ImageBackground 
                        source={{ uri: episode['tvg-logo'] || Media?.cover}} 
                        resizeMode="contain" 
                        style={styles.logo}
                    >
                        {
                            mediaState>0 &&
                            <View style={[styles?.mediaState, {width: `${mediaState}%`}]}></View>
                        }
                    </ImageBackground>  
                    <Text style={styles?.textWhite}>
                        {
                            episode['tvg-name'] || episode?.title
                        }
                    </Text>
                </View>
            </View>
        </TouchableHighlight>
    )
}
const styles = StyleSheet.create({
    episode:{
        paddingHorizontal: 12,
        paddingVertical: 14,
        borderRadius: 4
    },
    episodeInnerMain:{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    episodeInner:{
        display: 'flex',
        flexDirection: 'row'
    },
    logo: {
        width: 75,
        height: 75,
        marginRight: 15,
        borderWidth:1,
        borderColor: 'white',
        overflow: 'hidden',
        borderRadius: 4
    },
    mediaState: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        height: 4,
        backgroundColor: myStyle?.colors?.primaryColor
    },
    weight500:{
        fontWeight: "500"
    },
    text:{
        fontWeight: '500',
        fontSize: 16,
        paddingBottom: 8
    },
    textWhite:{
       color: "#fff"
    }
})
export {Eposide}