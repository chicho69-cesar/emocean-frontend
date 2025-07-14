import { Pressable, StyleSheet, Text } from 'react-native'
import colors from '../theme/colors'

export default function ActionButton({ children, onPress }) {
  return (
    <Pressable style={styles.button} onPress={onPress}>
      <Text style={styles.textButton}>{children}</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
    marginHorizontal: 40
  },
  textButton: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold'
  }
})
