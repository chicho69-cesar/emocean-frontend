import { StyleSheet, Text, View } from 'react-native'

export default function Title({ text, mt }) {
  return (
    <View style={{ width: '100%', marginTop: mt || 0 }}>
      <Text style={styles.title}>{text}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
    textAlign: 'center',
  },
})
