
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { View, StyleSheet, Modal, Dimensions, FlatList} from 'react-native'
import { Header } from './Header'
import { Footer } from './Footer'
import { Cell } from './Cell'
import { actionsApi } from '../../../../../shared'
import { apiCalls } from '../../../../../shared/apiCalls'

const EditMoveCategoryModal = ({ visible, onClose }) => {

    const dispatch= useDispatch()
    const { liveTvCategories } = useSelector(state => state?.liveTv)
    const { movieCategories } = useSelector(state => state?.movies)
    const { seriesCategories } = useSelector(state => state?.series)
    const {hiddenMoviesCategories, hiddenSeriesCategories,hiddenChannelsCategories}= useSelector(state => state?.other)
    const { currentMedia, macAddress, methodType, portalid : portalID} = useSelector((state) => state?.portals)
    const [categories, setCategories]= useState([])
    const windowHeight = Dimensions.get('window').height
    const [state, setState]= useState([])
    const [loading, setLoading]= useState(false)
   
    useEffect(() => {
        setCategories(currentMedia===2 ? movieCategories : currentMedia===3 ? seriesCategories : liveTvCategories)
    }, [currentMedia])

    useEffect(()=>{
        if(categories?.length){
            if(currentMedia===2 && hiddenMoviesCategories?.length)
                setState([...hiddenMoviesCategories?.map(category => category?.category)])
            else if(currentMedia===3 && hiddenSeriesCategories?.length)
                setState([...hiddenSeriesCategories?.map(category => category?.category)])
            else if (currentMedia===1 && hiddenChannelsCategories?.length)
                setState([...hiddenChannelsCategories?.map(category => category?.category)])
        }
    }, [categories, currentMedia, hiddenMoviesCategories, hiddenSeriesCategories,hiddenChannelsCategories])
 
    const handleItemPress = (index) => {
        if (state.includes(index)) {
            state.splice(state.indexOf(index), 1)
        } else {
            state.push(index)
        }
        setState([...state])
    }
    const addHiddenCategories= async ()=>{
        setLoading(true)
        let tempArr= state?.map(category=>({category, macAddress, mediaType: currentMedia, methodType, portalID}))
        let result= await apiCalls?.other?.addHiddenCategories({categories: tempArr})
        if(result){
            onClose()
            dispatch(actionsApi?.hiddenCategoriesResponse({data:tempArr, mediaType: currentMedia}))
        }
        setLoading(false)
    }
    return (
        <>
        <Modal
            visible={visible}
            transparent={true}
            animationType="slide"
            onRequestClose={onClose}
        >
        <View style={styles.background}>
            <View style={[styles.container, {height: windowHeight}]}>
                <Header {...{onClose}}/>
                <View style={{height:windowHeight-100}}>
                <FlatList
                    data={categories}
                    extraData={state} 
                    renderItem={({ item, index}) => (
                        <Cell {...{index, state, handleItemPress, item}}/>
                    )}
                    keyExtractor={(_, index) => index.toString()}
                />
                </View>
                <Footer {...{loading, addHiddenCategories}}/>
            </View>
        </View>
    </Modal>
    </>
    )
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        alignItems: "flex-end"
    },
    container: {
        backgroundColor: '#1F1F1F',
        width: 350,
        borderTopLeftRadius: 7,
        justifyContent:'space-between'
    }
})

export { EditMoveCategoryModal}

