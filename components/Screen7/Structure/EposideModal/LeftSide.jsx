import { View, StyleSheet, ScrollView, Dimensions} from "react-native"
import { Season } from "./Season"
import { Eposide } from "./Eposide"
import { useEffect, useState } from "react"

const LeftSide= ({seasons, visible, onClose})=>{
    const [currentSeason, setCurrentSeason]= useState(0)
    const windowHeight = Dimensions.get('window').height
    useEffect(()=>{
        if(visible && seasons?.length)
            setCurrentSeason(0)
        else
            setCurrentSeason(null)
    }, [])
    return (
        <View style={[styles?.container, {maxHeight: windowHeight*0.70}]}>
            <ScrollView horizontal contentContainerStyle={styles?.leftSide}>
                {
                    seasons?.map((season, index)=>(
                        <View key={'season-no-'+index}>
                            <Season {...{seasonNumber: season?.season, index, currentSeason, setCurrentSeason}}/>
                        </View>
                    ))
                }
            </ScrollView>
            <ScrollView>
                {
                    currentSeason!==null ?
                    seasons[currentSeason]?.episodes?.map((episode, index)=>(
                        <Eposide {...{episode, index, onClose}}/>
                    ))
                    :<></>
                }
            </ScrollView>
        </View>
    )
}
const styles = StyleSheet.create({
    container:{
        gap: 10
    },
    leftSide:{
        borderWidth:1,
        borderColor: '#fff',
        display:'flex',
        flexDirection: 'row',
        gap: 10,
        paddingBottom: 10,
        overflow: 'scroll'
    },
    textLight:{
        color: "#9A9A9A"
    },
    textWhite:{
       color: "#fff",
       fontWeight: '500',
       fontSize: 16,
       paddingBottom: 8
    },
    season:{
        display: 'flex',
        alignItems: 'center'
    }
})
export {LeftSide}