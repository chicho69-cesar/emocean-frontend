import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons'
import { HStack, Icon } from 'native-base'
import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'

import ColumnDaily from '../components/ColumnDaily'
import ScreenWrapper from '../components/ScreenWrapper'
import Title from '../components/Title'

const mywrites = [
  {
    id: 1,
    date: new Date('2023-05-01T00:00:00'),
    description:
      'Ad deserunt laborum non occaecat anim sunt laborum reprehenderit do nisi. Ad deserunt laborum non occaecat anim sunt laborum reprehenderit do nisi.',
    color: '#DDFFC2'
  },
  {
    id: 2,
    date: new Date('2023-05-01T00:00:00'),
    description:
      'Ad deserunt laborum non occaecat anim sunt laborum reprehenderit do nisi.',
    color: '#FFC2C2'
  },
  {
    id: 3,
    date: new Date('2023-05-01T00:00:00'),
    description:
      'Ad deserunt laborum non occaecat anim sunt laborum reprehenderit do nisi.',
    color: '#FFEAC2'
  },
  {
    id: 4,
    date: new Date('2023-05-01T00:00:00'),
    description:
      'Ad deserunt laborum non occaecat anim sunt laborum reprehenderit do nisi. Ad deserunt laborum non occaecat anim sunt laborum reprehenderit do nisi.',
    color: '#C2FFD3'
  },
  {
    id: 5,
    date: new Date('2023-05-01T00:00:00'),
    description:
      'Ad deserunt laborum non occaecat anim sunt laborum reprehenderit do nisi. Ad deserunt laborum non occaecat anim sunt laborum reprehenderit do nisi.',
    color: '#C2FFEC'
  },
  {
    id: 6,
    date: new Date('2023-06-01T00:00:00'),
    description:
      'Ad deserunt laborum non occaecat anim sunt laborum reprehenderit do nisi. Ad deserunt laborum non occaecat anim sunt laborum reprehenderit do nisi. Ad deserunt laborum non occaecat anim sunt laborum reprehenderit do nisi.',
    color: '#FFC2D8'
  }
]

export default function HomeScreen({ navigation }) {
  const [writes, setWrites] = useState([])

  useEffect(() => {
    setWrites(mywrites)
  }, [])

  return (
    <ScreenWrapper>
      <Title text="¿Necesitas ayuda?" mt={4} />

      <HStack
        w="100%"
        justifyContent="center"
        alignItems="center"
        space={2}
        mt={2}
      >
        <TouchableOpacity
          style={[styles.btn, styles.phone]}
          onPress={() => navigation.navigate('Calls')}
        >
          <HStack
            w="100%"
            justifyContent="center"
            alignItems="center"
            space={1}
          >
            <Icon
              color="white"
              as={MaterialCommunityIcons}
              name="phone"
              size="lg"
              fontWeight="bold"
            />
            <Text style={styles.btnText}>Atención</Text>
          </HStack>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.btn}
          onPress={() => navigation.navigate('ChatBot')}
        >
          <HStack
            w="100%"
            justifyContent="center"
            alignItems="center"
            space={1}
          >
            <Icon
              color="white"
              as={MaterialCommunityIcons}
              name="chat"
              size="lg"
              fontWeight="bold"
            />
            <Text style={styles.btnText}>Chat</Text>
          </HStack>
        </TouchableOpacity>
      </HStack>

      <Title text="Tú diario" mt={6} />

      <TouchableOpacity
        style={styles.add}
        onPress={() => navigation.navigate('DailyWrite')}
      >
        <HStack w="100%" justifyContent="center" alignItems="center" space={1}>
          <Icon
            color="white"
            as={AntDesign}
            name="plus"
            size="lg"
            fontWeight="bold"
          />
          <Text style={styles.btnText}>Agregar</Text>
        </HStack>
      </TouchableOpacity>

      <HStack w="100%">
        <ColumnDaily writes={writes.filter((_, index) => index % 2 === 0)} />
        <ColumnDaily writes={writes.filter((_, index) => index % 2 !== 0)} />
      </HStack>
    </ScreenWrapper>
  )
}

const styles = StyleSheet.create({
  btn: {
    width: 150,
    backgroundColor: '#0891b2',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10
  },
  btnText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600'
  },
  phone: {
    backgroundColor: '#228B22'
  },
  add: {
    backgroundColor: '#0891b2',
    marginVertical: 10,
    marginHorizontal: 120,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10
  }
})
