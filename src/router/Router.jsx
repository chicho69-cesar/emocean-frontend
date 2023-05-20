import { FontAwesome } from '@expo/vector-icons'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import React, { createContext, useContext, useEffect, useState } from 'react'
import {
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native'

import { auth } from '../config/firebase'
import colors from '../theme/colors'

import ChatBotScreen from '../screens/ChatBotScreen'
import CreditCardScreen from '../screens/CreditCardScreen'
import HomeScreen from '../screens/HomeScreen'
import SignInScreen from '../screens/SignInScreen'
import SignUpScreen from '../screens/SignUpScreen'

const Stack = createStackNavigator()
const AuthenticatedUserContext = createContext({})

const AuthenticatedUserProvider = ({ children }) => {
  const [user, setUser] = useState(null)

  return (
    <AuthenticatedUserContext.Provider value={{ user, setUser }}>
      {children}
    </AuthenticatedUserContext.Provider>
  )
}

function AppStack() {
  const onSignOut = () => {
    signOut(auth).catch((error) => console.log(error))
  }

  return (
    <Stack.Navigator
      initialRouteName="CreditCard"
      screenOptions={{
        headerLeft: () => null,
        // eslint-disable-next-line react/no-unstable-nested-components
        headerRight: () => (
          <TouchableOpacity style={styles.margRight} onPress={onSignOut}>
            <FontAwesome
              name="sign-out"
              size={24}
              color={colors.gray}
              style={styles.margRight}
            />
          </TouchableOpacity>
        )
      }}
    >
      <Stack.Screen
        name="CreditCard"
        component={CreditCardScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="ChatBot" component={ChatBotScreen} />
    </Stack.Navigator>
  )
}

function AuthStack() {
  return (
    <Stack.Navigator
      initialRouteName="SignIn"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="SignIn" component={SignInScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
    </Stack.Navigator>
  )
}

function RootNavigator() {
  const { user, setUser } = useContext(AuthenticatedUserContext)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (authenticatedUser) => {
      authenticatedUser ? setUser(authenticatedUser) : setUser(null)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [user, setUser])

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator />
      </View>
    )
  }

  return (
    <NavigationContainer>
      {user ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  )
}

export default function Router() {
  return (
    <AuthenticatedUserProvider>
      <RootNavigator />
    </AuthenticatedUserProvider>
  )
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  margRight: {
    marginRight: 10
  }
})
