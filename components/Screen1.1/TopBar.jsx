import { useEffect, useState } from 'react'
import { View, Image, Text, StyleSheet, Dimensions } from 'react-native'
import { localToUtc } from '../../shared'

const TopBar = () => {

    const windowWidth = Dimensions.get('window').width
    return (
        <View style={styles.logoo}>
            <View style={[styles?.inner, { width: windowWidth * 0.93 }]}>
                <Image
                    source={require('../../assets/logo1.png')}
                    style={styles.logo}
                />
                <Text style={styles.date}>{localToUtc()}</Text>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    logo: {
        width: 160,
        height: 50
    },
    logoo: {
        display: 'flex',
        alignItems: 'center'
    },
    inner: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    date: {
        backgroundColor: '#F83605',
        width: 170,
        height: 40,
        paddingTop: 10,
        textAlign: 'center',
        color: 'white',
        fontWeight: '500',
        borderRadius: 4
    }
})
export { TopBar }