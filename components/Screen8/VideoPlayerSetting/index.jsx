
import React, { useCallback, useState } from 'react'
import { ScrollView, StyleSheet, Text, TouchableHighlight, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { actionsApi } from '../../../shared'
import { useFocusEffect } from '@react-navigation/core'
import { RadioButton } from 'react-native-paper'
import { myStyle } from '../../../data'
import { apiCalls } from '../../../shared/apiCalls'
import { t } from 'i18next'

const  VideoPlayerSetting = () => {
  const dispatch = useDispatch()
  const {settings} = useSelector((state) => state?.other)
  const {macAddress} = useSelector((state) => state?.portals)
  
  const initialCheckedButtons = [
    settings?.movie == "1" ? 1 : settings?.movie == "0" ? 0 : 0,
    settings?.series == "2" ? 2 : settings?.series == "1" ? 1 : settings?.series == "0" ? 0:  0,
    settings?.timeFormat == "1" ? 1 : settings?.timeFormat == "0" ? 0 : 0,
    settings?.eye == "1" ? 1 : settings?.eye == "0" ? 0 : 0,
    null,
  ]
  const [checkedbuttons, setcheckedbuttons] = useState(initialCheckedButtons)
  const [focusedOption, setFocusedOption] = useState({ itemIndex: null, optionIndex: null })
  const data = [
    {
      title: t('end_of_movie'),
      options: [t('replay'), t('back_to_page')]
    },
    {
      title: t('end_of_series'),
      options: [t('replay'), t('move_to_next_episode'), t('back_to_page')]
    },
    {
      title: t('time_format'),
      options: [t('12_hours_system'), t('24_hours_system')]
    },
    {
      title: t('eye_function'),
      options: [t('enable'), t('disable')]
    }
  ]

  useFocusEffect(
    useCallback(() => {
        dispatch(actionsApi?.getSettings(macAddress))
    }, [])
  )

  const handlePress = async(index, radioButtonIndex) => {
    if (!Array.isArray(checkedbuttons)) return;
    const temp = [...checkedbuttons]
    temp[index] = radioButtonIndex
    setcheckedbuttons(temp)
    const payload = {
      macAddress,
      movie: temp[0] !== null ? String(temp[0]) : null,
      series: temp[1] !== null ? String(temp[1]) : null,
      timeFormat: temp[2] !== null ? String(temp[2]) : null,
      eye: temp[3] !== null ? String(temp[3]) : null,
      // serialNo: temp[1] !== null ? String(temp[1]) : null,
    }
   
    const res = await apiCalls?.other.saveSettings({...payload})
    
    dispatch(actionsApi?.getSettings(macAddress))
  }
  

  return (
    <ScrollView style={styles.container}>
      <View style={styles.container}>
        {
          data.map((item, index) => (
            <View key={index}>
              <Text style={styles.text}>{item.title}</Text>
              <View style={styles.radioGroup}>
                {
                  item.options.map((option, optionIndex) => (
                    <TouchableHighlight
                      key={'radio-'+optionIndex}
                      underlayColor="transparent"
                      onFocus={() => setFocusedOption({ itemIndex: index, optionIndex })}
                      onPress={() => handlePress(index, optionIndex)}
                    >
                      <View style={styles.radioButton}>
                        <RadioButton
                          value={checkedbuttons[index] === optionIndex}
                          status={checkedbuttons[index] === optionIndex ? 'checked' : 'unchecked'}
                          onPress={() => handlePress(index, optionIndex)}
                          color={focusedOption.itemIndex === index && focusedOption.optionIndex === optionIndex ? '#F83605' : 'white' }
                        />
                        <Text style={[styles.label, { color: focusedOption.itemIndex === index && focusedOption.optionIndex === optionIndex ? '#F83605' : 'white' }]}>
                          {option}
                        </Text>
                      </View>
                    </TouchableHighlight>
                  ))
                }
              </View>
            </View>
          ))
        }
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 20
  },
  text: {
    color: '#FFFFFF',
    ...myStyle?.primaryFontSize,
    fontWeight: '500',
  },
  radioGroup: {
    flexDirection: 'column',
    marginTop: 10,
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    color: 'white',
    fontWeight: '400',
    fontSize: 13,
  }
})

export { VideoPlayerSetting }
