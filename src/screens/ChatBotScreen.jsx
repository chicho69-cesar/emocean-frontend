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

import { auth, database } from '../config/firebase'

export default function ChatBotScreen() {
  const [chatMessages, setChatMessages] = useState([])

  useLayoutEffect(() => {
    const collectionRef = collection(database, 'chats')
    const q = query(collectionRef, orderBy('createdAt', 'desc'))

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      setChatMessages(
        querySnapshot.docs
          .filter((doc) => doc.data().user._id === auth?.currentUser?.email)
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

  const onSend = useCallback((messages = []) => {
    setChatMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    )

    const { _id, createdAt, text, user } = messages[0]
    addDoc(collection(database, 'chats'), { _id, createdAt, text, user })
  }, [])

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
