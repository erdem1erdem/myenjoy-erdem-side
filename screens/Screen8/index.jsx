import React, { useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Icon } from 'react-native-elements'
import { myStyle } from '../../data'
import { LeftSide, RightSide } from '../../components/Screen8'
import { useTranslation } from 'react-i18next'

const Screen8 = () => {
  const { t } = useTranslation()
  const [currentSetting, setCurrentSetting]= useState(0)
  const [focused, setfocused]= useState(0)
  return (
    <View style={{flex:1,backgroundColor:'black'}}>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.btun}>
            <Icon 
              name='settings-outline' 
              type="ionicon" 
              size={40} 
              color="white" 
            />
          </View>
          <Text style={styles.headingText}>{t('settings')}</Text>
        </View>
        <View style={styles.bottomcontainer}>
          <View style={styles.leftview}>
            <LeftSide {...{setCurrentSetting, focused, setfocused}}/>
          </View>
          <View style={styles.rightview}>
            <RightSide {...{currentSetting}}/>
          </View>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 20,
    padding: 20
  },
  header: {
    alignItems: 'center'
  },
  btun: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 55,
    height: 55,
    backgroundColor: myStyle?.colors?.primaryColor,
    borderRadius: 55/2
  },
  headingText: {
    ...myStyle?.primaryFontSize,
    color: 'white',
    fontWeight: '500',
    paddingTop: 5,
  },
  bottomcontainer: {
    flexDirection: 'row',
    flex: 1,
    gap: 20
  },
  leftview: {
    flex: 1,
    height: '100%',
    borderRightWidth: 0.4,
    borderColor: 'white',
  },
  rightview: {
    width: '72%',
    height: '100%',
  }
})


export {Screen8};