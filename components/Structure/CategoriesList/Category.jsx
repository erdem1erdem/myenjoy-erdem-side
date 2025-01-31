import { TouchableHighlight, StyleSheet, View, Text} from "react-native"
import { myStyle } from "../../../data"
import { useDispatch, useSelector } from "react-redux"
import { actionsApi, helpers } from "../../../shared"
import { memo, useCallback, useRef, useState } from "react"
import { PinModal } from "../../Helpers"

const Category= memo(({item, index,indexref, firstIndexRef,lastIndexRef,lastIndex, pressed, setPressed})=>{

    const dispatch= useDispatch() 
    const { currentMedia} = useSelector((state) => state?.portals)
    const {liveTvMediasState}= useSelector(state => state?.liveTv)
    const {movieMediasState} = useSelector(state => state?.movies)
    const {seriesMediasState}= useSelector(state => state?.series)
    const [visiblePinModal, setVisiblePinModal]= useState(false)

    const touchableHighlightRef = useRef(null);
    const onRef = useCallback((ref) => {
      if (ref) {
        touchableHighlightRef.current = ref
        if(index===0) firstIndexRef.current = ref
        else if(index===lastIndex-1)
            lastIndexRef.current = ref
      }
    }, [])
 

    const handleFocus = (index)=>{
        indexref.current=index 
    }
 
    const unLockCategory= ()=>{
        let id= item['group-title'] || item?.id || item?.category_id
        let name= item['group-title'] || item?.title || item.category_name
        dispatch(actionsApi?.setCategory({id , name}))
        setPressed(index)
      
     
        // else if(movieMediasState?.length && currentMedia===2)
        //     dispatch(actionsApi?.movieMediasStateByCategoryResponse(movieMediasState?.filter(media=> media?.category===id)))
        // else  if(seriesMediasState?.length && currentMedia===3)
        //     dispatch(actionsApi?.seriesMediasStateByCategoryResponse(seriesMediasState?.filter(media=> media?.category===id)))
    }
    return (
        <>
            <TouchableHighlight
                ref={onRef}
                activeOpacity={1}
                hasTVPreferredFocus={index === 0}
                underlayColor= {myStyle?.colors?.secondaryColor}
                onFocus={()=> handleFocus(index)}
                onPress={() => { 
                
                    let name= item['group-title'] || item?.title || item.category_name
                    let isAdult= helpers?.isAdult(name)
                    if(isAdult)
                        setVisiblePinModal(true)
                    else
                        unLockCategory()

                }}
                key={'category-'+index}
                style={[styles?.category, pressed === index ? styles.activeCategory : null]}
                // style={styles?.category}
            >
                <View style={styles.btncontent}>
                    <Text
                        numberOfLines={1} 
                        style={styles.text}
                    >
                        {
                            item['group-title'] || item?.title || item.category_name
                        }
                        {
                            item?.totalChannels ? " ("+ item?.totalChannels +")" : ""
                        }
                    </Text>
                </View>
            </TouchableHighlight>
            <PinModal 
                visible={visiblePinModal} 
                unLockChannel={unLockCategory}
                onClose={()=>{setVisiblePinModal(false)}}
            />
        </>
    )
}) 
const styles = StyleSheet.create({
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
export default Category