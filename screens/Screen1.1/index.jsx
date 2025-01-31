import {useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { View } from 'react-native'
import { EndButtons, MainOptions, TopBar } from '../../components'
import { actionsApi } from '../../shared'

const Screen11 = () => {

  const dispatch= useDispatch()
  const {portalid : portalID, methodType, macAddress} = useSelector((state) => state?.portals)
 
  useEffect(()=>{
    // dispatch(actionsApi?.getLiveTvCategories({portalID, methodType}))
   
   

    dispatch(actionsApi?.getHiddenCategories({macAddress,mediaType: 1, methodType, portalID}))
    dispatch(actionsApi?.getHiddenCategories({macAddress,mediaType: 2, methodType, portalID}))
    dispatch(actionsApi?.getHiddenCategories({macAddress,mediaType: 3, methodType, portalID}))



    dispatch(actionsApi?.getFavorites({mediaType: 1, portalID}))
    dispatch(actionsApi?.getFavorites({mediaType: 2, portalID}))
    dispatch(actionsApi?.getFavorites({mediaType: 3, portalID}))

    dispatch(actionsApi?.getLiveTvMediasState({mediaType: 1, portalID}))
    dispatch(actionsApi?.getMovieMediasState({mediaType: 2, portalID}))
    dispatch(actionsApi?.getSeriesMediasState({mediaType: 3, portalID}))
    dispatch(actionsApi?.getSettings(macAddress))
  
    return(()=>{

      //liveTV
      dispatch(actionsApi?.liveTvCategoriesClear())
      dispatch(actionsApi?.liveTvChannelsClear())

      //movies
      dispatch(actionsApi?.movieCategoriesClear())
      dispatch(actionsApi?.moviesClear())

      // series
      dispatch(actionsApi?.seriesCategoriesClear())
      dispatch(actionsApi?.seriesClear())


      dispatch(actionsApi?.hiddentCategoriesClear(1))
      dispatch(actionsApi?.hiddentCategoriesClear(2))
      dispatch(actionsApi?.hiddentCategoriesClear(3))
      dispatch(actionsApi?.favoritesClear(1))
      dispatch(actionsApi?.favoritesClear(2))
      dispatch(actionsApi?.favoritesClear(3))
      
      dispatch(actionsApi?.channelsByCategoryClear())
      dispatch(actionsApi?.liveTvMediasStateResponse([]))
      // favoriteChannels
      dispatch(actionsApi?.clearFavoriteChannels())
      dispatch(actionsApi?.clearFavoriteMovies())
      dispatch(actionsApi?.clearRecentlyWatchChannelsList())
      dispatch(actionsApi?.clearRecentlyViewedMovies())
      dispatch(actionsApi?.clearFavoriteSeries())
      dispatch(actionsApi?.clearRecentlyViewedSeries())
    })
  }, [])

  return (

    <View 
      style={{
        flex:1,
        backgroundColor:'black', 
        justifyContent: 'space-between',
        paddingVertical: 20
      }}
    >
      <TopBar/>
      <MainOptions/>
      <EndButtons/>
    </View>
  )
}

export {Screen11}