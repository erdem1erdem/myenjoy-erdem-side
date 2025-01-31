import { View } from 'react-native'
import { MyInput } from '../../../Form'
import { useTranslation } from 'react-i18next';
const M3uForm = ({  formData, handleChange}) => {
        const { t } = useTranslation();
    return (
        <View>
            <MyInput
                label=  {t('title')}
                placeholder= {t('enter_title')}
                value={formData?.m3u?.name}
                onChangeText={(text) => handleChange('name', text, "m3u")}
            />
            <MyInput
                label= 'URL'
                placeholder= {t('enter_url')}
                value={formData?.m3u?.url}
                onChangeText={(text) => handleChange('url', text, "m3u")}
            />
        </View>
    )
}
export { M3uForm }
