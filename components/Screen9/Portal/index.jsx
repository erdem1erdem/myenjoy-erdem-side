import React, { useState } from 'react'
import { Image, ScrollView, StyleSheet, Text, TouchableHighlight, View } from 'react-native'
import { DeleteModal } from '..'

const Portal = () => {
    const [acthead, setacthead] = useState(null)
    const [actbutton, setactbutton] = useState(null)
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [name, setName] = useState('')
    const [data, setData] = useState([
        {
            name: 'Portal Deniz',
            address: 'https//:dhfkhfhslfhlshdflh',
            status: '01/01/2024 08:25'
        },
        {
            name: 'Portal Hayat',
            address: 'https//:dhfkhfhslfhlshdflh',
            status: '01/01/2024 08:25'
        },
        {
            name: 'Portal Farhan',
            address: 'https//:dhfkhfhslfhlshdflh',
            status: '01/01/2024 08:25'
        },
        {
            name: 'Portal Haider',
            address: 'https//:dhfkhfhslfhlshdflh',
            status: '01/01/2024 08:25'
        },
        {
            name: 'Portal Asad',
            address: 'https//:dhfkhfhslfhlshdflh',
            status: '01/01/2024 08:25'
        }
    ])

    const toggleDeleteModal = (itemName) => {
        setName(itemName)
        setShowDeleteModal(!showDeleteModal)
    }

    const onDeletePortal = (portalName) => {
        const updatedData = data.filter((item) => item.name !== portalName)
        setData(updatedData)
    }
    const converter = (address) => {
        const parts = address.split('//')
        const protocol = parts[0]
        const rest = parts[1]
        const masked = rest.replace(/./g, '*')
        return `${protocol}//${masked}`
    }

    return (
        <View style={styles.container}>
            <View style={styles.imgview}>
                <Image
                    source={require('../../../assets/icons/portal.png')}
                    style={styles.image}
                />
                <Text style={styles.text}>Please Select a Portal</Text>
            </View>

            <View style={styles.headingview}>
                <Text style={styles.heading}>Portal Name</Text>
                <Text style={styles.heading}>Portal Address</Text>
                <Text style={styles.heading}>Status</Text>
            </View>

             <ScrollView style={{height:200}}>
            {
                data?.map((dat, index) => (
                    <TouchableHighlight
                        key={index}
                        underlayColor='#79181B'
                        onFocus={() => setacthead(index)}
                        onBlur={() => setacthead(null)}
                        onPress={()=>toggleDeleteModal(dat.name)}
                    >
                        <View style={[styles.itemContainer, index === acthead && { backgroundColor: '#79181B' }]}>
                            <Text style={styles.subheading1}>{dat?.name}</Text>
                            <Text style={styles.subheading2}>{converter(dat?.address)}</Text>
                            <Text style={styles.subheading3}>{dat?.status}</Text>
                        </View>
                    </TouchableHighlight>
                ))
            }
            </ScrollView>
            <View style={styles.buttonview}>
                <TouchableHighlight
                    onFocus={() => setactbutton(1)}
                    onPress={() => { setactbutton(1) }}
                    onBlur={() => setactbutton(null)}
                    style={[styles.btn, { backgroundColor: actbutton === 1 ? '#FF1414' : '#3C3F45' }]}
                    underlayColor='#FF1414'
                >
                    <Text style={styles.text}>Refresh</Text>
                </TouchableHighlight>
                <TouchableHighlight
                    onFocus={() => setactbutton(2)}
                    onBlur={() => setactbutton(null)}
                    style={[styles.btn, { backgroundColor: actbutton === 2 ? '#FF1414' : '#3C3F45' }]}
                >
                    <Text style={styles.text}>Add Portal</Text>
                </TouchableHighlight>
            </View>
            <Text style={styles.lasttext}>^Long Press OK to delete a portal</Text>
           
            {showDeleteModal && (
                <DeleteModal visible={showDeleteModal} onClose={toggleDeleteModal} itemName={name} onDelete={onDeletePortal} />
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',   
        justifyContent:'space-evenly'
    },
    image: {
        width: 35,
        height: 35,
        marginBottom: 10
    },
    itemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        paddingVertical: 15,
        paddingLeft:44,
    },
    imgview: {
        alignItems: 'center',
        marginTop: 40,
        marginBottom: 50
    },
    headingview: {
        justifyContent: 'space-evenly',
        flexDirection: 'row',
        marginBottom: 30
    },
    heading: {
        color: 'white',
        fontWeight: '500',
        fontSize: 15,
    },
    subheading1: {
        color: 'white',
        fontWeight: '300',
        fontSize: 15,
    },
    subheading2: {
        color: 'white',
        fontWeight: '300',
        fontSize: 15,     
    },
    subheading3: {
        color: 'white',
        fontWeight: '300',
        fontSize: 15,
    },
    text: {
        color: 'white',
        fontSize: 14
    },
    btn: {
        paddingHorizontal: 25,
        paddingVertical: 7,
        borderRadius: 4,
    },
    buttonview: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: 25,
        gap: 15,
        width: '94%',
        paddingTop: 15,
        marginBottom: 20,
    },
    lasttext: {
        color: 'white',
        fontWeight: '300',
        marginLeft: 50
    }
})

export { Portal }
