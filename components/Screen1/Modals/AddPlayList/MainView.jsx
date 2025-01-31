import React, { useRef, useEffect, useState } from "react"
import { ScrollView, View, StyleSheet, KeyboardAvoidingView,  } from "react-native"
import { XtremeForm } from "./XtremeForm"
import { M3uForm } from "./M3uForm"
import { StalkerForm } from "./StalkerForm"
import QRCode from 'react-native-qrcode-svg';
import { useSelector } from "react-redux"


const MainView = ({ selectedApi, formData, handleChange }) => {

    const {macAddress} = useSelector((state) => state?.portals)
    const [focusedElement, setFocusedElement] = useState(null)
    const xtremeRef = useRef(null)
    const stalkerRef = useRef(null)
    const m3uRef = useRef(null)

    const handleFocus = (e) => {
        setFocusedElement(e)
    }

    useEffect(() => {
        if (selectedApi === 'xstream' && xtremeRef.current) {
            xtremeRef.current.focus()
        } else if (selectedApi === 'stalker' && stalkerRef.current) {
            stalkerRef.current.focus()
        } else if (selectedApi === 'm3u' && m3uRef.current) {
            m3uRef.current.focus()
        }
    }, [selectedApi])

    return (
        <View style={{ height: 290 }}>
            <KeyboardAvoidingView>
                {selectedApi === 'stalker' && (
                    <ScrollView 
                        ref={stalkerRef} 
                        style={styles.container} 
                        focusable={true} 
                        onFocus={() => handleFocus('stalker')}
                    >
                        <StalkerForm 
                            formData={formData} 
                            handleChange={handleChange} 
                        />
                    </ScrollView>
                )}
                {selectedApi === 'xstream' && (
                    <ScrollView 
                        ref={xtremeRef} 
                        style={styles.container} 
                        focusable={true} 
                        onFocus={() => handleFocus('xstream')}
                    >
                        <XtremeForm 
                            formData={formData} 
                            handleChange={handleChange} 
                        />
                    </ScrollView>
                )}
                {selectedApi === 'm3u' && (
                    <ScrollView
                        ref={m3uRef} 
                        style={styles.container} 
                        focusable={true} 
                        onFocus={() => handleFocus('m3u')}
                    >
                        <M3uForm 
                            formData={formData}
                            handleChange={handleChange} 
                        />
                    </ScrollView>
                )}
                {
                    selectedApi === "qrCode" &&
                    <View style={styles?.center}>
                        <QRCode
                            value= {"add-portal.myenjoytv.net/addPortal/"+macAddress}
                            size={200}
                        />
                    </View>
                }
            </KeyboardAvoidingView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        marginVertical: 20
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100%'
    }
})

export { MainView }
