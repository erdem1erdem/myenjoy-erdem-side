import { useState } from "react"
import { Dimensions, View, StyleSheet } from "react-native"
import { UIActivityIndicator } from 'react-native-indicators'
import { useEffect } from "react"
import { LiveTvPlayer } from "./LiveTvPlayer"
import { useSelector } from "react-redux"

const LiveTv= ({leftSideBarItem, currentList})=>{
    
    const windowWidth = Dimensions.get('window').width
    const {hasChannelList}= useSelector(state=> state?.hasChannelList)
    const [loading, setLoading]= useState(false)
    const {value: channelUrl}= useSelector(state => state?.channelUrl)
    const [currentChannel, setCurrentChannel]= useState(null)

    useEffect(()=>{
        if(channelUrl)
            setCurrentChannel(channelUrl)
    }, [channelUrl])

    return (
        <View style={{backgroundColor: "#000",height: '100%', width:  hasChannelList ?(leftSideBarItem === 2 ? windowWidth - 320 : windowWidth - 500):[1,3,4,6,5]?.includes(leftSideBarItem)? windowWidth-250:windowWidth - 325 }}>
            <View style={{height:'100%', justifyContent: "flex-start"}}>
                <View style={styles?.videoContainer}>
                    <LiveTvPlayer channelinfo={currentChannel} {...{ setLoading}}/>
                    {
                        loading &&
                        <View style={styles?.loader}>
                            <UIActivityIndicator color='white' size={22} /> 
                        </View>
                    }
                </View>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    videoContainer:{
        height: '75%', 
        position: 'relative',
        overflow: 'hidden',
        margin: 15
    },
    loader:{
        height: '100%',
        position: 'absolute',
        left:0,
        top:0,
        width: '100%',
        backgroundColor: 'transparent'
    }
})
export {LiveTv}
