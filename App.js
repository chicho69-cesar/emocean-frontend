import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { RecoilRoot } from 'recoil'

import Main from './src/Main'

export default function App() {
  return (
    <RecoilRoot>
      <StatusBar style="auto" />
      <Main />
    </RecoilRoot>
  )
}
