import axios from 'axios'
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query
} from 'firebase/firestore'
import React, { useCallback, useLayoutEffect, useState } from 'react'
import { StyleSheet } from 'react-native'
import { GiftedChat } from 'react-native-gifted-chat'
import { useRecoilState } from 'recoil'

import { auth, database } from '../config/firebase'
import { SERVER_LINK } from '../constants/server'
import { userState } from '../providers/userState'

export default function ChatBotScreen() {
  const [userLogged] = useRecoilState(userState)
  const [chatMessages, setChatMessages] = useState([])

  useLayoutEffect(() => {
    const collectionRef = collection(database, 'chats')
    const q = query(collectionRef, orderBy('createdAt', 'desc'))

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      setChatMessages(
        querySnapshot.docs
          .filter(
            (doc) =>
              doc.data().user._id === auth?.currentUser?.email ||
              doc.data().user._id === `${auth?.currentUser?.email}-chat`
          )
          .map((doc) => ({
            _id: doc.id,
            createdAt: doc.data().createdAt.toDate(),
            text: doc.data().text,
            user: doc.data().user
          }))
      )
    })

    return () => unsubscribe()
  }, [])

  const onSend = useCallback(
    async (messages = []) => {
      const { _id, createdAt, text, user } = messages[0]

      // Realizar la petición HTTP POST
      try {
        const response = await axios.post(`${SERVER_LINK}/api/chatgpt`, {
          prompt: text
        })

        // Obtener el mensaje de respuesta de la petición
        const responseMessage = response.data.message.content

        // Agregar el mensaje de respuesta al arreglo de mensajes del chat
        const updatedMessages = [
          {
            _id: Math.random().toString(),
            createdAt: new Date(new Date().getTime() + 10000),
            text: responseMessage,
            user: {
              _id: `${auth?.currentUser?.email}-chat`,
              avatar: userLogged.picture
            }
          },
          ...messages
        ]

        setChatMessages(updatedMessages)

        // Guardar el mensaje enviado y la respuesta en la colección chats de Firebase
        addDoc(collection(database, 'chats'), {
          _id,
          createdAt,
          text,
          user
        })
        addDoc(collection(database, 'chats'), {
          _id: Math.random().toString(),
          createdAt: new Date(new Date().getTime() + 10000),
          text: responseMessage,
          user: {
            _id: `${auth?.currentUser?.email}-chat`,
            avatar: userLogged.picture
          }
        })
      } catch (error) {
        console.error('Error al enviar el mensaje:', error)
      }
    },
    [userLogged]
  )

  return (
    <GiftedChat
      messages={chatMessages}
      onSend={(messages) => onSend(messages)}
      user={{
        _id: auth?.currentUser?.email,
        avatar: 'https://i.pravatar.cc/300'
      }}
      showUserAvatar={false}
      messagesContainerStyle={styles.messageStyle}
    />
  )
}

const styles = StyleSheet.create({
  messageStyle: {
    backgroundColor: '#fff'
  }
})
