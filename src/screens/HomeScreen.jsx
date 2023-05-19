import { Entypo, FontAwesome } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import React, { useEffect } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import colors from '../theme/colors'

export default function HomeScreen() {
  const navigation = useNavigation()

  useEffect(() => {
    navigation.setOptions({
      // eslint-disable-next-line react/no-unstable-nested-components
      headerLeft: () => (
        <FontAwesome
          name="search"
          size={24}
          color={colors.lightGray}
          style={styles.headerLeft}
        />
      ),
      // eslint-disable-next-line react/no-unstable-nested-components
      headerRight: () => (
        <FontAwesome
          name="sign-out"
          size={24}
          color={colors.lightGray}
          style={styles.headerRight}
        />
      )
    })
  }, [navigation])

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.navigate('ChatBot')}
        style={styles.chatButton}
      >
        <Entypo name="chat" size={24} color={colors.lightGray} />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    backgroundColor: '#fff'
  },
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
