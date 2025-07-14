import { useNavigation } from '@react-navigation/native'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import { getTextCompleteDate, getTextDate } from '../utils/getTextDate'

export default function ColumnDaily({ writes }) {
  const navigation = useNavigation()

  return (
    <View style={styles.container}>
      {writes.map((write) => (
        <TouchableOpacity
          style={[{ backgroundColor: write.color }, styles.write]}
          key={write.id}
          onPress={() =>
            navigation.navigate('Write', {
              ...write,
              date: getTextCompleteDate(write.date)
            })
          }
        >
          <Text style={styles.date}>
            {getTextDate(write.date)}
          </Text>

          <Text style={styles.text} numberOfLines={8}>
            {write.description}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '50%',
    padding: 6,
  },
  write: {
    marginBottom: 20,
    padding: 10,
    borderRadius: 10,
    elevation: 1,
  },
  date: {
    fontSize: 10,
    color: '#101010',
    fontWeight: 'bold',
  },
  text: {
    fontSize: 16,
    color: '#202020',
  },
})
