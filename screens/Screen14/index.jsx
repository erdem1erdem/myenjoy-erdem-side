import { View, StyleSheet } from "react-native"
import { useEffect, useState } from "react"
import { LiveTvPlayer } from "./LiveTvPlayer"
import { useDispatch, useSelector } from "react-redux"
import { actionsApi } from "../../shared"
import { apiCalls } from "../../shared/apiCalls"

const LiveTv= ({route})=>{

    const dispatch= useDispatch()
    const {currentMedia,methodType, portalid : portalID} = useSelector(state => state?.portals)
    const {value: category}= useSelector(state => state?.category)
    const {value : liveTvMediasState} = useSelector((state) => state?.liveTvMediasState)
    const { value: channel } = useSelector(state => state?.currentChannel)
    const {value: channelUrl}= useSelector(state => state?.channelUrl)
    const [currentChannel, setCurrentChannel]= useState(null)
    const [channels, setChannels]= useState([])
    
  
    useEffect(()=>{
        if(channelUrl)
            setCurrentChannel(channelUrl)
    }, [channelUrl])
    useEffect(()=>{
        return ()=>{
            if(category)
            saveMediaState()
        }
    },[])
    useEffect(()=>{
        if(route?.params)
            setChannels([...route?.params])
    }, [route])

    const saveMediaState= ()=>{
        let mediaID= methodType === "1"?channel['tvg-name'] : channel?.stream_id
        try {
            let payload={
                portalID,
                mediaType: currentMedia,
                category: category?.id,
                mediaID: mediaID
            }
            let index= liveTvMediasState?.findIndex(media=> media?.mediaID== mediaID)
            if(index>-1){
                let temp2=[...liveTvMediasState]
                let index2= liveTvMediasState?.findIndex(media=> media?.mediaID==mediaID)
                temp2?.splice(index2, 1, payload)
               
                dispatch(actionsApi?.liveTvMediasStateResponse([...temp2]))
            }
            else{
              
                dispatch(actionsApi?.liveTvMediasStateResponse([...liveTvMediasState, payload]))
            }
            apiCalls?.other?.saveMediaState(payload)
        }
        catch (e){
            Alert.alert(JSON.stringify(e))
        }
    }
    
    return (
        <View style={{backgroundColor: "#000",height: '100%', width: '100%'}}>
            <View style={styles?.videoContainerMaximize}>
                <LiveTvPlayer channelinfo={currentChannel} {...{channels}}/>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    videoContainerMaximize:{
        backgroundColor:"#000", 
        position: 'relative',
        overflow: 'hidden',
        height: '100%',
    }
})
export {LiveTv}