import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { useState } from 'react'
import { Alert, StyleSheet, TextInput } from 'react-native'

import ActionButton from '../components/ActionButton'
import ScreenWrapper from '../components/ScreenWrapper'
import Title from '../components/Title'
import { auth, database } from '../config/firebase'
import colors from '../theme/colors'

export default function CommunityPostScreen({ navigation }) {
  const [post, setPost] = useState('')

  const onHandleSave = () => {
    addDoc(collection(database, 'posts'), {
      user: auth.currentUser.email,
      text: post,
      createdAt: serverTimestamp()
    })
      .then((docRef) => {
        console.log('Document written with ID: ', docRef.id)
      })
      .catch((error) => {
        console.error('Error adding document: ', error)
        Alert.alert('Error adding document: ', error)
      })

    navigation.push('Community')
  }

  return (
    <ScreenWrapper>
      <Title text="Comenta algo con la comunidad" mt={4} />

      <TextInput
        style={styles.input}
        editable
        multiline
        numberOfLines={15}
        placeholder="Escribe algo..."
        autoCapitalize="none"
        keyboardType="default"
        value={post}
        onChangeText={(text) => setPost(text)}
      />

      <ActionButton onPress={onHandleSave}>Compartir</ActionButton>
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
