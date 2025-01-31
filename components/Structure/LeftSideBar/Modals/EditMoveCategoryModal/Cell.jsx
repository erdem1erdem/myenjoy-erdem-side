import { TouchableHighlight, View, StyleSheet, Text} from "react-native"
import CheckBox from "@react-native-community/checkbox"
import { myStyle } from "../../../../../data"
// import { CheckBox } from '@rneui/themed'
const Cell= ({index, state, handleItemPress, item})=>{
    
    return (
        <TouchableHighlight
            underlayColor= '#F83605'
            onPress={() => handleItemPress(item['group-title'] || item?.id || item?.category_id)}
            key={index}
            style={styles.itemContainer}
        >
            <View 
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    width: '100%'
                }}
            >
                <View style={styles?.itemContainerInner}>
                    <CheckBox
                        value={state.includes(item['group-title'] || item?.id || item?.category_id)}
                        onValueChange={() => handleItemPress(index)}
                        tintColors={{true: '#F83605' , false:'#fff'}}
                    />
                    <Text style={styles?.text2}>
                        {
                            item['group-title'] || item?.title || item.category_name
                        }
                    </Text>
                </View>
            </View>
        </TouchableHighlight>
    )
}
const styles = StyleSheet.create({
    text2: {
        fontSize: myStyle?.primaryFontSize?.fontSize,
        color: 'white',
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',

    },
    itemContainerInner:{
        flexDirection: 'row', 
        alignItems: 'center', 
        gap: 5,
        paddingVertical: 4,
       
    }
})
export {Cell}