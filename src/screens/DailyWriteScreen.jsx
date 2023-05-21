import React, { useState } from 'react'
import { StyleSheet, TextInput } from 'react-native'

import ActionButton from '../components/ActionButton'
import ScreenWrapper from '../components/ScreenWrapper'
import Title from '../components/Title'
import colors from '../theme/colors'

export default function DailyWriteScreen({ navigation }) {
  const [dailyText, setDailyText] = useState('')

  const onHandleSave = () => {
    navigation.navigate('Suggest')
  }

  return (
    <ScreenWrapper>
      <Title text="Escribe como te sientes" mt={2} />

      <TextInput
        style={styles.input}
        editable
        multiline
        numberOfLines={18}
        placeholder="El dia de hoy..."
        autoCapitalize="none"
        keyboardType="default"
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
