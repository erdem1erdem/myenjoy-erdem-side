import { useState, useEffect, useCallback, memo, useMemo, useRef } from "react"
import { View, Dimensions, StyleSheet, FlatList, TouchableHighlight, ImageBackground, Text, TVEventHandler, findNodeHandle } from "react-native"
import { useSelector, useDispatch } from "react-redux"
import { UIActivityIndicator } from 'react-native-indicators'
import { MyMessage, PinModal, ShowMore } from "../../Helpers"
import { actionsApi, helpers } from "../../../shared"
import { SearchBar } from "../SearchBar"
import { useNavigation } from "@react-navigation/core"
import { myStyle } from "../../../data"
import { useTranslation } from "react-i18next"
const windowHeight = Dimensions.get('window').height


const Card = memo(({ item, index, leftSideBarItem, handleFocus, totalnumber }) => {
  const dispatch = useDispatch()
  const navigation = useNavigation()
 
  const { movieMediasStateByCategory } = useSelector((state) => state?.movies)
  const { currentMedia } = useSelector((state) => state?.portals)
  const [isFocused, setIsFocused] = useState(null)
  const cover = item['tvg-logo'] || item?.screenshot_uri || item?.stream_icon || item?.cover
  const [mediaState, setMediaState] = useState(0)
  const [visiblePinModal, setVisiblePinModal] = useState(false)

  const touchableHighlightRef = useRef(null)
  const onRef = useCallback((ref) => {
    if (ref) {
      touchableHighlightRef.current = ref
    }
  }, [item])
  useEffect(() => {
    if (item && movieMediasStateByCategory?.length && currentMedia === 2) {
      let mediaID = item['tvg-name'] || item?.stream_id || item?.series_id
      let media = movieMediasStateByCategory?.find(media => media?.mediaID == mediaID)
      let percent = (media?.duration / media?.time) * 100
      if (media)
        setMediaState(percent)
      else
        setMediaState(0)
    }
  }, [item, movieMediasStateByCategory, currentMedia])
  const onPressItem = (item) => {
    let mediaName = item?.name || item['tvg-name']
    let isAdult = helpers?.isAdult(mediaName)
    if (item?.is_adult || isAdult)
      setVisiblePinModal(true)
    else
      unLockChannel(item, cover)
  }
  const unLockChannel = (item, cover) => {

    let mediaID = item['tvg-name'] || item?.stream_id || item?.series_id

    if (leftSideBarItem === 2) {
      let id = item['group-title'] || item?.id || item?.category_id
      let name = item['group-title'] || item?.title || item.category_name
      dispatch(actionsApi?.setCategory({ id, name }))
    }
    dispatch(actionsApi?.setMedia({ id: mediaID, cover }))
    navigation.navigate('Screen7', { item })
  }

  return (
    <>
      <View style={[styles.card, { height: windowHeight / 2, width: '25%' }]}>
        <TouchableHighlight
          ref={onRef}
          nextFocusUp={[0, 1, 2, 3].includes(index) ? findNodeHandle(touchableHighlightRef.current) : null}
          nextFocusDown={[totalnumber - 1, totalnumber - 2, totalnumber - 3, totalnumber - 4].includes(index) ? findNodeHandle(touchableHighlightRef.current) : null}
          onPress={() => onPressItem(item)}
          onFocus={() => { setIsFocused(index); handleFocus(index) }}
          onBlur={() => setIsFocused(false)}
        >
          <View style={[styles?.cardInner, isFocused === index && styles.activeCard]}>
            <ImageBackground
              source={cover ? { uri: cover } : require('../../../assets/movieposter4.jpg')}
              style={styles.imagestyle}
            >
              {
                isFocused === index &&
                <View style={styles?.activeCardInner}>
                  <Text style={styles.title}>
                    {
                      item?.name || item['tvg-name']
                    }
                  </Text>
                </View>
              }
              {
                mediaState > 0 &&
                <View style={[styles?.mediaState, { width: `${mediaState}%` }]}></View>
              }
            </ImageBackground>
          </View>
        </TouchableHighlight>
      </View>
      <PinModal
        visible={visiblePinModal}
        unLockChannel={() => unLockChannel(item, cover)}
        onClose={() => { setVisiblePinModal(false) }}
      />
    </>
  )
})

