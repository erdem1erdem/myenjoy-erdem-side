import {Suspense, useEffect, useState, useRef} from 'react'
import { BackHandler, View } from 'react-native'
import { useDispatch, useSelector} from 'react-redux'
import { LeftSideBar, CategoriesList, RightMainSection, TvChannelsList, LiveTv, SearchBar} from '../../components/Structure'
import { actionsApi } from '../../shared'
import { Screen12 } from '../Screen1.2'
import { LogBox } from 'react-native'
import { useNavigation } from '@react-navigation/core'
LogBox.ignoreLogs(['Warning: ...'])
LogBox.ignoreAllLogs()

const Screen3 = ({route}) => {
  const navigation =useNavigation()
  const dispatch= useDispatch()
  const {currentMedia, portalid : portalID} = useSelector((state) => state?.portals)
  const { liveTvLoading } = useSelector(state => state?.liveTv)
  const { movieLoading } = useSelector(state => state?.movies)
  const { seriesLoading } = useSelector(state => state?.series)
  const [leftSideBarItem, setLeftSideBarItem]= useState(1)
  const [categoryID, setCategoryID] = useState(null)
  const [isSceen3, setIsScreen3]= useState(null)
  const currentList= useRef(null)
  const[text,setText] = useState('')
  const [showSearchBar, setShowSearchBar]= useState(false)

  useEffect(()=>{
    if(route?.name)
      setIsScreen3(route?.name==='Screen3')
  }, [route])
  useEffect(()=>{
    dispatch(actionsApi?.getLockedChannels({portalID}))
    return ()=>{ 
      
      dispatch(actionsApi?.setChannelIndex(null))
      dispatch(actionsApi?.setChannelUrl(null))
      dispatch(actionsApi?.moviesByCategoryClear())
      dispatch(actionsApi?.seriesByCategoryClear())
    }
  }, [])
  useEffect(() => {
    const backAction = () => {
    setTimeout(() => {
      navigation.goBack()
    }, 1500)
    return true
    }
    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction)
    return () => backHandler.remove()
  }, [navigation])

  return (
    <Suspense>
      {
        liveTvLoading || movieLoading || seriesLoading ?
        <Screen12/> :
        <View style={{flex:1, flexDirection:'row',backgroundColor:'#000', position: 'relative'}}>
          <LeftSideBar {...{currentMedia, setLeftSideBarItem, currentList}}/>
          <CategoriesList {...{leftSideBarItem, currentList}}/>
          {
            currentMedia===1 ? 
            <>
              <TvChannelsList {...{leftSideBarItem, currentList}}/>
              <LiveTv {...{leftSideBarItem, currentList}}/>
            </>
            :
            <RightMainSection {...{leftSideBarItem, categoryID, currentList,text,showSearchBar}}/>
          }
          {
            leftSideBarItem === 2 &&
              <SearchBar {...{ leftSideBarItem ,text,setText,showSearchBar, setShowSearchBar}} />
          }
        </View>
      }
    </Suspense>
  )
}
export {Screen3}

