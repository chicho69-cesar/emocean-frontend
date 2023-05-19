import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'

import ChatBotScreen from '../screens/ChatBotScreen'
import CreditCardScreen from '../screens/CreditCardScreen'
import HomeScreen from '../screens/HomeScreen'
import SignInScreen from '../screens/SignInScreen'
import SignUpScreen from '../screens/SignUpScreen'

const Stack = createStackNavigator()

function ChatStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="CreditCard"
        component={CreditCardScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SignIn"
        component={SignInScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="SignUp"
        component={SignUpScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen name="Home" component={HomeScreen} />

      <Stack.Screen name="ChatBot" component={ChatBotScreen} />
    </Stack.Navigator>
  )
}

function RootNavigator() {
  return (
    <NavigationContainer>
      <ChatStack />
    </NavigationContainer>
  )
}

export default function Router() {
  return <RootNavigator />
}