const RightMainSection = ({ leftSideBarItem, text, showSearchBar }) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const { movies } = useSelector((state) => state?.movies)
  const { series } = useSelector((state) => state?.series)
  
  const { methodType, currentMedia } = useSelector((state) => state?.portals)
  const { moviesFavorite, seriesFavorite } = useSelector(state => state?.other)
  const { value: category } = useSelector(state => state?.category)
  const { value: moviesByCategory, allMoviesInCategory, moviesPageNo, totalMovies } = useSelector(state => state?.moviesByCategory)
  const { value: seriesByCategory, allSeriesInCategory, seriesPageNo, totalSeries } = useSelector(state => state?.seriesByCategory)
  const {value: favoriteMovies}= useSelector(state => state?.favoriteMovies)
  const {value: recentlyViewedMovies}= useSelector(state => state?.recentlyViewedMovies)
  const {value: favoriteSeries}= useSelector(state=> state?.favoriteSeries)
  const {value: recentlyViewedSeries}= useSelector(state => state?.recentlyViewedSeries)

  const windowWidth = Dimensions.get('window').width
  const [num, setNum] = useState(1)
  const [numColumns, setNumColumns] = useState(4)
  const [key, setKey] = useState(false)
  const flashListRef = useRef(null)
  const indexRefMain = useRef(null)
  useEffect(() => {
    if (leftSideBarItem === 2)
      setNumColumns(5)
    else
      setNumColumns(4)
    setKey(prevKey => prevKey + 1);
  }, [leftSideBarItem])

  useEffect(() => {
    dispatch(actionsApi?.moviesByCategoryClear())
    dispatch(actionsApi?.seriesByCategoryClear())
    if (category?.id && leftSideBarItem !== 2) {
      setNum(1)
      if (currentMedia === 2)
        dispatch(actionsApi?.getMoviesByCategory({ categoryID: category?.id, methodType, movies, leftSideBarItem, moviesPageNo: 1 }))
      else
        dispatch(actionsApi?.getSeriesByCategory({ categoryID: category?.id, methodType, series, leftSideBarItem, seriesPageNo: 1 }))
    }
  }, [category, leftSideBarItem])


  const items = useMemo(() => {
    if (
        moviesByCategory?.length || 
        allMoviesInCategory.length || 
        allSeriesInCategory.length || 
        seriesByCategory?.length || 
        moviesFavorite?.length ||
        recentlyViewedMovies?.length ||
        favoriteSeries?.length ||
        recentlyViewedSeries?.length
      ){
        let temp = []
        if (currentMedia === 2 && (leftSideBarItem === 1 || leftSideBarItem === 5)) {
          const arrayMovies = leftSideBarItem === 1 ? moviesByCategory : allMoviesInCategory
          temp = arrayMovies?.map(movie => {
            let mediaID = movie['tvg-name'] || movie?.stream_id || movie?.series_id
            let isFavorite = moviesFavorite?.findIndex(fin => fin?.mediaID === mediaID)
            return (isFavorite > -1 ? { ...movie, isFavorite: true } : { ...movie, isFavorite: false })
          })
        }
        else if (currentMedia === 3 && (leftSideBarItem === 1 || leftSideBarItem === 5) ) {
          const arraySeries = leftSideBarItem === 1 ? seriesByCategory : allSeriesInCategory
          temp = arraySeries?.map(season => {
            let mediaID = season['tvg-name'] || season?.stream_id || season?.series_id
            let isFavorite = seriesFavorite?.findIndex(fin => fin?.mediaID == mediaID)
            return (isFavorite > -1 ? { ...season, isFavorite: true } : { ...season, isFavorite: false })
          })
        }
        else if (leftSideBarItem === 2) 
          temp = currentMedia === 2 ? [...moviesByCategory] : [...seriesByCategory]
        else if(leftSideBarItem === 3)
          temp= currentMedia === 2 ? [...favoriteMovies] : [...favoriteSeries]
        else if(leftSideBarItem === 4)
          temp= currentMedia ===2 ? [...recentlyViewedMovies] : [...recentlyViewedSeries]
        else
          temp = []
        temp = temp?.map((item, index) => ({ ...item, myID: 'movie-' + index?.toString() }))
        return [...temp]
      }
  }, [moviesByCategory, seriesByCategory, allSeriesInCategory, allMoviesInCategory, favoriteMovies, favoriteSeries, recentlyViewedMovies, recentlyViewedSeries, moviesFavorite, seriesFavorite, leftSideBarItem])

  const call = () => {
    setNum(2)
    if (currentMedia === 2)
      dispatch(actionsApi?.getMoviesByCategory({ categoryID: category?.id, methodType, movies, leftSideBarItem, text, moviesPageNo: moviesPageNo + 1 }))
    else if (currentMedia === 3)
      dispatch(actionsApi?.getSeriesByCategory({ categoryID: category?.id, methodType, series, leftSideBarItem, text, seriesPageNo: seriesPageNo + 1 }))
  }
  const handleFocus = useCallback((index) => {
    indexRefMain.current = index
  }, [])
  let tvEventHandler = null
  useEffect(() => {
    tvEventHandler = new TVEventHandler()
    tvEventHandler.enable(this, (cmp, evt) => {
      if (true) {
        
        if (evt && ["down", "up", "left", "right","longUp","longDown"]?.includes(evt.eventType)) {
          let index = parseInt(indexRefMain?.current)
          let totalContent = currentMedia===2?totalMovies:totalSeries
          if(items?.length >8 && [0,1,2,3].includes(index) && (evt.eventType==="longUp" || evt.eventType==="up")){
            flashListRef.current.scrollToIndex({ index: 0, animated: true })
          }
          if(items?.length >8 && items?.length === totalContent && [items?.length-1,items?.length-2,items?.length-3,items?.length-4].includes(index) &&(evt.eventType==="longDown" || evt.eventType==="down")){
            flashListRef.current.scrollToEnd({ animated: true })
          }
          if (currentMedia === 2) {
            if ((moviesPageNo * 8) < totalMovies && (index >= items?.length - 4))
              call()
          }
          else if (currentMedia === 3) {
            if ((seriesPageNo * 8) < totalSeries && (index >= items?.length - 4)) {
              call()
            }
          }
        }
      }
    })
    return () => {
      if (tvEventHandler) {
        tvEventHandler.disable()
        tvEventHandler = null
      }
    }
  }, [items, totalMovies, moviesPageNo, currentMedia])

  const [selectedId, setSelectedId] = useState(null)
  const handlePress = useCallback((myID) => {
    setSelectedId(myID)
  }, [])
  const renderListItem = useCallback(({ item, index }) => {
    const isSelected = item?.myID === selectedId
    return (
      <Card {...{
        item,
        index,
        leftSideBarItem,
        selectedId,
        handleFocus,
        moviesPageNo,
        totalMovies,
        indexRefMain,
      }}
        totalnumber={items.length}
      />
    )
  }, [selectedId, leftSideBarItem, items])

  return (
    <View style={{ width: [1, 3, 4]?.includes(leftSideBarItem) ? windowWidth - 250 : windowWidth - 70, height: '100%' }}>
      <View style={{ flex: 1, flexDirection: 'column', backgroundColor: '#000' }} >
        {
          (category?.id === null && leftSideBarItem !== 2) ?
            <MyMessage title="Select any Category" />
            :
            ((!items || items.length === 0) && leftSideBarItem === 2 && text !== '' && !showSearchBar) ?
              <MyMessage title={t('no_result_found')} />
              :
              <View style={[styles.parentview, { flex: 1 }]}>
                <FlatList
                ref={flashListRef}
                  data={items}
                  key={key}
                  renderItem={renderListItem}
                  horizontal={false}
                  numColumns={4}
                  columnWrapperStyle={{
                    flex: 1
                  }}
                  keyExtractor={item => 'movie-' + item?.myID}
                  initialNumToRender={8}
                  snapToInterval={windowHeight / 1.8}
                  removeClippedSubviews={true}
                  extraData={selectedId}
                />
              </View>
        }
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  parentview: {
    overflow: 'visible'
  },
  imgview: {
    width: '100%',
    height: 230,
    marginRight: 15,
    transform: [{ scaleX: 1 }, { scaleY: 1 }],
    marginBottom: 15,
    borderRadius: 5,
    alignItems: 'center',
    overflow: 'hidden',
  },
  title: {
    position: 'absolute',
    top: '20%',
    left: 0,
    right: 0,
    textAlign: 'center',
    color: 'white',
    fontWeight: '900',
    zIndex: 1,
    paddingHorizontal: 5,
    fontSize: 19,
  },
  activepro: {
    transform: [{ scaleX: 1.1 }, { scaleY: 1.1 }],
    elevation: 2,
    overlayColor: 'rgba(0,0,0,0.9)',
    backgroundColor: 'rgba(0,0,0,1)',
    borderColor: 'white',
    borderWidth: 4
  },
  imagestyle: {
    width: "100%",
    height: "100%",
    borderRadius: 5,

  },
  imgg: {
    position: 'absolute',
    top: 10,
    left: 100,
    right: 0,
    width: 25,
    height: 25
  },
  settingbut: {
    width: 200,
    alignItems: 'center',
  },
  btn: {
    backgroundColor: '#3C3F45',
    height: 40,
    borderRadius: 4,
    justifyContent: 'center',
    width: '65%',
  },
  //card
  card: {
    paddingVertical: 20,
    paddingHorizontal: 10
  },
  cardInner: {
    borderRadius: 15,
    backgroundColor: myStyle?.colors?.secondaryColor
  },
  activeCard: {
    transform: [{ scaleX: 1.1 }, { scaleY: 1.1 }],
    elevation: 2,
    overlayColor: 'rgba(0,0,0,0.9)',
    backgroundColor: 'rgba(0,0,0,1)',
    borderColor: 'white',
    borderWidth: 4,
    borderRadius: 15,
    overflow: 'hidden'
  },
  activeCardInner: {
    position: 'absolute',
    height: '100%',
    left: 0,
    right: 0,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)'
  },
  title: {
    textAlign: 'center',
    color: 'white',
    fontWeight: '900',
    zIndex: 1,
    paddingHorizontal: 5,
    fontSize: 19,
  },
  imagestyle: {
    width: "100%",
    height: "100%",
  },
  mediaState: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    height: 10,
    backgroundColor: myStyle?.colors?.primaryColor
  }
})
export { RightMainSection }