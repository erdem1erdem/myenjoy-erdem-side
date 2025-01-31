import {StyleSheet, View} from 'react-native';
import {MyButton} from '../../../Helpers';
import { useTranslation } from 'react-i18next';

const TopSection = (
  
  {toggleModal, setSelectedApi, currentMethod, setCurrentMethod},
  ref,
) => {
  const {t} = useTranslation();
  return (
    <>
      <View style={styles.radioContainer}>
        <MyButton
          isRadio
          name="Stalker"
          onPress={() => {
            setSelectedApi('stalker');
            setCurrentMethod(1);
          }}
          currentMethod={currentMethod}
          index={1}
        />
        <MyButton
          isRadio
          name="Xtream Code API"
          onPress={() => {
            setSelectedApi('xstream');
            setCurrentMethod(2);
          }}
          currentMethod={currentMethod}
          index={2}
        />
        <MyButton
          isRadio
          name="M3U"
          onPress={() => {
            toggleModal();
            setSelectedApi('m3u');
            setCurrentMethod(3);
          }}
          currentMethod={currentMethod}
          index={3}
        />
        <MyButton
          isRadio
          name={t('QR_code')}
          onPress={() => {
            setSelectedApi('qrCode');
            setCurrentMethod(4);
          }}
          currentMethod={currentMethod}
          index={4}
        />
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  radioContainer: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 20,
    paddingTop: 20,
    alignSelf: 'center',
  },
});
export {TopSection};
