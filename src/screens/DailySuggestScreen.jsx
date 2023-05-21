import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'

import ActionButton from '../components/ActionButton'
import ScreenWrapper from '../components/ScreenWrapper'
import Title from '../components/Title'
import colors from '../theme/colors'

export default function DailySuggestScreen({ navigation }) {
  const [suggests, setSuggests] = useState('')

  useEffect(() => {
    setSuggests('')
  }, [])

  const onHandleContinue = () => {
    navigation.navigate('HomeStack')
  }

  return (
    <ScreenWrapper>
      <Title text="Algunas sugerencias" mt={2} />

      <View style={styles.textContainer}>
        <Text>{suggests}</Text>
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
  }
})
