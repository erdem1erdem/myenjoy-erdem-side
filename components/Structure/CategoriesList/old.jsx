import { memo, useCallback, useEffect, useRef, useState } from "react"
import { useSelector } from "react-redux"
import { View, StyleSheet, useTVEventHandler, FlatList } from "react-native"
import { myStyle } from "../../../data"
import Category from "./Category"

const CategoriesList = memo(({ leftSideBarItem, isSceen3}) => {

    const flashListRef = useRef(null)
    const firstIndexRef = useRef(null)
    const lastIndexRef = useRef(null)
    const { liveTvCategories } = useSelector(state => state?.liveTv)
    const { categoriesData, movieMediasState } = useSelector(state => state?.movies)
    const { seriesCategories, seriesMediasState } = useSelector(state => state?.series)
    const { hiddenMoviesCategories, hiddenSeriesCategories, favoriteChannels, moviesFavorite, seriesFavorite, lockedChannels} = useSelector(state => state?.other)
    const [pressed, setPressed] = useState(null)
    const { currentMedia } = useSelector((state) => state?.portals)
    const [categories, setCategories] = useState([])
    const lastIndex= useRef(null)
    const indexref = useRef(null)

    useEffect(() => {
        if (currentMedia === 1 && liveTvCategories?.length) {
            let tempArr = liveTvCategories?.filter((category) => {
                let categoryID = category['group-title'] || category?.id || category?.category_id
                let index = lockedChannels?.findIndex(fin => fin?.category === categoryID)
                if (leftSideBarItem == 6)
                    return index > -1
                else if (leftSideBarItem === 3) {
                    let favoriteIndex = favoriteChannels?.findIndex(fin => fin?.category === categoryID && index === -1)
                    return favoriteIndex > -1
                }
                // else if (leftSideBarItem === 4)
                //     return liveTvMediasState?.findIndex(fin => fin?.category === categoryID) !== -1
                return index > -1 ? false : true
            })
            lastIndex.current= tempArr?.length
            setCategories([...tempArr])
        }
        else if (currentMedia === 2 && categoriesData?.length) {
            let tempArr = categoriesData?.filter(category => {
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
            setCategories([...tempArr])
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
            setCategories([...tempArr])
        }
        else
            setCategories([])
    }, [currentMedia, liveTvCategories, categoriesData, seriesCategories, hiddenMoviesCategories, hiddenSeriesCategories, favoriteChannels, moviesFavorite, seriesFavorite, lockedChannels, movieMediasState, seriesMediasState, leftSideBarItem])

    
    
    return (
        <View style={[1, 3, 4, 6]?.includes(leftSideBarItem) ? [styles.drop2, styles.flex] : [styles.drop2, styles.dnone]}>
            <FlatList
                ref={flashListRef}
                data={categories}
                style={{ overflow: 'scroll' }}
                persistentScrollbar={true}
                renderItem={renderItem}
                keyExtractor={(_, index) => index}
                initialNumToRender={15}
                removeClippedSubviews={true}
                extraData={pressed}
                // windowSize={3}
            />
        </View>
    )
})

  