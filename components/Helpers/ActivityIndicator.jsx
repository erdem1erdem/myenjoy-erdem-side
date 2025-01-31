import {ActivityIndicator as Loader, StyleSheet, View} from 'react-native'

const ActivityIndicator = () => (
  <View style={styles.container}>
    <Loader size="large" color="#fff" />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
})

export {ActivityIndicator}
