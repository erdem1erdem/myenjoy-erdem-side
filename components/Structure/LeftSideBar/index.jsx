import { useState } from "react"
import { View, FlatList, StyleSheet, TouchableOpacity, Text} from "react-native"
import { useSelector, useDispatch} from "react-redux"
import { EditMoveCategoryModal } from "./Modals"
import { MyButton, PinModal } from "../../Helpers"
import { myStyle } from "../../../data"
import { actionsApi } from "../../../shared"
import { useTranslation } from "react-i18next"


const LeftSideBar= ({currentMedia, setLeftSideBarItem})=>{
    const { t } = useTranslation();
    const dispatch= useDispatch()
    const {liveTvChannels} = useSelector((state) => state?.liveTv)
    const {movies, movieMediasState}= useSelector(state => state?.movies)
    const {series, seriesMediasState}= useSelector(state => state?.series)
    const {value : liveTvMediasState} = useSelector((state) => state?.liveTvMediasState)
    const {lockedChannels, favoriteChannels, moviesFavorite, seriesFavorite}= useSelector(state => state?.other)
    const [currentItem, setCurrentItem] = useState(null)
    const [visibleEditModal, setVisibleEditModal]= useState(false)
    const [visiblePinModal, setVisiblePinModal]= useState(false)
    
    const data = currentMedia===1 ?
        [
            {
                iconname: 'menu',
                title: t('category'),
                index: 1
            },
            {
                iconname: 'search-outline',
                title: t('search'),
                index: 2
            },
            {
                iconname: 'heart-outline',
                title: t('favs'),
                index: 3
            },
            {
                iconname: 'lock-closed-outline',
                title: t('locks'),
                index: 6
            },
            {
                iconname: 'play-skip-forward-outline',
                title: t('recently_watched'),
                index: 4
            },
            {
                iconname: 'create-outline',
                title: t('edit_categories'),
                index: 5
            }
        ]:
        [
            {
                iconname: 'menu',
                title: t('category'),
                index: 1
            },
            {
                iconname: 'search-outline',
                title: t('search'),
                index: 2
            },
            {
                iconname: 'heart-outline',
                title: t('favs'),
                index: 3
            },
            {
                iconname: 'play-skip-forward-outline',
                title: t('recently_watched'),
                index: 4
            },
            {
                iconname: 'create-outline',
                title: t('edit_categories'),
                index: 5
            }
        ]
    const [index, setIndex]= useState(null)
    const clearStates= ()=>{
        dispatch(actionsApi?.setCategory(null))
        dispatch(actionsApi?.channelsByCategoryClear([]))
        dispatch(actionsApi?.setChannelIndex(null))
        dispatch(actionsApi?.setChannelUrl(null))
    }
    const getFavLockContinueItems= (currentLeftSideBarItem)=>{
        if(currentMedia === 1){
            if(currentLeftSideBarItem === 3 && currentMedia === 1)
                dispatch(actionsApi?.getFavoriteChannels({liveTvChannels, favoriteChannels}))
            else if(currentLeftSideBarItem === 4 && currentMedia === 1)
                dispatch(actionsApi?.getRecentlyWatchChannelsList({liveTvChannels, liveTvMediasState}))
        }
        if(currentMedia === 2){
            if(currentLeftSideBarItem === 3){
                dispatch(actionsApi?.getFavoriteMovies({movies, moviesFavorite}))
            }
            else if(currentLeftSideBarItem === 4)
                dispatch(actionsApi?.getRecentlyViewedMovies({movies, movieMediasState}))
        }
        else if(currentMedia === 3){
            if(currentLeftSideBarItem === 3){
                dispatch(actionsApi?.getFavoriteSeries({series, seriesFavorite}))
            }
            else if(currentLeftSideBarItem === 4)
                dispatch(actionsApi?.getRecentlyViewedSeries({series, seriesMediasState}))
        }
    }
    return (
        <>
        <View style={styles.leftview}>
            <View style={styles?.leftViewInnner}>
            <View style={{height:10,width:40}}>
                <TouchableOpacity hasTVPreferredFocus={true}><Text></Text></TouchableOpacity>
            </View>
                <FlatList
                    data={data}
                    renderItem={({ item: dat, index}) => (
                        <View key={'sidebar-item-'+index}>
                            <MyButton
                                isCircularLeftSideBar
                                title={dat.title}
                                icon={dat.iconname}
                                currentMedia={currentMedia}
                                index={index}
                                onPress={() => {
                                    setCurrentItem(index)
                                    if(dat?.index===6){
                                        setIndex(dat?.index)
                                        setVisiblePinModal(true)
                                    }
                                    else{
                                        clearStates()
                                        setLeftSideBarItem(dat?.index)
                                        if(dat?.index===5)
                                            setVisibleEditModal(true)
                                        else 
                                            getFavLockContinueItems(dat?.index)
                                    }
                                }}
                                buttonCoverStyle={{height: 82, justifyContent: 'flex-start'}}
                                style={{
                                    backgroundColor: index===currentItem ? myStyle?.colors?.primaryColor : myStyle?.colors?.secondaryColor
                                }}
                            />
                        </View>
                    )}
                    keyExtractor={(_, d) => d.toString()}
                />
            </View>
        </View>
        <EditMoveCategoryModal 
            visible={visibleEditModal} 
            onClose={()=> setVisibleEditModal(false)}
        />
        <PinModal
            visible={visiblePinModal} 
            onLockConfirm= {()=>{
                setLeftSideBarItem(index)
                dispatch(actionsApi?.getLockedChannelsList({liveTvChannels, lockedChannels}))
                clearStates()
            }}
            onClose={()=>{setVisiblePinModal(false); setIndex(null)}}
        />
        </>
    )
}

const styles = StyleSheet.create({
    leftview: {
        backgroundColor: '#272727',
        width: 70,
        height: '100%',
    },
    leftViewInnner:{
        flex:1,
        alignItems:'center',
        paddingTop: 15
    },
    text: {
        fontSize: 11,
        color: '#fff',
        textAlign: 'center',
    },
    flex: {
        display: 'flex',
    },
    dnone: {
        display: 'none',
    },
    innerview1: {
        flex:1,
        alignItems: 'center',
        justifyContent: "center",
        width: 55,
        height: 70,
    },
    touchablestyle: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 40,
        height: 40,
        borderRadius: 40 / 2
    },
})
export {LeftSideBar}