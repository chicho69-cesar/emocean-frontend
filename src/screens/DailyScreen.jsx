import { Heading } from 'native-base'
import React, { useState } from 'react'
import { StyleSheet, TextInput } from 'react-native'

import ActionButton from '../components/ActionButton'
import FeelingList from '../components/FeelingsList'
import ScreenWrapper from '../components/ScreenWrapper'
import colors from '../theme/colors'
import { feelings } from '../utils/getFeelings'

export default function DailyScreen() {
  const [feel, setFeel] = useState('')

  const onHandleContinue = () => {
    console.log('continue')
  }

  return (
    <ScreenWrapper>
      <Heading w="100%" textAlign="center" fontSize="lg" color="black" mt={2}>
        ¿Como te sientes hoy?
      </Heading>

      <FeelingList feelings={feelings} />

      <Heading w="100%" textAlign="center" fontSize="lg" color="black" mt={4}>
        Escribe tu estado de animo
      </Heading>

      <TextInput
        style={styles.input}
        editable
        multiline
        numberOfLines={9}
        placeholder="Escribe tu estado de animo aquí"
        autoCapitalize="none"
        keyboardType="default"
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
