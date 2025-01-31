import React, { useState, useRef, useEffect } from 'react';
import {View,TextInput,StyleSheet,TouchableHighlight} from 'react-native';
import { Icon } from 'react-native-elements'
import { useDispatch, useSelector } from 'react-redux';
import { actionsApi } from '../../../shared';
import { useTranslation } from 'react-i18next';

const SearchBar = ({ leftSideBarItem,text,setText,showSearchBar,setShowSearchBar}) => {
  const { t } = useTranslation()
  const dispatch= useDispatch()
  const {liveTvChannels} = useSelector((state) => state?.liveTv)
  const {movies} = useSelector((state) => state?.movies)
  const {series} = useSelector((state) => state?.series)
  const {methodType,currentMedia} = useSelector((state) => state?.portals)
  const inputRef = useRef(null)
  // const [text,setText] = useState('') 
  

  useEffect(()=>{
    setText('')
    setShowSearchBar(true)
  }, [])
  useEffect(()=>{
    if(showSearchBar && inputRef)
      inputRef.current.focus()
  }, [showSearchBar, inputRef])

  const handleFocus = ()=>{
    inputRef.current.focus()
  }
  const handleSearchSubmit = () => {
    if (text) {
      setShowSearchBar(false)
      if(currentMedia===1)
        dispatch(actionsApi?.getChannelsByCategory({liveTvChannels,leftSideBarItem,text}))
      else if(currentMedia===2)
        dispatch(actionsApi?.getMoviesByCategory({methodType, movies, moviesPageNo: 1,leftSideBarItem,text}))
      else
        dispatch(actionsApi?.getSeriesByCategory({methodType, series,leftSideBarItem, seriesPageNo: 1,text}))   
    }
  }

  return (
    <>
      {
        showSearchBar &&
        <View style={styles?.searchBarContainer}>
          <TouchableHighlight 
            underlayColor='orange' 
            style={styles.main}
            onFocus={handleFocus}
          >
            <View style={styles.animatedContainer}>
              <View style={{alignItems:'center'}}>
                <Icon
                  name={'search'}
                  type='ionicon'
                  size={23}
                  color="white"
                />
              </View>
              <TextInput
                ref={inputRef}
                placeholder={t('search')}
                placeholderTextColor="white"
                cursorColor={'white'}
                value={text}
                onChangeText={text => setText(text)}
                style={styles.input}
                onSubmitEditing={handleSearchSubmit}
                onTouchCancel={()=>console.log("cancel")}
              />
            </View>
          </TouchableHighlight>
        </View>
      }
    </>
  );
};

const styles = StyleSheet.create({
  searchBarContainer:{
    width: '100%',
    position: "absolute",
    right:0,
    left:10,
    top: 10,  
    zIndex: 99
  },
  main: {
    alignItems: 'center',
  },
  animatedContainer: {
    width: 320,
    height: 50,
    borderWidth: 1,
    borderColor: 'white',
    alignItems: 'center',
    flexDirection:'row',
    gap: 5,
    backgroundColor: '#3C3F45',
    paddingHorizontal: 10,
    borderRadius: 4
  },
  input: {
    color: 'white',
    fontSize: 20
  }
});

export { SearchBar };
