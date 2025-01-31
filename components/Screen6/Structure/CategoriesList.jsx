import { useEffect, useState } from "react"
import { FlatList, TouchableHighlight, View, Text, StyleSheet, useTVEventHandler, Alert } from "react-native"
import { useDispatch, useSelector } from "react-redux"
import { actionsApi } from "../../../shared"

const CategoriesList = ({ selectedItem, setCategoryID }) => {

    const dispatch = useDispatch()
    const [indexSecond, setIndexSecond] = useState(null)
    const { categories } = useSelector((state) => state?.series) 
    const [pressed, setPressed] = useState(null)
    const {portalid,methodType} = useSelector((state) => state?.portals)

    useEffect(()=>{
        if (selectedItem === 1) {
            if (methodType==='1'){
                dispatch(actionsApi?.getSeriesCategoriesM3u({ portalid,methodType }))
            }
            if (methodType==='3'){
                dispatch(actionsApi?.getSeriesCategories({ portID: portalid }))
            }
            setIndexSecond(null)
        }
       
       
        setIndexSecond(null)
    }, [selectedItem])

    useEffect(() => {
       
    }, [selectedItem])

    const myTVEventHandler = async (evt) => {

        if ((evt.eventType === 'left' || evt.eventType === 'right') && indexSecond !== null) {
            setIndexSecond(null)
        }
    }
    useTVEventHandler(myTVEventHandler)

    return (
        <View style={selectedItem === 1 ? [styles.drop2, styles.flex] : [styles.drop2, styles.dnone]}>
            
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
        backgroundColor: '#1F1F1F',
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
    bg2active: {
        backgroundColor: '#F83605',
        borderRadius: 4
    },
    btncontent: {
        paddingVertical: 10,
        width: '100%',
        paddingHorizontal: 10
    }
})
export { CategoriesList }