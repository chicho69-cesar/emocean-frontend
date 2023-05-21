import React, { useEffect } from 'react'
import { Text } from 'react-native'

import ScreenWrapper from '../components/ScreenWrapper'

export default function WriteScreen({ navigation, route }) {
  useEffect(() => {
    console.log(route)
  }, [route])

  return (
    <ScreenWrapper>
      <Text onPress={() => navigation.navigate('CommunityPost')}>
        CommunityScreen
      </Text>
    </ScreenWrapper>
  )
}
