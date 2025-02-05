import { View, Text, StyleSheet, Image, ScrollView, TouchableHighlight } from 'react-native'
import Checkbox from '@react-native-community/checkbox'
import { useState } from 'react'
import { Icon } from 'react-native-elements'

const EditCategoryModals = ({ toggleModal }) => {
    const [activeb, setActiveb] = useState(-1)
    const [activeheader, setActiveheader] = useState(-1)
    const [categ, setCateg] = useState([])
    const [items, setItems] = useState([
        'Netflix 2021 Films', 'Netflix 2021 Films', 'Netflix 2021 Films', 'Netflix 2021 Films', 'Netflix 2021 Films', 'Netflix 2021 Films', 'Netflix 2021 Films', '2015 films', '2015 films'
    ])
    const [hiddenItems, setHiddenItems] = useState([])

    const handleItemPress = (index) => {
        setActiveb(index)
        const copy = [...categ]
        if (copy.includes(index)) {
            copy.splice(copy.indexOf(index), 1)
        } else {
            copy.push(index)
        }
        setCateg(copy)
    }

    const handleRemove = () => {
        const updatedItems = items.filter((_, index) => !categ.includes(index))
        const removedItems = items.filter((_, index) => categ.includes(index))
        setItems(updatedItems)
        setHiddenItems([...hiddenItems, ...removedItems])
        setCateg([])
        setActiveb(-1)
    }

    const handleRestore = () => {
        setItems([...items, ...hiddenItems])
        setHiddenItems([])
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.btun}>
                    <Icon name='create-outline' type="ionicon" size={20} color="white" />
                </View>
                <Text style={styles.modalText}>Edit Category</Text>
            </View>
            <ScrollView >
                {items.map((item, index) => (
                    <TouchableHighlight
                        activeOpacity={1}
                        onFocus={() => setActiveb(index)}
                        onPress={() => handleItemPress(index)}
                        key={index}
                        style={[
                            styles.itemContainer,

                        ]}
                    >
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            width: '95%',
                            borderRadius: activeb === index ? 4 : null,
                            backgroundColor: activeb === index ? '#F83605' : 'transparent'
                        }}
                        >
                            <View style={{ width: 30 }}>
                                {activeb === index && <Image
                                    source={require('../../../assets/icons/move1.png')}
                                    style={styles.image2}
                                />
                                }
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <View>
                                    <Checkbox
                                        value={categ.includes(index)}
                                        onValueChange={() => handleItemPress(index)}
                                    />
                                </View>
                                <Text style={styles.text2}>{item}</Text>
                            </View>
                        </View>
                    </TouchableHighlight>
                ))}
            </ScrollView>
            <View style={styles.border}>
                <View style={{alignItems:'center'}}>
                <TouchableHighlight
                underlayColor='#F83605'
                    onPress={toggleModal}
                    onFocus={() => { setActiveheader(0) }}
                    onBlur={() => { setActiveheader(null) }}
                     style={[styles.touchablestyle,{backgroundColor:activeheader === 0 ?'#F83605':'#3C3F45'}]}
                >
                    <View style={{ alignItems: 'center'}} >
                    <View style={{alignItems:'center'}}>
                                <Icon name='move' type="ionicon" size={18} color="white" />
                            </View>
                       
                    </View>
                </TouchableHighlight>
                <Text style={{ fontSize: 12, color: 'white',fontWeight:'600' }}>
                            Move Category
                        </Text>
                </View>
               
                <View style={{alignItems:'center'}}>
                <TouchableHighlight
                underlayColor='#F83605'
                    onPress={handleRemove}
                    onFocus={() => { setActiveheader(1) }}
                    onBlur={() => { setActiveheader(null) }}
                     style={[styles.touchablestyle,{backgroundColor:activeheader === 1 ?'#F83605':'#3C3F45'}]}
                >
                    <View style={{ alignItems: 'center'}} >
                    <View style={{alignItems:'center'}}>
                                <Icon name='eye-off-outline' type="ionicon" size={18} color="white" />
                            </View>
                       
                    </View>
                </TouchableHighlight>
                <Text style={{ fontSize: 12, color: 'white',fontWeight:'600' }}>
                            Hide Category
                        </Text>
                </View>
                <View style={{alignItems:'center'}}>
                <TouchableHighlight
                underlayColor='#F83605'
                    onPress={handleRestore}
                    onFocus={() => { setActiveheader(2) }}
                    onBlur={() => { setActiveheader(null) }}
                     style={[styles.touchablestyle,{backgroundColor:activeheader === 2 ?'#F83605':'#3C3F45'}]}
                >
                    <View style={{ alignItems: 'center'}} >
                    <View style={{alignItems:'center'}}>
                                <Icon name='eye-outline' type="ionicon" size={18} color="white" />
                            </View>
                       
                    </View>
                </TouchableHighlight>
                <Text style={{ fontSize: 12, color: 'white',fontWeight:'600' }}>
                            Restore Category
                        </Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
    },
    header: {
        paddingBottom:10,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 17,
        borderBottomWidth: 0.3,
        borderBottomColor: 'white'
    },
    text: {
        fontSize: 15,
        color: 'white',
        marginBottom: 12
    },
    text2: {
        fontSize: 14,
        color: 'white',
        marginLeft: 10
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 10,
        marginTop: 5,
        width: '100%',
        height: 30
    },
    checkbox: {
        marginRight: 10,
    },
    image: {
        width: 40,
        height: 40,
    },
    image2: {
        marginLeft: 5,
        width: 20,
        height: 20,
    },
    border: {
        borderWidth: 0.6,
        borderTopColor: 'white',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        paddingTop: 10
    },
    title: {
        color: 'white',
        fontSize: 16,
        marginBottom: 10,
    },
    btun: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 35,
        height: 35,
        backgroundColor: '#F83605',
        borderRadius: 50
    },
modalText: {
        color: 'white',
        fontSize: 14,
        fontWeight: '600',
        paddingTop: 5,
    },
    touchablestyle: {
        alignItems: 'center',
            justifyContent:'center',
            width: 32,
            height:32,
            borderRadius:32/2,
           
      },

})

export { EditCategoryModals }