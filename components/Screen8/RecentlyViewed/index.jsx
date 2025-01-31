import React, { useState } from 'react'
import { Image, ScrollView, StyleSheet, Text, TouchableHighlight, View } from 'react-native'


const RecentlyViewed = () => {
    const [indexThird, setIndexThird] = useState(null)

    const data = [
        { code: '1023', img: require('../../../assets/star.png'), title: 'Star TV' },
        { code: '1023', img: require('../../../assets/ntv.png'), title: 'NTV' },
        { code: '1023', img: require('../../../assets/nickel.png'), title: 'Nickelodeon' },
        { code: '1023', img: require('../../../assets/seventv.png'), title: 'Vibrant Kanal TV' },
        { code: '1023', img: require('../../../assets/cnnturk.png'), title: 'CNN Turk' },
        { code: '1023', img: require('../../../assets/haberturk.png'), title: 'Haber Turk' },
    ]

    return (
        <View style={styles.container}>
            {
                data.map((item, i) => (
                    <TouchableHighlight
                        activeOpacity={1}
                        onFocus={() => setIndexThird(i)}
                        onBlur={() => setIndexThird(null)}
                        // onPress={() => handleChannel(item.code, item.title, item.img)}
                        key={i}
                    >
                        <View style={[styles.btn3, indexThird === i && styles.bgactive]}>
                            <Text style={[styles.text, { textAlign: 'left' }]}>{item.code}</Text>
                            <Image source={item.img} style={{ width: 30, height: 30 }} />
                            <Text style={[styles.text, { textAlign: 'left' }]}>{item.title}</Text>
                        </View>
                    </TouchableHighlight>
                ))

            }
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        gap: 10,
        marginLeft: 10
    },
    image: {
        width: 30,
        height: 30,
    },
    text: {
        fontSize: 14,
        color: '#fff',
        textAlign: 'center',

    },
    btn3: {
        alignItems:'center',
        width: '100%',
        paddingHorizontal: 10,
        flexDirection: 'row',
        gap: 10,


    },
    bgactive: {
        backgroundColor: '#F83605',
        borderRadius:4
    },
})

export { RecentlyViewed }
