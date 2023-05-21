import { Entypo } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'

import ScreenWrapper from '../components/ScreenWrapper'
import colors from '../theme/colors'

export default function HomeScreen() {
  const navigation = useNavigation()

  return (
    <ScreenWrapper>
      <TouchableOpacity
        onPress={() => navigation.navigate('ChatBot')}
        style={styles.chatButton}
      >
        <Entypo name="chat" size={24} color={colors.lightGray} />
      </TouchableOpacity>
    </ScreenWrapper>
  )
}

const styles = StyleSheet.create({
  chatButton: {
    backgroundColor: colors.primary,
    height: 50,
    width: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.9,
    shadowRadius: 8,
    marginRight: 20,
    marginBottom: 20
  },
  headerLeft: {
    marginLeft: 15
  },
  headerRight: {
    marginRight: 15
  }
})
