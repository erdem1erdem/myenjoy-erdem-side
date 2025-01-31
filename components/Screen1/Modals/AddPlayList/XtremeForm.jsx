import { t } from 'i18next'
import { MyInput } from '../../../Form'
import { useTranslation } from 'react-i18next';

const XtremeForm = ({ formData, handleChange }) => {
 const { t } = useTranslation();
  
  return (
      <>
        <MyInput
            label= {t('title')}
            placeholder= {t('enter_title')}
            value={formData?.xstream?.name}
            onChangeText={(text) => handleChange('name', text, "xstream")}
        />
        <MyInput
          label= {t('username')}
          placeholder= {t('enter_username')}
          value={formData?.xstream?.userName}
          onChangeText={(text) => handleChange('userName', text, 'xstream')}
        />
        <MyInput
          label= {t('password')}
          placeholder= {t('enter_password')}
          value={formData?.xstream?.password}
          onChangeText={(text) => handleChange('password', text, 'xstream')}
        />
        <MyInput
          label= 'URL'
          placeholder= {t('enter_url')}
          value={formData?.xstream?.url}
          onChangeText={(text) => handleChange('url', text, 'xstream')}
        />
      </>
  )
}
export { XtremeForm }
