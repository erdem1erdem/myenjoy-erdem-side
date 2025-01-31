import { View, TouchableHighlight, Text, StyleSheet } from "react-native"
import { BackNavigation } from "../BackNavigation"
import { myStyle } from "../../../data"
import { useRef, useState } from "react"
import { PinModal } from "../../Helpers"
import { useDispatch, useSelector } from "react-redux"
import { apiCalls } from "../../../shared/apiCalls"
import { actionsApi } from "../../../shared"
import { showMessage } from 'react-native-flash-message'
import { useTranslation } from "react-i18next"

const LeftSide= ({setCurrentSetting, focused, setfocused})=>{
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const [visiblePinModal, setVisiblePinModal]= useState(false)
  const {macAddress} = useSelector((state) => state?.portals)
  const pinre = useRef(null)
    const data = [
        {
          title: t('video_player_settings')
        },
        {
          title: t('change_pin')
        },
        {
          title: t('user_information')
        },
        {
          title: t('language_selection')
        },
        {
          title: t('reset_all_changes')
        }
    ]

    const handlePress=(index)=>{
      setCurrentSetting(index)
      if (index===4){
        setVisiblePinModal(true)
      }
    }
    
    const resetSettings = async()=>{
      
     const body = {
      "pin":pinre.current,
      "macAddress":macAddress
     }

     const result  = await apiCalls?.other?.resetSettings({ ...body })
     dispatch(actionsApi?.getSettings(macAddress))
     showMessage({
      message: "Settings reset successfully",
      type: "success",
      style:{alignItems:'center'}
    })
    }


    return (
        <View style={{flex:1, justifyContent: 'space-between'}}>
            <View contentContainerStyle={{ flexGrow: 1 }} style={styles.leftcontainer}>
                {
                    data.map((dat, index) => (
                        <TouchableHighlight
                            hasTVPreferredFocus={index===0}
                            key={index}
                            onFocus={() => { setfocused(index) }}
                            onPress={() => handlePress(index)}
                        >
                            <View style={styles.itemContainer}>
                                <Text style={[styles.subheading, { color: index === focused ? myStyle?.colors?.primaryColor : 'white' }]}>
                                    {dat?.title}
                                </Text>
                            </View>
                        </TouchableHighlight>
                    ))
                }
            </View>
            <BackNavigation {...{focused, setfocused}}/>
            <PinModal
                visible={visiblePinModal} 
                onVerify= {()=>{resetSettings()}}
                onClose={()=>{setVisiblePinModal(false)}}
                title = {t('reset_all_changes')}
                setPin={pinre}
            />
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
      display: 'flex',
      flex: 1,
    },
    leftcontainer: {
      width: '100%',
      height: '90%',
      flex:1,
      gap: 15
    },
    itemContainer: {
      paddingLeft: 20
    },
    subheading: {
      color: 'white',
      fontWeight: '500',
      ...myStyle?.primaryFontSize
    }
})
export {LeftSide}