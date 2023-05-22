import { MaterialCommunityIcons } from '@expo/vector-icons'
import { AspectRatio, HStack, Image } from 'native-base'
import React from 'react'
import { Linking, StyleSheet, Text, TouchableOpacity } from 'react-native'

import ScreenWrapper from '../components/ScreenWrapper'
import Title from '../components/Title'

const docs = [
  {
    id: 1,
    name: 'Carolina Carrillo Pedroza',
    phone: '+523461099207',
    picture:
      'https://i.pinimg.com/564x/fe/b9/fb/feb9fbf6762b9b59fc8088d6871ccef9.jpg',
    active: false
  },
  {
    id: 2,
    name: 'Cesar Villalobos Olmos',
    phone: '+523461005286',
    picture:
      'https://i.pinimg.com/564x/2c/4c/67/2c4c67f144c8ed1600be38d06d8d1765.jpg',
    active: true
  }
]

export default function CallsScreen({ navigation }) {
  const handleCall = (phone) => {
    Linking.openURL(`tel:${phone}`)
  }

  return (
    <ScreenWrapper>
      <Title text="¿Te sientes mal?, marcános" mt={4} />

      {docs.map((doc) => (
        <HStack key={doc.id} w="100%" justifyContent="center">
          <HStack
            bg="coolGray.100"
            mt={4}
            mx={4}
            p={2}
            w="90%"
            rounded="lg"
            justifyContent="space-between"
            alignItems="center"
          >
            <HStack
              w="80%"
              justifyContent="flex-start"
              alignItems="center"
              space={2}
            >
              <AspectRatio
                ratio={{
                  base: 1 / 1,
                  md: 1 / 1
                }}
                height={{
                  base: 70,
                  md: 70
                }}
              >
                <Image
                  rounded="full"
                  resizeMode="cover"
                  alt={doc.name}
                  source={{
                    uri: doc.picture
                  }}
                />
              </AspectRatio>

              <Text>{doc.name}</Text>
            </HStack>

            <HStack w="20%" justifyContent="center">
              <TouchableOpacity
                style={styles.call}
                onPress={() => handleCall(doc.phone)}
              >
                <MaterialCommunityIcons name="phone" size={24} color="white" />
              </TouchableOpacity>
            </HStack>
          </HStack>
        </HStack>
      ))}
    </ScreenWrapper>
  )
}

const styles = StyleSheet.create({
  call: {
    padding: 10,
    borderRadius: 50,
    backgroundColor: '#228B22'
  }
})
