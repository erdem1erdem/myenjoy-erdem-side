import React, { useState } from 'react'
import { View } from 'react-native'
import { CategoriesList, LeftSideBar, RightMainSection } from '../../components/Structure'

const Screen6 = () => {
  const [leftSideBarItem, setLeftSideBarItem]= useState(1)
  const [categoryID, setCategoryID]= useState(null)
  
  return (
    <View style={{flex:1, flexDirection:'row'}}>
      <LeftSideBar {...{setLeftSideBarItem}}/>
      <CategoriesList {...{leftSideBarItem, setCategoryID}}/>
      <RightMainSection {...{leftSideBarItem, categoryID}}/>
    </View>
  )
}

export {Screen6}