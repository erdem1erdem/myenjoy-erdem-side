import { View, StyleSheet } from "react-native"
import { MyButton } from "../../../../Helpers"
import { useTranslation } from "react-i18next"

const Footer= ({loading, addHiddenCategories})=>{
    const { t } = useTranslation()
    return (
        <View style={styles.buttoncontainer}>
            <MyButton
                title= {t('save_hidden_categories')}
                loading={loading}
                onPress={addHiddenCategories}
                style={{width: 200}}
            />
        </View>
    )
}
const styles = StyleSheet.create({
    buttoncontainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "center",
        backgroundColor: '#1F1F1F',
        height:60
    }
})
export {Footer}