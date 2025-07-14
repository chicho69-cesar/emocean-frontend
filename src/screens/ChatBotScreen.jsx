import axios from 'axios'
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query
} from 'firebase/firestore'
import { useCallback, useLayoutEffect, useState } from 'react'
import { StyleSheet } from 'react-native'
import { GiftedChat } from 'react-native-gifted-chat'

import { auth, database } from '../config/firebase'
import { SERVER_LINK } from '../constants/server'
import { useUserState } from '../providers/userState'

export default function ChatBotScreen() {
  const userLogged = useUserState((state) => state.user)
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

      try {
        const response = await axios.post(`${SERVER_LINK}/api/chatgpt`, {
          prompt: text
        })

        const responseMessage = response.data.message.content

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
