import React from 'react'
import { Text } from 'react-native'

import ScreenWrapper from '../components/ScreenWrapper'

export default function CommunityScreen({ navigation }) {
  return (
    <ScreenWrapper>
      <Text onPress={() => navigation.navigate('CommunityPost')}>
        CommunityScreen
      </Text>
    </ScreenWrapper>
  )
}
