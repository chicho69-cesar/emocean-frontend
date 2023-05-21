import { AntDesign } from '@expo/vector-icons'
import { AspectRatio, HStack, Icon, Image, VStack } from 'native-base'
import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'

import ScreenWrapper from '../components/ScreenWrapper'
import Title from '../components/Title'
import { auth } from '../config/firebase'

const myposts = [
  {
    id: 1,
    user: {
      email: 'carouwu@gmai.com',
      name: 'Carolina Carrillo Pedroza',
      picture:
        'https://i.pinimg.com/564x/fe/b9/fb/feb9fbf6762b9b59fc8088d6871ccef9.jpg'
    },
    text: 'Hola como han estado, pienso que una buena forma de arreglar esos problemas son hablando con personas a las cuales les tengamos mucha confianza',
    date: new Date('2023-05-01T00:00:00')
  },
  {
    id: 2,
    user: {
      email: 'carouwu@gmai.com',
      name: 'Carolina Carrillo Pedroza',
      picture:
        'https://i.pinimg.com/564x/fe/b9/fb/feb9fbf6762b9b59fc8088d6871ccef9.jpg'
    },
    text: 'Hola como han estado, pienso que una buena forma de arreglar esos problemas son hablando con personas a las cuales les tengamos mucha confianza',
    date: new Date('2023-07-01T00:00:00')
  },
  {
    id: 3,
    user: {
      email: 'cesarvillalobosolmos.01@gmail.com',
      name: 'Cesar Villalobos Olmos',
      picture:
        'https://i.pinimg.com/564x/2c/4c/67/2c4c67f144c8ed1600be38d06d8d1765.jpg'
    },
    text: 'Hola como han estado, pienso que una buena forma de arreglar esos problemas son hablando con personas a las cuales les tengamos mucha confianza',
    date: new Date('2023-06-01T00:00:00')
  },
  {
    id: 4,
    user: {
      email: 'carouwu@gmai.com',
      name: 'Carolina Carrillo Pedroza',
      picture:
        'https://i.pinimg.com/564x/fe/b9/fb/feb9fbf6762b9b59fc8088d6871ccef9.jpg'
    },
    text: 'Hola como han estado, pienso que una buena forma de arreglar esos problemas son hablando con personas a las cuales les tengamos mucha confianza',
    date: new Date('2023-05-01T00:00:00')
  }
]

export default function CommunityScreen({ navigation }) {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    setPosts(myposts)
  }, [])

  return (
    <ScreenWrapper>
      <Title text="Posts mas recientes" mt={4} />

      <TouchableOpacity
        style={styles.add}
        onPress={() => navigation.navigate('CommunityPost')}
      >
        <HStack w="100%" justifyContent="center" alignItems="center" space={1}>
          <Icon
            color="white"
            as={AntDesign}
            name="plus"
            size="lg"
            fontWeight="bold"
          />
          <Text style={styles.btnText}>Comparte algo</Text>
        </HStack>
      </TouchableOpacity>

      {posts
        .sort((a, b) => b.date - a.date)
        .map((post) => (
          <HStack key={post.id} w="100%" my={2} justifyContent="center">
            <VStack
              w="90%"
              justifyContent="flex-start"
              alignItems="center"
              bg={
                post.user.email === auth?.currentUser?.email
                  ? 'tahiti.600'
                  : 'coolGray.100'
              }
              borderWidth={1}
              borderColor={
                post.user.email === auth?.currentUser?.email
                  ? 'coolGray.100'
                  : 'coolGray.400'
              }
              rounded="lg"
              p={2}
            >
              <HStack
                w="100%"
                justifyContent="flex-start"
                alignItems="center"
                pb={2}
                space={2}
                borderBottomWidth={1}
                borderBottomColor={
                  post.user.email === auth?.currentUser?.email
                    ? 'coolGray.100'
                    : 'coolGray.400'
                }
              >
                <AspectRatio
                  ratio={{
                    base: 1 / 1,
                    md: 1 / 1
                  }}
                  height={{
                    base: 45,
                    md: 45
                  }}
                >
                  <Image
                    rounded="full"
                    resizeMode="cover"
                    alt={post.user.name}
                    source={{
                      uri: post.user.picture
                    }}
                  />
                </AspectRatio>

                <Text
                  style={[
                    styles.user,
                    // eslint-disable-next-line prettier/prettier
                    post.user.email === auth?.currentUser?.email && styles.userMe
                  ]}
                >
                  {post.user.name}
                </Text>
              </HStack>

              <HStack w="100%" justifyContent="flex-start" pt={2}>
                <Text
                  style={[
                    styles.post,
                    // eslint-disable-next-line prettier/prettier
                    post.user.email === auth?.currentUser?.email && styles.userMe
                  ]}
                >
                  {post.text}
                </Text>
              </HStack>
            </VStack>
          </HStack>
        ))}
    </ScreenWrapper>
  )
}

const styles = StyleSheet.create({
  add: {
    backgroundColor: '#0891b2',
    marginVertical: 10,
    marginHorizontal: 120,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10
  },
  btnText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600'
  },
  user: {
    fontSize: 12,
    color: '#303030',
    fontWeight: '700'
  },
  userMe: {
    color: '#F1F1F1'
  },
  post: {
    fontSize: 16,
    color: '#303030'
  }
})
