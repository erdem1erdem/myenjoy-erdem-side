import { useState, useEffect} from "react"
import { View, Text, StyleSheet } from "react-native"
import { useSelector, useDispatch} from "react-redux"
import BasicInfo  from "./BasicInfo"
import { MyButton } from "../../Helpers"
import { SeasonModal } from "../Modals"
import { myStyle } from "../../../data"
import { actionsApi, helpers } from "../../../shared"
import { EpisodeModal } from "./EposideModal"
import { useNavigation } from "@react-navigation/core"
import { apiCalls } from "../../../shared/apiCalls"
import { t } from "i18next"

const RightSide= ({item})=>{
    
    const dispatch = useDispatch()
    const navigation= useNavigation()
    const {seriesDetail} = useSelector((state) => state?.series)
    const {movieDetail, movieMediasStateByCategory} = useSelector((state) => state?.movies)
    const {methodType, currentMedia, portalid: portalID} = useSelector((state) => state?.portals)
    const {moviesFavorite, seriesFavorite, isFavorite, media: Media } = useSelector((state) => state?.other)
    const {value: category}= useSelector(state => state?.category) 
    const [state, setState]= useState(null)
    const [showSeasonModal, setShowSeasonModal] = useState(false)
    const [showEpisodeModal, setShowEpisodeModal] = useState(false)
    const [selectedSeason,setSelectedSeason] = useState(1)
    const [seasons, setSeasons]= useState([])
    const [isResume, setIsResume]= useState(0)

    useEffect(() => {
        setState({
            ...state,
            name:  item['tvg-name'] || item?.name,
            plot: item?.plot,
            category: category?.name
        })
        dispatch(actionsApi?.setIsFavorite(item?.isFavorite))

        if(methodType==="3"){
            if(currentMedia===2)
                dispatch(actionsApi?.getMovieDetail({stream_id: item?.stream_id, portalID}))
            else if(currentMedia===3)
                dispatch(actionsApi?.getSeriesDetails({series_id: item?.series_id, methodType, portalID}))
        }
        else if(methodType==="1" && currentMedia===3){
            dispatch(actionsApi?.getSeriesDetails({seriesName: item['tvg-name'], methodType, portalID}))
        }
        return ()=>{
            dispatch(actionsApi?.movieDetailClear())
            dispatch(actionsApi?.seriesDetailClear())
        }
    }, [])

    useEffect(()=>{
        if(movieDetail?.info || seriesDetail?.info){
            let detail= movieDetail?.info || seriesDetail?.info
            setState({
                name:  item['tvg-name'] || item?.name,
                category: category?.name,
                plot: detail?.plot || item?.plot,
                rating: detail?.rating_5based,
                releaseDate: detail?.releasedate || detail?.releaseDate
            })
        }
    }, [movieDetail, seriesDetail])

    useEffect(()=>{
        if(methodType==="1" && seriesDetail?.length){
           setSeasons(helpers?.transformEpisodes(seriesDetail))
        }
        else if(methodType==="3" && seriesDetail?.episodes){
            let episodes= {...seriesDetail?.episodes}
            let tempArr=[]
            for (const property in episodes) 
                tempArr.push({season: property, episodes: episodes[property]})
            setSeasons([...tempArr])
        }
        else
            setSeasons([])
    }, [seriesDetail])
    useEffect(()=>{
        if(Media && movieMediasStateByCategory?.length){
            let find= movieMediasStateByCategory?.find(media=> media?.mediaID==Media?.id)
            if(find)
                setIsResume(find?.duration)
            else
                setIsResume(0)
        }
    }, [movieMediasStateByCategory, Media])
    useEffect(()=>{
        dispatch(actionsApi?.seriesUrlClear())
        dispatch(actionsApi?.movieUrlClear())
    },[])

    const toggleSeasonModal = () => {
        setShowSeasonModal(!showSeasonModal)
    }
    const toggleEpisodeModal = () => {
        setShowEpisodeModal(!showEpisodeModal)
    }
    const addToFavorite= async ()=>{
        let payload= {
            category: category?.id,
            mediaType: currentMedia, 
            portalID,
            mediaID: methodType==="1" ? item['tvg-name'] : (item?.stream_id || item?.series_id)
        }
        let index=-1
        let data=[]
        if(currentMedia===2){
            index = moviesFavorite.findIndex(movie=> movie?.mediaID===payload?.mediaID)
            data= [...moviesFavorite]
        }
        else{
            index = seriesFavorite.findIndex(season=> season?.mediaID===payload?.mediaID)
            data= [...seriesFavorite]
        }
        if (index > -1)
            data.splice(index, 1)   
        else
            data=[...data, payload]
        dispatch(actionsApi?.setIsFavorite(!isFavorite))
        apiCalls?.other?.addToFavorite(payload)
        dispatch(actionsApi?.favoritesResponse({data, mediaType: currentMedia}))
    }
    
    const handlePress = (contineWatch)=>{
        if(currentMedia===2){
            let payload={
                name: state?.name,
                stream_id: item?.stream_id || null,
                extension: item?.container_extension || null,
                mediaID: methodType==="1" ? item['tvg-name'] : (item?.stream_id || item?.series_id),
                url: item?.url || null,
                contineWatch: contineWatch ? isResume : 0,
                cover: item['tvg-logo'] || item?.screenshot_uri || item?.stream_icon || item?.cover
            }
            // navigation.navigate('Screen5', media= payload)
            navigation.navigate('Screen13',media= payload)
        }
        else
            toggleEpisodeModal()
    }


    return (
        <>
            <View style={styles.rightdetails}>
                <Text numberOfLines={1} style={styles.title}>{state?.name}</Text>
                {
                    state?.plot &&
                    <Text numberOfLines={7} style={styles.text1}>{state?.plot}</Text>
                }
                <BasicInfo {...{state}} seasons={seasons?.length}/>
                <View style={styles.btnview}>
                    {
                        currentMedia===3 &&
                        <>
                            <View>
                                <MyButton
                                    hasTVPreferredFocus
                                    title= {t('seasons')}
                                    isCircular
                                    icon="film-outline"
                                    onPress={toggleEpisodeModal}
                                    buttonCoverStyle={{width: 55}}
                                />
                            </View>
                            <View>
                                <MyButton
                                    title= {t('episode')} 
                                    isCircular
                                    icon="albums-outline"
                                    onPress={toggleEpisodeModal}
                                    buttonCoverStyle={{width: 55}}
                                />
                            </View>
                        </> 
                    }
                    <View>
                        <MyButton
                            hasTVPreferredFocus={currentMedia===2}
                            title= {t('favorite')}
                            isCircular
                            icon="heart"
                            onPress={addToFavorite}
                            buttonCoverStyle={{width: 55}}
                            buttonStyle={isFavorite && {backgroundColor: myStyle.colors?.primaryColor}}
                        />
                    </View>
                    <MyButton
                        title= {t('watch_now')}
                        onPress={()=> handlePress(false)}
                        icon= 'play'
                        style={{width: 130}}
                    />
                    {
                        (isResume>0 || currentMedia===3) &&
                        <MyButton
                            title= {t('resume')}
                            onPress={()=> handlePress(true)}
                            icon= 'play-skip-forward'
                            style={{width: 120}}
                        />
                    }
                </View>
            </View>
            {
                currentMedia===3 && 
                <>
                    <SeasonModal 
                        visible={showSeasonModal} 
                        totalSeasons={seriesDetail?.seasons?.length} 
                        onClose={toggleSeasonModal} 
                        {...{setSelectedSeason,selectedSeason}}
                    />
                    <EpisodeModal 
                        visible={showEpisodeModal} 
                        onClose={toggleEpisodeModal} 
                        seasons={seasons}
                    />
                </>
            }
        </>
    )
}

const styles = StyleSheet.create({
    rightdetails: {
        height: '100%',
        width: '60%',
        paddingHorizontal: 30,
        justifyContent: 'center'
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#fff',
    },
    text1: {
        fontSize: 14,
        color: '#fff',
        fontWeight: '400',
        marginTop: 8
    },
    detail: {
        flexDirection: 'row',
        gap: 40,
        marginTop: 25,
    },
    btnview: {
        flexDirection: 'row',
        alignItems: 'center',
        gap:12,
        height: 90,
        marginTop: 20,
    }
})
export {RightSide}
