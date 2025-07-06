import { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'

import ScreenWrapper from '../components/ScreenWrapper'
import Title from '../components/Title'
import { getTextCompleteDate } from '../utils/getTextDate'

export default function WriteScreen({ navigation, route }) {
  const [write, setWrite] = useState({
    color: '#FFF',
    date: getTextCompleteDate(new Date()),
    description: '',
    id: 1
  })

  useEffect(() => {
    console.log(route)
    setWrite({ ...route.params })
  }, [route])

  return (
    <ScreenWrapper>
      <Title text={write.date} mt={4} />

      <View style={[styles.textContainer, { backgroundColor: write.color }]}>
        <Text style={styles.text}>{write.description}</Text>
      </View>
    </ScreenWrapper>
  )
}

const styles = StyleSheet.create({
  textContainer: {
    marginVertical: 20,
    marginHorizontal: 20,
    elevation: 1,
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 8
  },
  text: {
    fontSize: 17,
    color: '#101010'
  }
})
