import axios from 'axios'
import { useEffect, useState } from 'react'
import { Alert, StyleSheet, Text, View } from 'react-native'
import { useRecoilState } from 'recoil'

import ActionButton from '../components/ActionButton'
import ScreenWrapper from '../components/ScreenWrapper'
import Title from '../components/Title'
import { SERVER_LINK } from '../constants/server'
import { emotionState, feelState } from '../providers/dailyState'
import colors from '../theme/colors'

export default function DailySuggestScreen({ navigation }) {
  const [emotion] = useRecoilState(emotionState)
  const [feeling] = useRecoilState(feelState)

  const [suggests, setSuggests] = useState('')

  useEffect(() => {
    const getSuggests = async () => {
      try {
        const response = await axios.post(`${SERVER_LINK}/api/feeling`, {
          prompt: `Me siento con ${emotion}. ${feeling}. Dame algunos consejos por favor`
        })

        const responseMessage = response.data.message.content
        setSuggests(responseMessage)
      } catch (error) {
        console.error('Error on get suggestions: ', error)
        Alert.alert('Error on get suggestions: ', error)
        setSuggests('No he podido encontrar sugerencias para ti')
      }
    }

    getSuggests()
  }, [emotion, feeling])

  const onHandleContinue = () => {
    navigation.navigate('HomeStack')
  }

  return (
    <ScreenWrapper>
      <Title text="Algunas sugerencias" mt={4} />

      <View style={styles.textContainer}>
        <Text style={styles.text}>{suggests}</Text>
      </View>

      <ActionButton onPress={onHandleContinue}>Continuar a la app</ActionButton>
    </ScreenWrapper>
  )
}

const styles = StyleSheet.create({
  textContainer: {
    backgroundColor: colors.lightGray,
    marginVertical: 20,
    marginHorizontal: 20,
    fontSize: 16,
    borderWidth: 1,
    borderColor: colors.gray,
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 8
  },
  text: {
    fontSize: 16,
    color: '#303030'
  }
})
