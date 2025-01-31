import React, { useState, useEffect, useCallback, useMemo, useRef, memo } from 'react'
import { FlatList, Text, View, StyleSheet, TouchableHighlight, TVEventHandler, findNodeHandle } from 'react-native';
import { useDispatch, useSelector } from 'react-redux'
import { myStyle } from '../../../data'
import { actionsApi, helpers } from '../../../shared'
import { PinModal } from '../../Helpers'

// Memoized item component
const Category = memo(({item, onPress, isSelected, index, lastIndex,categories, handleFocus, getFirstIndex, getLastIndex}) => {
     const {value: category}= useSelector(state => state?.category)
    const {methodType} = useSelector((state) => state?.portals)
    const touchableHighlightRef = useRef(null)
   
    const onRef = useCallback((ref) => {
      if (ref) {
        touchableHighlightRef.current = ref
        if(index==="0") 
            getFirstIndex(ref)
        else if(index===(lastIndex-1)?.toString())
            getLastIndex(ref)
      }
    }, [categories])

    const dispatch= useDispatch()
    const [visiblePinModal, setVisiblePinModal]= useState(false)
    const unLockCategory= (item)=>{
        let id= methodType==="1" ? item['group-title'] :  (item?.id || item?.category_id)
        let name=  methodType==="1" ? item['group-title'] : ( item?.title || item.category_name)
        dispatch(actionsApi?.setCategory({id , name}))
        onPress(item?.myID)
    }
    return (
        <>
            <TouchableHighlight
                ref={onRef}
                activeOpacity={1}
                hasTVPreferredFocus={index === "0"}
                nextFocusDown={index==(lastIndex-1).toString()?findNodeHandle(touchableHighlightRef.current) : null}
                nextFocusUp={index==0?findNodeHandle(touchableHighlightRef.current) : null}
                underlayColor= {myStyle?.colors?.secondaryColor}
                onFocus={()=> handleFocus(item?.myID)}
                // onBlur={()=> handleFocus(null)}
                onPress={()=>{
                    let name= item['group-title'] || item?.title || item.category_name
                    let isAdult= helpers?.isAdult(name)
                    if(isAdult)
                        setVisiblePinModal(true)
                    else
                        unLockCategory(item)
                }}
                style={[styles?.category, isSelected ? styles.activeCategory : null]}
            >
                <View style={styles.btncontent}>
                    <Text
                        numberOfLines={1} 
                        style={styles.text}
                    >
                        {
                            item['group-title'] || item?.title || item?.category_name
                        }
                        {
                            item?.totalChannels ? " ("+ item?.totalChannels +")" : ""
                        }
                    </Text>
                </View>
            </TouchableHighlight>
            <PinModal 
                visible={visiblePinModal} 
                unLockChannel={()=> unLockCategory(item)}
                onClose={()=>{setVisiblePinModal(false)}}
            />
        </>
    )
})

