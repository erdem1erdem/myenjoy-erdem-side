import { View } from 'react-native'
import { MyInput } from '../../../Form'
import { t } from 'i18next'

const StalkerForm = ({  formData, handleChange}) => { 

    return (
        <View>
            <MyInput
                label= {t('title')}
                placeholder= {t('enter_title')}
                value={formData?.stalker?.name}
                onChangeText={(text) => handleChange('name', text, "stalker")}
            />
            <MyInput
                disabled
                label= {t('mac_address')}
                placeholder= 'enter mac address'
                value={formData?.stalker?.macAddress}
                onChangeText={(text) => handleChange('url', text, "macAddress")}
            />
            <MyInput
                label= 'URL'
                placeholder= {t('enter_url')}
                value={formData?.stalker?.url}
                onChangeText={(text) => handleChange('url', text, "stalker")}
            />
        </View>
    )
}
export { StalkerForm }
