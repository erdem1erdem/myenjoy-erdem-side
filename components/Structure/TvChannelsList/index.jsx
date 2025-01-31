import React, { useState, useEffect,useRef, memo, useCallback, useMemo} from "react"
import { View, StyleSheet, FlatList, TouchableHighlight, Text, ImageBackground, TVEventHandler, findNodeHandle} from "react-native"
import { useSelector, useDispatch } from "react-redux"
import { actionsApi } from "../../../shared"
import { apiCalls } from "../../../shared/apiCalls"
import { SearchBar } from "../SearchBar"
import { MyMessage } from "../../Helpers"
import { useFocusEffect, useNavigation } from "@react-navigation/core"
import { myStyle } from "../../../data"
import { currentChannel } from "../../../shared/redux/action"
import { useTranslation } from "react-i18next"
const ITEM_HEIGHT = 55

const Card = memo(({item, onPressChannel,indexRef2, isSelected, index, lastIndex2, handleFocus, getFirstIndex2, getLastIndex2,indexRef3,channelIndex}) => {
  const {value: cat}= useSelector(state => state?.category)
  const [category , setCategory] = useState(null)
 
  useEffect(()=>{
      setCategory(cat)
  },[cat])

  const touchableHighlightRef = useRef(null)
   const onRef = useCallback((ref) => {
     if (ref) {
       touchableHighlightRef.current = ref
       if(channelIndex && channelIndex==index){
        indexRef3.current = ref
       }
       if(index==="0") 
          getFirstIndex2(ref)
       else if(index==(lastIndex2-1)?.toString()){
           getLastIndex2(ref)
       }
     }
   }, [channelIndex , item])

 
 return (
    <TouchableHighlight
      activeOpacity={1}
      ref={onRef}
      nextFocusDown={index==(lastIndex2-1).toString()?findNodeHandle(touchableHighlightRef.current) : null}
      nextFocusUp={index==0?findNodeHandle(touchableHighlightRef.current) : null}
      onFocus={()=>handleFocus(item?.myID)}
      onPress={()=> {onPressChannel(item)}}
      onBlur={()=> handleFocus(null)}
      underlayColor= {myStyle?.colors?.secondaryColor}
      style={[styles?.category, isSelected ? styles.activeCategory : null]}
    >
      <View style={styles.btncontent}  >
          <Text  style={{...styles.text, color: myStyle?.colors?.primaryColor}}>{parseInt(item?.myID)+1}</Text>
          <ImageBackground 
              source={{ uri: item['tvg-logo'] || item?.stream_icon}} 
              resizeMode="contain" 
              style={styles.logo}
          >
          </ImageBackground>
          <Text
              numberOfLines={1} 
              style={styles.text1}
          >
              {
                  item?.name || item['tvg-name']
              }
          </Text>
      </View>
    </TouchableHighlight>
  )
},(prevProps, nextProps) => {
  
  return prevProps.isSelected === nextProps.isSelected && prevProps.item === nextProps.item
})

