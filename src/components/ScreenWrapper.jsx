import { ScrollView } from 'native-base'
import { StyleSheet, View } from 'react-native'

export default function ScreenWrapper({ children }) {
  return (
    <View style={styles.container}>
      <ScrollView w="100%" h="100%" showsVerticalScrollIndicator={false}>
        {children}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: '#fff'
  }
})
