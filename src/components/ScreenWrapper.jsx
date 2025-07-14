// import Constants from 'expo-constants'
import { ScrollView, StyleSheet, View } from 'react-native'

export default function ScreenWrapper({ children }) {
  return (
    <View style={styles.container}>
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        {children}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 8,
    // marginTop: Constants.statusBarHeight,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: '#fff',
  },
  scroll: {
    width: '100%',
    height: '100%',
  },
})
