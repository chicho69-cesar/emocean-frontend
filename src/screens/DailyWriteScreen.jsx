import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { Alert, StyleSheet, TextInput } from 'react-native'

import ActionButton from '../components/ActionButton'
import ScreenWrapper from '../components/ScreenWrapper'
import Title from '../components/Title'
import { auth, database } from '../config/firebase'
import { useSuggestState } from '../providers/suggestState'
import colors from '../theme/colors'
import getRandomColor from '../utils/getRandomColor'

export default function DailyWriteScreen({ navigation }) {
  const setSuggest = useSuggestState((state) => state.setSuggest)
  const setWrite = useSuggestState((state) => state.setWrite)
  const [dailyText, setDailyText] = useState('')

  useEffect(() => {
    setSuggest(dailyText)
  }, [dailyText, setSuggest])

  const onHandleSave = () => {
    addDoc(collection(database, 'dailies'), {
      user: auth.currentUser.email,
      text: dailyText,
      color: getRandomColor(),
      createdAt: serverTimestamp()
    })
      .then((docRef) => {
        setWrite({
          id: docRef.id,
        })
      })
      .catch((error) => {
        console.error('Error adding document: ', error)
        Alert.alert('Error adding document: ', error)
      })

    navigation.navigate('Suggest')
  }

  return (
    <ScreenWrapper>
      <Title text='Escribe como te sientes' mt={4} />

      <TextInput
        style={styles.input}
        editable
        multiline
        numberOfLines={18}
        placeholder='El dia de hoy...'
        autoCapitalize='none'
        keyboardType='default'
        value={dailyText}
        onChangeText={(text) => setDailyText(text)}
      />

      <ActionButton onPress={onHandleSave}>Guardar</ActionButton>
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
