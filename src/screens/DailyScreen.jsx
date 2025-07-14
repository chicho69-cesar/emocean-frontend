import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { Alert, StyleSheet, TextInput } from 'react-native'

import ActionButton from '../components/ActionButton'
import FeelingList from '../components/FeelingsList'
import ScreenWrapper from '../components/ScreenWrapper'
import Title from '../components/Title'
import { auth, database } from '../config/firebase'
import { useEmotionState, useFeelState } from '../providers/dailyState'
import colors from '../theme/colors'
import { feelings } from '../utils/getFeelings'

export default function DailyScreen({ navigation }) {
  const emotion = useEmotionState((state) => state.emotion)
  const setFeeling = useFeelState((state) => state.setFeel)

  const [feel, setFeel] = useState('')

  useEffect(() => {
    setFeeling(feel)
  }, [setFeeling, feel])

  const onHandleContinue = () => {
    addDoc(collection(database, 'feelings'), {
      user: auth.currentUser.email,
      text: feel,
      feeling: emotion,
      createdAt: serverTimestamp()
    })
      .then((docRef) => {
        console.log('Document written with ID: ', docRef.id)
      })
      .catch((error) => {
        console.error('Error adding document: ', error)
        Alert.alert('Error adding document: ', error)
      })

    navigation.navigate('DailySuggest')
  }

  return (
    <ScreenWrapper>
      <Title text='¿Como te sientes hoy?' mt={4} />
      <FeelingList feelings={feelings} />
      <Title text='Escribe tu estado de animo' mt={4} />

      <TextInput
        style={styles.input}
        editable
        multiline
        numberOfLines={9}
        placeholder='Escribe tu estado de animo aquí'
        autoCapitalize='none'
        keyboardType='default'
        value={feel}
        onChangeText={(text) => setFeel(text)}
      />

      <ActionButton onPress={onHandleContinue}>Seguir</ActionButton>
    </ScreenWrapper>
  )
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: colors.lightGray,
    marginVertical: 20,
    marginHorizontal: 20,
    fontSize: 16,
    borderWidth: 1,
    borderColor: colors.gray,
    borderRadius: 10,
    padding: 12
  }
})
