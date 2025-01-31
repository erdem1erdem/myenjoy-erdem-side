import { useNavigation } from '@react-navigation/core'
import React, { useState, useEffect, useCallback } from 'react'
import { SafeAreaView, View, StyleSheet, Text, FlatList, Dimensions, TouchableHighlight, Image, ImageBackground, ScrollView } from 'react-native'
const windowWidth = Dimensions.get('window').width
const thresholdWidth = 800
import {UIActivityIndicator} from 'react-native-indicators';
import { useDispatch, useSelector } from "react-redux"
import { actionsApi } from '../../../shared'

const SeriesCard = ({ index1,selectedCategoryID}) => {
  const series = useSelector((state) => state?.series.SeriesByCategoryData)
  const dispatch = useDispatch()
  const {pagination} = useSelector((state) => state?.series)
  const [product, setProduct] = useState(null)
  const navigation = useNavigation()
  const [numColumns, setNumColumns] = useState(windowWidth >= thresholdWidth ? 4 : 3)

  const renderListItem = ({ item, index }) => (
    <View style={{ paddingLeft: 8 }}>
      <TouchableHighlight
        onPress={() => onPressItem(item, index)}
        onFocus={() => setProduct(index)}
        style={styles.movie}
      >
        <View style={
          product === index ? [styles.imgview, styles.activepro] : [styles.imgview]
        }>
          <ImageBackground
            source={{ uri: item.cover }}
            style={[styles.imagestyle, product === index && styles.activepro]}
            blurRadius={product === index ? 1 : 0}
          >
            {product === index && <Text style={styles.title}>{item.name}</Text>}
            <Image source={require('../../../assets/icons/vis.png')} style={styles.imgg} />
          </ImageBackground>
        </View>
      </TouchableHighlight>
    </View>
  )

  const keyExtractor = useCallback((item, index) => index.toString(), [])

  const onPressItem = (item, index) => {
    setProduct(index)
    navigation.navigate('Screen7', { details: item })
  }
  const call=(pageNo=1, pageSize=6)=>{
    dispatch(actionsApi?.getSeriesByCategory({categoryId: selectedCategoryID, pageNo, pageSize}))
}

  return (
    <View style={[styles.parentview, { paddingBottom: index1 === 1 ? 55 : null, marginLeft: index1 === 1 ? -20 : null }]}>
      <ScrollView style={{ flexDirection: 'column' }}>
          <FlatList
            data={series}
            renderItem={renderListItem}
            keyExtractor={keyExtractor}
            horizontal={false}
            numColumns={numColumns}
          />
           <View style={styles.settingbut} >
            <TouchableHighlight
              underlayColor='#F83605'
              onPress={()=> call(pagination?.pageNo + 1)}
              style={[styles.btn]}
            >            
                <View style={{ alignItems: 'center', justifyContent: 'center', gap: 5 }}>
                  <Text style={styles.text}>Show more</Text>
                </View>
            </TouchableHighlight>
          </View>
          </ScrollView>
      
    </View>
  )
}

const styles = StyleSheet.create({

  parentview: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    height: '100%',

  },
  imgview: {
    width: 153,
    height: 231,
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
  movie: {
    paddingTop: 15,
  },
  settingbut: {
    marginLeft: 200,
    width: 200,
    alignItems: 'center',
  },
  btn: {
    backgroundColor: '#3C3F45',
    height: 60,
    borderRadius: 4,
    justifyContent: 'center',
    width: '65%',
  },
})


export { SeriesCard }