const TvChannelsList= ({leftSideBarItem, currentList})=>{
    const { t } = useTranslation()
    const dispatch= useDispatch()
    const navigation= useNavigation()
    const {liveTvChannels, pagination} = useSelector((state) => state?.liveTv)
    const {value: channelsByCategory}= useSelector(state => state?.channelsByCategory)
    const {filteredChannels}= useSelector(state => state?.filteredchannels)
    const {portalid: portalID, methodType, currentMedia} = useSelector((state) => state?.portals)
    const {value: category}= useSelector(state => state?.category)
    const {value: channelIndex}= useSelector(state => state?.channelIndex)
    const {value : liveTvMediasState}= useSelector(state => state?.liveTvMediasState)
    const {value: favoriteChannels}= useSelector(state=> state?.favoriteChannels)
    const {value: lockedChannels}= useSelector(state=> state?.lockedChannels)
    const {value: recentlyWatchChannels}= useSelector(state=> state?.recentlyWatchChannels)
    const [load,setLoad] = useState(false) 
    const indexRef2 = useRef(null)
    const channelFlatListRef = useRef(null)
    const firstIndexRef2 = useRef(null)
    const lastIndexRef2 = useRef(null)
    const lastIndex2= useRef(null)
    const indexRef3 = useRef(null)
    const backref = useRef(false)
   
    useEffect(() => {
     
      if (category?.id) {
        dispatch(actionsApi?.channelIndexClear())
        dispatch(actionsApi?.getChannelsByCategory({categoryID: category?.id, methodType, liveTvChannels,leftSideBarItem}))
      }
    }, [category])
    let items= useMemo(()=>{
      if(channelsByCategory?.length){
        
        let tempArr= channelsByCategory?.filter(channel=>{
          let channelID= channel['tvg-name']?.trim() || channel?.stream_id
          let index= lockedChannels?.findIndex(fin=> fin?.channelID===channelID)
          if(leftSideBarItem===6)
            return index>-1
          else if(leftSideBarItem===3){
            let favoriteIndex= favoriteChannels?.findIndex(fin=> fin?.mediaID===channelID && index===-1)
            return favoriteIndex>-1
          }
          else if(leftSideBarItem === 4)
            return liveTvMediasState?.findIndex(media=> media?.mediaID == channelID) > -1
          return index===-1
        })
        lastIndex2.current= tempArr?.length
        tempArr= tempArr?.map((channel, index)=> ({...channel, myID: index?.toString()}))
        setLoad(false)
        return [...tempArr]
      }
      else if(leftSideBarItem===3 && favoriteChannels?.length){
        let tempArr= favoriteChannels?.map((channel, index)=> ({...channel, myID: index?.toString()}))
        lastIndex2.current= tempArr?.length
        setLoad(false)
        return [...tempArr]
      }
      else if(leftSideBarItem===4 && recentlyWatchChannels?.length){
        let tempArr= recentlyWatchChannels?.map((channel, index)=> ({...channel, myID: index?.toString()}))
        lastIndex2.current= tempArr?.length
        setLoad(false)
        return [...tempArr]
      }
      else if(leftSideBarItem === 6){
        let tempArr= lockedChannels?.map((channel, index)=> ({...channel, myID: index?.toString()}))
        lastIndex2.current= tempArr?.length
        setLoad(false)
        return [...tempArr]
      }
      else{
        lastIndex2.current= null
        setLoad(false)
        return []
      }
    }, [channelsByCategory, lockedChannels, favoriteChannels, recentlyWatchChannels, leftSideBarItem, filteredChannels])

    useEffect(()=>{
      return ()=>{
        dispatch(actionsApi?.setCategory(null))
        dispatch(actionsApi?.channelsByCategoryClear([]))
      }
    }, [])
    useEffect(()=>{
      if(items?.length)
        dispatch(actionsApi?.setHasChannelList(true))
      else
        dispatch(actionsApi?.setHasChannelList(false))
    },[items])

    useFocusEffect(
      useCallback(() => {
        try{
          if (backref.current) {
            if (channelIndex) {
                const index = parseInt(channelIndex)
                if(items?.length >= 9)
                    channelFlatListRef.current.scrollToIndex({ index, animated: false })
                backref.current=false
            }
            if(indexRef3.current){
                indexRef3.current.requestTVFocus()
                backref.current=false
            }
          }
        }catch(err){
          console.log('error')
        }
         
      }, [channelIndex ,category])
  )

    const onPressItem =  useCallback((item) => { 
      let index= item?.myID
      dispatch(actionsApi?.setChannelIndex(index))
      loadChannel(item, index)
    }, [currentChannel])
    
    const loadChannel= async (item, index)=>{
      let url= null
      if(methodType==="3"){
          const body = {portalID, streamID: item?.stream_id, extension:'ts'}
          url= await apiCalls.liveTV.createTvUrl({...body})
      }
      dispatch(actionsApi?.setChannelUrl(item?.url || url))
      index= parseInt(index)
      dispatch(actionsApi?.setCurrentChannel(leftSideBarItem===6 ? {...item, isLocked: true, index} : {...item, index}))
    }    

    const [move2, setMove2]= useState(false)
    const [moveDown2, setMoveDown2]= useState(false)
    
    let tvEventHandler= null
    useEffect(()=>{
      tvEventHandler=  new TVEventHandler()
      tvEventHandler.enable(this, (cmp, evt)=>{
        if(currentList?.current=== 'channels'){
          if(evt && evt.eventType==="select"){
            if(channelIndex === indexRef2?.current  && channelIndex!==null){
              backref.current=true
              navigation.navigate('Screen14', items)
            }
          }
          if(evt && evt.eventType === "down"){
         
              if(move2){
             
                if((indexRef2?.current === (lastIndex2?.current - 1)?.toString()) && lastIndex2?.current >=9){
                  channelFlatListRef.current.scrollToIndex({ index: 0, animated: false })
                  setTimeout(() => {
                   firstIndexRef2.current.requestTVFocus()
                  }, 300)
                   setMove2(false)
                   setMoveDown2(true)
                }
              }
              if((indexRef2?.current === (lastIndex2?.current - 1)?.toString())){
              
                setMove2(true)
              }
                  
              else {
                  setMove2(false)
                  setMoveDown2(false)
              }
          }
          if(evt && evt.eventType === "up"){
              if(moveDown2){
                if((indexRef2?.current === "0" && lastIndex2?.current >=9)){
                  channelFlatListRef.current.scrollToIndex({ index: lastIndex2?.current - 1, animated: false })
                  setTimeout(() => {
                   lastIndexRef2.current.requestTVFocus()
                  }, 300)
                   setMoveDown2(false)
                   setMove2(true)
                }
              }
              else if((indexRef2?.current === "0"))
                  setMoveDown2(true)
              else {
                  setMoveDown2(false)
                  setMove2(false)
              }
          }
        }
      })
      return ()=> {
        if(tvEventHandler){
          tvEventHandler.disable()
          tvEventHandler= null
        }
      }
    }, [move2, moveDown2, firstIndexRef2, lastIndexRef2, indexRef2, channelIndex])
    const handleFocus = useCallback((index)=>{
      indexRef2.current=index 
      currentList.current= 'channels'
    }, [])
    const getFirstIndex2 = useCallback((ref)=>{
        
        firstIndexRef2.current=ref 
    }, [])
    const getLastIndex2 = useCallback((ref)=>{
       
        lastIndexRef2.current=ref 
    }, [])
    const renderItem = useCallback(({item}) =>  {
       const isSelected = item.myID === channelIndex
        
        return (
            <Card {...{ 
                item, 
                onPressChannel:onPressItem,
                isSelected,
                handleFocus,
                index: item?.myID, 
                lastIndex2: lastIndex2?.current,
                getFirstIndex2, 
                getLastIndex2 ,
                indexRef3,
                channelIndex,
                indexRef2,
              }}   
            />
        )
    }, [channelIndex , category])

const getItemLayout = (data, index) => ({
  length: ITEM_HEIGHT, 
  offset: ITEM_HEIGHT * index, 
  index, 
})
const scrollToIndexFailed=()=>{
  console.log("index not found")
}

    return (
      <View style={{paddingTop: 3, backgroundColor: leftSideBarItem=== 2 ? "#1F1F1F" : '#272727' }}>
        <View style={(!items?.length && leftSideBarItem !==2) ? styles?.containerHidden : [1,2,3,4,6]?.includes(leftSideBarItem) ? styles?.container : styles?.containerHidden}>
          <View style={{ flex: 1, flexDirection: 'column',  padding: 5}} >
            {
                (items && items.length===0 && leftSideBarItem===2)?
                  <MyMessage title={t('no_result_found')}/>
                  :
                <View style={styles.parentview}>
                  <FlatList
                    ref={channelFlatListRef}
                    data={items}
                    // key={category?.id}
                    style={{overflow: 'scroll'}}
                    renderItem={renderItem}
                    keyExtractor={item => item?.myID}
                    initialNumToRender={15}
                    removeClippedSubviews={true}
                    // extraData={channelIndex}
                    getItemLayout={getItemLayout}
                    onScrollToIndexFailed={scrollToIndexFailed}
                  />
                </View>
            }
          </View>
        </View>
      </View>
    )
}
const styles = StyleSheet.create({
    container:{
      height: '100%',
      width: 250
    },
    containerHidden:{
      display: 'none'
    },
    parentview: {
      overflow: 'visible',
      flex: 1
    },
    category: {
      display: 'flex',
      alignItems: 'center',
      borderRadius: 4
  },
  bgactive: {
      backgroundColor: '#ed6745',
      borderRadius: 4
  },
  activeCategory: {
      backgroundColor: myStyle?.colors?.primaryColor
  },
  btncontent: {
      paddingVertical: 10,
      width: '100%',
      paddingHorizontal: 10,
      flex:1,
      gap: 15,
      flexDirection: 'row',
      alignItems: 'center',
  },
  logo: {
      width: 35,
      height: 35
  },
  text1: {
      color: '#fff',
      textAlign: 'left',
      fontSize: 14,
      fontWeight: "600",
      width:155
  },
  text: {
      color: '#fff',
      textAlign: 'left',
      fontSize: 14,
      fontWeight: "600",
  },
})  
export {TvChannelsList}