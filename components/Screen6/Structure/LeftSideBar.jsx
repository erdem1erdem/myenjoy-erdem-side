import { useState } from "react"
import { View, TouchableHighlight, FlatList, Text, StyleSheet, useTVEventHandler} from "react-native"
import { Icon } from "react-native-elements"

const LeftSideBar= ({selectedItem, setSelectedItem})=>{

    const [index, setIndex] = useState(null)
    const data = [
        {
            iconname: 'menu',
            title: 'Category',
            index: 1
        },
        {
            iconname: 'search-outline',
            title: 'Search',
            index: 2
        },
        {
            iconname: 'heart-outline',
            title: 'Favorite',
            index: 3
        },
        {
            iconname: 'play-skip-forward-outline',
            title: 'Continue Watching',
            index: 4
        },
        {
            iconname: 'create-outline',
            title: 'Edit Category',
            index: 5
        }
    ]
    return (
        <View style={styles.leftview}>
            <View style={styles?.leftViewInnner}>
                <FlatList
                    data={data}
                    renderItem={({ item: dat, index: d }) => (
                        <View key={d} style={styles.innerview1}>
                            <TouchableHighlight
                                hasTVPreferredFocus={d===0}
                                onPress={() => {setIndex(d); setSelectedItem(dat?.index)}}
                                onFocus={() => {setIndex(d)}}
                                underlayColor='#F83605'
                                key={d}
                                style={[styles.touchablestyle, { backgroundColor: index === d ? '#F83605' : null }]}
                            >
                                <View style={{ alignItems: 'center' }}>
                                    <Icon name={dat.iconname} type="ionicon" size={25} color="white" />
                                </View>
                            </TouchableHighlight>
                            <Text style={[styles.text, { fontSize: 12, fontWeight: '600' }, index === d ? styles.flex : styles.dnone]}>
                                {dat.title}
                            </Text>
                        </View>
                    )}
                    keyExtractor={(_, d) => d.toString()}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    leftview: {
        backgroundColor: '#272727',
        width: 70,
        height: '100%'
    },
    leftViewInnner:{
        flex:1,
        alignItems:'center'
    },
    text: {
        fontSize: 11,
        color: '#fff',
        textAlign: 'center',
    },
    flex: {
        display: 'flex',
    },
    dnone: {
        display: 'none',
    },
    innerview1: {
        flex:1,
        alignItems: 'center',
        justifyContent: "center",
        width: 55,
        height: 70,
    },
    touchablestyle: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 40,
        height: 40,
        borderRadius: 40 / 2
    },
})
export {LeftSideBar}