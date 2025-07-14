import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { createContext, useContext, useEffect, useState } from 'react'
import {
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native'

import { auth } from './config/firebase'
import { useHeaderState } from './providers/headerState'
import { useUserState } from './providers/userState'
import Screens from './screens/Screens'
import { getUser } from './services/getUser'
import colors from './theme/colors'

const Stack = createStackNavigator()
const Tab = createBottomTabNavigator()

const AuthenticatedUserContext = createContext({})

const AuthenticatedUserProvider = ({ children }) => {
  const [user, setUser] = useState(null)

  return (
    <AuthenticatedUserContext.Provider value={{ user, setUser }}>
      {children}
    </AuthenticatedUserContext.Provider>
  )
}

function AuthStack() {
  return (
    <Stack.Navigator
      initialRouteName='SignIn'
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name='SignIn' component={Screens.SignInScreen} />
      <Stack.Screen name='SignUp' component={Screens.SignUpScreen} />
    </Stack.Navigator>
  )
}

function ProfileStack() {
  return (
    <Stack.Navigator
      initialRouteName='Profile'
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name='Profile' component={Screens.ProfileScreen} />
      <Stack.Screen
        name='CreditCard'
        component={Screens.CreditCardScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  )
}

function CommunityStack() {
  return (
    <Stack.Navigator
      initialRouteName='Community'
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name='Community' component={Screens.CommunityScreen} />
      <Stack.Screen
        name='CommunityPost'
        component={Screens.CommunityPostScreen}
      />
    </Stack.Navigator>
  )
}

function DailyStack() {
  return (
    <Stack.Navigator
      initialRouteName='Daily'
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name='Daily' component={Screens.DailyScreen} />
      <Stack.Screen
        name='DailySuggest'
        component={Screens.DailySuggestScreen}
      />
    </Stack.Navigator>
  )
}

function HomeStack() {
  return (
    <Stack.Navigator
      initialRouteName='Home'
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name='Home' component={Screens.HomeScreen} />
      <Stack.Screen name='DailyWrite' component={Screens.DailyWriteScreen} />
      <Stack.Screen name='Suggest' component={Screens.SuggestScreen} />
      <Stack.Screen name='ChatBot' component={Screens.ChatBotScreen} />
      <Stack.Screen name='Write' component={Screens.WriteScreen} />
      <Stack.Screen name='Calls' component={Screens.CallsScreen} />
    </Stack.Navigator>
  )
}

function BottomNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName='DailyStack'
    >
      <Tab.Screen
        name='HomeStack'
        component={HomeStack}
        options={{
          tabBarLabel: 'Inicio',
          // eslint-disable-next-line react/no-unstable-nested-components
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name='home' color={color} size={size} />
          ),
          tabBarActiveTintColor: colors.primary
        }}
      />

      <Tab.Screen
        name='DailyStack'
        component={DailyStack}
        options={{
          tabBarLabel: 'Diario',
          // eslint-disable-next-line react/no-unstable-nested-components
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name='book-lock'
              color={color}
              size={size}
            />
          ),
          tabBarActiveTintColor: colors.primary
        }}
      />

      <Tab.Screen
        name='CommunityStack'
        component={CommunityStack}
        options={{
          tabBarLabel: 'Comunidad',
          // eslint-disable-next-line react/no-unstable-nested-components
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name='users' color={color} size={size} />
          ),
          tabBarActiveTintColor: colors.primary
        }}
      />

      <Tab.Screen
        name='ProfileStack'
        component={ProfileStack}
        options={{
          tabBarLabel: 'Perfil',
          // eslint-disable-next-line react/no-unstable-nested-components
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name='user-circle-o' color={color} size={size} />
          ),
          tabBarActiveTintColor: colors.primary
        }}
      />
    </Tab.Navigator>
  )
}

function AppStack() {
  const headerVisible = useHeaderState((state) => state.headerVisible)

  const onSignOut = () => {
    signOut(auth).catch((error) => console.log(error))
  }

  return (
    <Stack.Navigator
      initialRouteName='BottomRoot'
      screenOptions={{
        headerShown: headerVisible,
        title: 'Emocean',
        headerLeft: () => null,
        // eslint-disable-next-line react/no-unstable-nested-components
        headerRight: () => (
          <TouchableOpacity style={styles.margRight} onPress={onSignOut}>
            <FontAwesome
              name='sign-out'
              size={24}
              color={colors.gray}
              style={styles.margRight}
            />
          </TouchableOpacity>
        )
      }}
    >
      <Stack.Screen name='BottomRoot' component={BottomNavigator} />
    </Stack.Navigator>
  )
}

function RootNavigator() {
  const setUserLogged = useUserState((state) => state.setUser)

  const { user, setUser } = useContext(AuthenticatedUserContext)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (authenticatedUser) => {
      authenticatedUser ? setUser(authenticatedUser) : setUser(null)
      const userData = await getUser(authenticatedUser?.email)

      setUserLogged({
        id: authenticatedUser?.uid,
        name: userData.name,
        email: authenticatedUser?.email || userData.email,
        picture: userData.picture,
        premium: userData.premium || false
      })

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
