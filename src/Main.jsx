import { NativeBaseProvider } from 'native-base'
import React from 'react'

import Router from './router/Router'
import { theme } from './theme/theme'

export default function Main() {
  return (
    <NativeBaseProvider theme={theme}>
      <Router />
    </NativeBaseProvider>
  )
}