export default function CategoriesList({leftSideBarItem, currentList}) {
    const dispatch = useDispatch()
    const flashListRef = useRef(null)
    const firstIndexRef = useRef(null)
    const lastIndexRef = useRef(null)
    const {value: category}= useSelector(state => state?.category)
    const { liveTvCategories } = useSelector(state => state?.liveTv)
    const { movieCategories,movieMediasState } = useSelector(state => state?.movies)
    const { seriesCategories,seriesMediasState } = useSelector(state => state?.series)
    const {moviesFavorite, seriesFavorite, hiddenMoviesCategories, hiddenSeriesCategories,hiddenChannelsCategories, favoriteChannels, lockedChannels} = useSelector(state => state?.other)
    const { currentMedia } = useSelector((state) => state?.portals)
    const {value : liveTvMediasState}= useSelector(state => state?.liveTvMediasState)
    const lastIndex= useRef(null)
    const indexref = useRef(null)
    
    const categories= useMemo(() => {
        if (currentMedia === 1 && liveTvCategories?.length) {
            let tempArr = liveTvCategories?.filter((category) => {
                let categoryID = category['group-title'] || category?.id || category?.category_id
                let index = lockedChannels?.findIndex(fin => fin?.category === categoryID)
                if (hiddenChannelsCategories?.findIndex(fin => fin?.category === categoryID) === -1) {
                    if (leftSideBarItem == 6)
                        return index > -1
                    else if (leftSideBarItem === 3) {
                        let favoriteIndex = favoriteChannels?.findIndex(fin => fin?.category === categoryID && index === -1)
                        return favoriteIndex > -1
                    }
                    else if (leftSideBarItem === 4)
                        return liveTvMediasState?.findIndex(fin => fin?.category === categoryID) !== -1
                    // return index > -1 ? false : true
                    return true
                }
                return false
            })
            lastIndex.current= tempArr?.length
            tempArr= tempArr?.map((category, index)=> ({...category, myID: index?.toString()}))
            return [...tempArr]
        }
        else if (currentMedia === 2 && movieCategories?.length) {
            let tempArr = movieCategories?.filter(category => {
                let categoryID = category['group-title'] || category?.id || category?.category_id
                if (hiddenMoviesCategories?.findIndex(fin => fin?.category === categoryID) === -1) {
                    if (leftSideBarItem === 3)
                        return moviesFavorite?.findIndex(fin => fin?.category === categoryID) !== -1
                    else if (leftSideBarItem === 4)
                        return movieMediasState?.findIndex(fin => fin?.category === categoryID) !== -1
                    return true
                }
                return false
            })
            lastIndex.current= tempArr?.length
            tempArr= tempArr?.map((category, index)=> ({...category, myID: index?.toString()}))
            return [...tempArr]
        }
        else if (currentMedia === 3 && seriesCategories?.length) {
            let tempArr = seriesCategories?.filter(category => {
                let categoryID = category['group-title'] || category?.id || category?.category_id
                if (hiddenSeriesCategories?.findIndex(fin => fin?.category === categoryID) === -1) {
                    if (leftSideBarItem === 3)
                        return seriesFavorite?.findIndex(fin => fin?.category === categoryID) !== -1
                    else if (leftSideBarItem === 4)
                        return seriesMediasState?.findIndex(fin => fin?.category === categoryID) !== -1
                    return true
                }
                return false
            })
            lastIndex.current= tempArr?.length
            tempArr= tempArr?.map((category, index)=> ({...category, myID: index?.toString()}))
            return [...tempArr]
        }
    }, [currentMedia, liveTvCategories, movieCategories, seriesCategories, favoriteChannels,  lockedChannels,  leftSideBarItem])

    const [move, setMove]= useState(false)
    const [moveDown, setMoveDown]= useState(false)
    let tvEventHandler= null
    useEffect(()=>{
        tvEventHandler=  new TVEventHandler()
        tvEventHandler.enable(this, (cmp, evt)=>{
                if( currentList?.current=== 'categories'){
                    if(evt && evt.eventType === "down" && leftSideBarItem===1){
                        if(move){
                            if((indexref?.current === (categories?.length - 1)?.toString())){
                                flashListRef.current.scrollToIndex({ index: 0, animated: false })
                                firstIndexRef.current.requestTVFocus()
                                setMove(false)
                                setMoveDown(true)
                            }
                        }
                        else if((indexref?.current === (categories?.length - 1)?.toString()))
                            setMove(true)
                        else {
                            setMove(false)
                            setMoveDown(false)
                        }
                    }
                    if(evt && evt.eventType === "up" && leftSideBarItem===1){
                        if(moveDown){
                            if((indexref?.current === "0")){
                                flashListRef.current.scrollToIndex({ index: categories?.length - 1, animated: false })
                                lastIndexRef.current.requestTVFocus()
                                setMoveDown(false)
                                setMove(true)
                            }
                        }
                        else if((indexref?.current === "0"))
                            setMoveDown(true)
                        else {
                            setMoveDown(false)
                            setMove(false)
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
    },[move, moveDown , leftSideBarItem])
    const handleFocus = useCallback((index)=>{
        indexref.current=index 
        currentList.current= 'categories'
    }, [])
    const getFirstIndex = useCallback((ref)=>{
        firstIndexRef.current=ref 
    }, [])
    const getLastIndex = useCallback((ref)=>{
        lastIndexRef.current=ref 
    }, [])
  const [selectedId, setSelectedId] = useState(null);  
    const handlePress = useCallback((myID) => {
       setSelectedId(myID)
    }, [])
 
    const renderItem = useCallback(({item}) =>  {
        const isSelected = item.myID === selectedId
        return (
            <Category {...{ 
                item, 
                onPress:handlePress,
                isSelected,
                handleFocus,
                index: item?.myID, 
                lastIndex: lastIndex?.current,
                getFirstIndex, 
                getLastIndex,
                categories
                }} 
            />
        )
    }, [selectedId,categories])
    return (
        <View style={[1]?.includes(leftSideBarItem) ? [styles.drop2, styles.flex] : [styles.drop2, styles.dnone]}>
            <FlatList
                ref={flashListRef}
                data={categories}
                style={{ overflow: 'scroll' }}
                persistentScrollbar={true}
                renderItem={renderItem}
                keyExtractor={item => item?.myID}
                initialNumToRender={15}
                removeClippedSubviews={true}
                extraData={selectedId}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    text: {
        color: '#fff',
        textAlign: 'left',
        fontSize: 14,
    },
    flex: {
        display: 'flex',
    },
    dnone: {
        display: 'none',
    },
    drop2: {
        height: '100%',
        width: 180,
        backgroundColor: '#1F1F1F' ,
        padding: 5
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
        paddingHorizontal: 10
    },
    text: {
        color: '#fff',
        textAlign: 'left',
        fontSize: 14,
    },
    category: {
        display: 'flex',
        alignItems: 'center',
        borderRadius: 4
    },
    activeCategory: {
        backgroundColor: myStyle?.colors?.primaryColor
    },
    btncontent: {
        paddingVertical: 10,
        width: '100%',
        paddingHorizontal: 10
    }
})
export { CategoriesList }