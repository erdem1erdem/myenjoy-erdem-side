import { useCallback, useEffect, useState} from "react"
import { useSelector, useDispatch } from "react-redux"
import {View, StyleSheet, Dimensions, ScrollView} from "react-native"
import { UIActivityIndicator } from 'react-native-indicators'
import { useFocusEffect, useNavigation } from '@react-navigation/core'
import { actionsApi } from "../../../shared"
import { DeleteModal } from '../../Screen9'
import { myStyle } from "../../../data"
import { MyButton, MyButton2, PinModal } from "../../Helpers"
import { apiCalls } from "../../../shared/apiCalls"
import { showMessage } from 'react-native-flash-message';
import { useTranslation } from "react-i18next"

const SideBar= ()=>{
    const { t } = useTranslation();
    const dispatch= useDispatch()
    const navigation = useNavigation()
    const port = useSelector((state) => state?.portals)
    const windowHeight = Dimensions.get('window').height
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [visiblePinModal, setVisiblePinModal]= useState(false)
    const {macAddress} = useSelector((state) => state?.portals)
    const [itemID, setItemID] = useState(null)
    const [loading , setLoading] = useState(false)
    useFocusEffect(
        useCallback(() => {
            dispatch(actionsApi?.getSettings(macAddress))
        }, [])
      )

    const toggleDeleteModal = () => {
      
        setShowDeleteModal(!showDeleteModal)
    }

    const handlePress = (item)=>{
        dispatch(actionsApi?.savePortalId({...item}))
        navigation.navigate('Screen1.1')
    }

    const deletePortal = async() =>{
     setLoading(true)
     const result = await apiCalls?.portal?.deletePortal({itemID})
     setLoading(false)
     if(result === 1){
        toggleDeleteModal()
        showMessage({
            message:t('success'),
            type: "success",
            style:{alignItems:'center'}
          })
          dispatch(actionsApi?.getPortals({ macAddress}))
     }
    }
    return (
        <>
            <View style={[styles.leftView, {height: windowHeight - 50,}]}>
                <ScrollView style={{ height: windowHeight - 170}}>
                    <View style={[myStyle?.alignCenter, myStyle?.gap12, myStyle?.paddingVertical15]}>
                        {port.loading ?
                            (
                                <View style={{ marginTop: 190 }}>
                                    <UIActivityIndicator color='white' size={40} count={12} />
                                </View>
                            )
                            :
                            (                              
                                port?.data?.map((item, index) => (
                                    <View key={'portal-'+index}>
                                        <MyButton2
                                            hasTVPreferredFocus={index === 0}
                                            title={item?.name}
                                            onPress={() => {handlePress(item)}}
                                            onLongPress = {()=>{toggleDeleteModal();setItemID(item?.id)}}         
                                            icon= "list-outline"
                                            style={{width: 130}}
                                          
                                        />
                                    </View>
                                ))
                            )     
                        }
                    </View>
                </ScrollView>
                <View style={[styles.bottomview, myStyle?.flexCenter, {height: 60}]}>
                    <MyButton
                        title= {t('settings')}
                         onPress={()=> setVisiblePinModal(true)}        
                        icon= "settings-outline"
                        style={{width: 130}}
                    />
                </View>
            </View>
            {
                showDeleteModal && 
                <DeleteModal 
                    {...{showDeleteModal,toggleDeleteModal,deletePortal,loading,setLoading}}
                />
            }
            <PinModal
                visible={visiblePinModal} 
                onVerify= {()=>{navigation.navigate('Screen8')}}
                onClose={()=>{setVisiblePinModal(false)}}
                title = {t('go_to_settings')}
            />
        </>
    )
}

const styles = StyleSheet.create({
    leftView: {
        flex: 0.2,
        backgroundColor: '#1F1F1F',
        height: '100%'
    },
    bottomview: {
        borderTopColor: 'white',
        borderTopWidth: 0.7,
    },
})

export {SideBar}