import { useEffect, useState } from "react"
import { FlatList, TouchableHighlight, View, Text, StyleSheet, useTVEventHandler } from "react-native"
import { useDispatch, useSelector } from "react-redux"
import { actionsApi } from "../../../shared"
import { FlashList } from "@shopify/flash-list"

const CategoriesList= ({selectedItem,setSelectedCategory})=>{
    const dispatch = useDispatch()
    const [pressed, setPressed] = useState(null)
    const [indexSecond, setIndexSecond] = useState(null)
    const categories = useSelector((state) => state?.movies.categoriesData)
    const portID = useSelector((state) => state?.portals.portalid)
    const {portalid,methodType} = useSelector((state) => state?.portals)

    useEffect(()=>{
        if (methodType==='1'){
            
            dispatch(actionsApi?.getMoviesCategoriesM3u({ portalid,methodType }))
        }
        if (methodType==='3'){
            dispatch(actionsApi?.getMoviesCategories({portID}))
        }
       
        setIndexSecond(null)
    }, [selectedItem])
   

    const myTVEventHandler = async (evt) => {

        if ((evt.eventType === 'left' || evt.eventType === 'right') && indexSecond!==null) {
            setIndexSecond(null)
        }
    } 
      useTVEventHandler(myTVEventHandler)

    return (
        <View style={selectedItem === 1 ? [styles.drop2, styles.flex] : [styles.drop2, styles.dnone]}>
            <FlashList
            data={categories}
            extraData={pressed}
            estimatedItemSize={50}
            renderItem={({ item, index: i }) => (
                <TouchableHighlight
                    activeOpacity={1}
                    hasTVPreferredFocus={i===0}
                    onFocus={() => {()=>setIndexSecond(i)}}
                    underlayColor='#ed6745'
                    onPress={() => {setPressed(i);setSelectedCategory(methodType==="1"?item['group-title']:item.category_id)}}
                    key={i}
                    style={[styles?.category, pressed === i?styles.bg2active:null]}
                    >
                    <View style={[styles.btncontent, pressed === i ? styles.bg2active : indexSecond === i && styles.bgactive]}>
                        <Text numberOfLines={1} style={[styles.text, { textAlign: 'left', fontSize: 14 }]}>
                            {methodType==='1'?item['group-title']:item.category_name}
                        </Text>
                    </View>
                </TouchableHighlight>
            )}
            keyExtractor={(item, index) => index.toString()}
        />
        </View>
    )
}

const styles = StyleSheet.create({
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
    drop2: {
        height: '100%',
        width: 180,
        backgroundColor: '#1F1F1F',  
    },
    category:{
        display: 'flex',
        alignItems: 'center',
        borderRadius: 4
    },
    bgactive: {
        backgroundColor: '#ed6745',
        borderRadius: 4
    },
    bg2active: {
        backgroundColor: '#F83605',
        borderRadius: 4
    },
    btncontent: {
        paddingVertical: 10,
        width: '100%',
        paddingHorizontal:20
    }
})
export {CategoriesList}