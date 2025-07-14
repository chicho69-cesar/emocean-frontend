import axios from 'axios'
import { useEffect, useState } from 'react'
import { ActivityIndicator, Alert, StyleSheet, Text, View } from 'react-native'

import { doc, updateDoc } from 'firebase/firestore'
import ActionButton from '../components/ActionButton'
import ScreenWrapper from '../components/ScreenWrapper'
import Title from '../components/Title'
import { database } from '../config/firebase'
import { SERVER_LINK } from '../constants/server'
import { useSuggestState } from '../providers/suggestState'
import colors from '../theme/colors'

export default function SuggestScreen({ navigation }) {
  const dailySuggests = useSuggestState((state) => state.suggest)
  const write = useSuggestState((state) => state.write)

  const [suggests, setSuggests] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const getSuggests = async () => {
      try {
        setLoading(true)

        const response = await axios.post(`${SERVER_LINK}/api/daily`, {
          prompt: dailySuggests
        })

        const responseMessage = response.data.message.content

        if (write.id) {
          const docRef = doc(database, 'dailies', write.id)
          
          await updateDoc(docRef, {
            write: responseMessage
          })
        }

        setSuggests(responseMessage)
        setLoading(false)
      } catch (error) {
        console.error('Error on get suggestions: ', error)
        Alert.alert('Error on get suggestions: ', error)
        setSuggests('No he podido encontrar sugerencias para ti')
      }
    }

    getSuggests()
  }, [dailySuggests, write])

  const onHandleContinue = () => {
    navigation.navigate('Home')
  }

  return (
    <ScreenWrapper>
      <Title text='Aquí tienes algunos consejos' mt={4} />

      <View style={styles.textContainer}>
        {loading ? (
          <View style={{ alignItems: 'center', justifyContent: 'center', height: 60 }}>
            <ActivityIndicator size="large" color={colors.primary} />
          </View>
        ) : (
          <Text style={styles.text}>{suggests}</Text>
        )}
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
