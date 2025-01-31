import { useState, useEffect} from "react"
import { View, Dimensions, StyleSheet, FlatList} from "react-native"
import { useSelector, useDispatch } from "react-redux"
import { UIActivityIndicator } from 'react-native-indicators'
import { MyMessage, ShowMore } from "../../Helpers"
import { actionsApi } from "../../../shared"
import { Card } from "./Card"

const RightMainSection= ({selectedItem, categoryID})=>{

    const dispatch= useDispatch()
    const {SeriesByCategoryData, pagination, loading} = useSelector((state) => state?.series)
    const portID = useSelector((state) => state?.portals.portalid)
    const {methodType} = useSelector((state) => state?.portals)
    const windowWidth = Dimensions.get('window').width
    const [num, setNum] = useState(1)
    const [numColumns, setNumColumns] = useState(4)


    
    useEffect(() => {
        if (categoryID) {
          setNum(1)
          dispatch(actionsApi?.getSeriesByCategory({ categoryID, methodType, ...pagination, pageNo: 1, portID }))
        }
    }, [categoryID])
    const renderListItem = ({ item, index }) => (
        <>
            <Card {...{item, index, categoryID}}/>
            {
                (index === SeriesByCategoryData?.length - 1 && SeriesByCategoryData?.length % 4 === 0) ? 
               <View style={{marginTop:20}}>
                 <ShowMore 
                    loading={loading} 
                    onPress={() => call(pagination?.pageNo + 1)}
                />
               </View>
                : null
            }
        </>
    )
      const call = (pageNo = 1, pageSize = 8) => {
        setNum(2)
        dispatch(actionsApi?.getSeriesByCategory({ categoryID, pageNo, pageSize, portID }))
      }
      function generateUniqueIDs(count, length) {`1`
        let ids = new Set(); // Using a Set to ensure uniqueness
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const idsArray = [];
    
        while (ids.size < count) {
            let id = '';
            for (let i = 0; i < length; i++) {
                id += characters.charAt(Math.floor(Math.random() * characters.length));
            }
            if (!ids.has(id)) {
                ids.add(id);
                idsArray.push(id);
            }
        }
    
        return idsArray;
    }
    return (
        <View style={{
            width: selectedItem === 1 ? windowWidth-250 : windowWidth-70 , 
            height: '100%',
            }}
        >
            <View style={{ flex: 1, flexDirection: 'column', backgroundColor: '#000' }} >
                {
                    categoryID === null ?
                        <MyMessage title="Select any Category"/>
                    : 
                    loading && num === 1 && SeriesByCategoryData?.length ?
                        <View style={{ alignItems: 'center', marginTop: 260 }}>
                            <UIActivityIndicator
                                color='white'
                                size={60} count={12}
                            />
                        </View>
                    :
                        <View style={[styles.parentview, {flex: 1 }]}>
                            <FlatList
                                data={SeriesByCategoryData}
                                renderItem={renderListItem}
                                keyExtractor={() => generateUniqueIDs(10, 6)}
                                horizontal={false}
                                numColumns={numColumns}
                                columnWrapperStyle={{
                                    flex: 1,        
                                    flexWrap: 'wrap'
                                }}
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
})  
export {RightMainSection}