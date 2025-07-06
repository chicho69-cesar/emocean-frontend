import axios from 'axios'
import { useEffect, useState } from 'react'
import { Alert, StyleSheet, Text, View } from 'react-native'
import { useRecoilState } from 'recoil'

import ActionButton from '../components/ActionButton'
import ScreenWrapper from '../components/ScreenWrapper'
import Title from '../components/Title'
import { SERVER_LINK } from '../constants/server'
import { suggestState } from '../providers/suggestState'
import colors from '../theme/colors'

export default function SuggestScreen({ navigation }) {
  const [dailySuggests] = useRecoilState(suggestState)
  const [suggests, setSuggests] = useState('')

  useEffect(() => {
    const getSuggests = async () => {
      try {
        const response = await axios.post(`${SERVER_LINK}/api/daily`, {
          prompt: dailySuggests
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
  }, [dailySuggests])

  const onHandleContinue = () => {
    navigation.navigate('Home')
  }

  return (
    <ScreenWrapper>
      <Title text="Aquí tienes algunos consejos" mt={4} />

      <View style={styles.textContainer}>
        <Text style={styles.text}>{suggests}</Text>
      </View>

      <ActionButton onPress={onHandleContinue}>Continuar</ActionButton>
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
