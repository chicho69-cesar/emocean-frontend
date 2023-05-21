import { useNavigation } from '@react-navigation/native'
import { VStack } from 'native-base'
import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'

import { getTextCompleteDate, getTextDate } from '../utils/getTextDate'

export default function ColumnDaily({ writes }) {
  const navigation = useNavigation()

  return (
    <VStack w="50%" p={2}>
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
          <Text style={styles.date}>{getTextDate(write.date)}</Text>
          <Text style={styles.text} numberOfLines={8}>
            {write.description}
          </Text>
        </TouchableOpacity>
      ))}
    </VStack>
  )
}

const styles = StyleSheet.create({
  write: {
    marginBottom: 20,
    padding: 10,
    borderRadius: 10,
    elevation: 1
  },
  date: {
    fontSize: 10,
    color: '#101010',
    fontWeight: 'bold'
  },
  text: {
    fontSize: 16,
    color: '#202020'
  }
})
