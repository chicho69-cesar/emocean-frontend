import { AntDesign } from '@expo/vector-icons'
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import { useLayoutEffect, useState } from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import ScreenWrapper from '../components/ScreenWrapper'
import Title from '../components/Title'
import { auth, database } from '../config/firebase'
import { getUser } from '../services/getUser'

export default function CommunityScreen({ navigation }) {
  const [posts, setPosts] = useState([])

  useLayoutEffect(() => {
    const collectionRef = collection(database, 'posts')
    const q = query(collectionRef, orderBy('createdAt', 'desc'))

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const newPosts = []

      querySnapshot.docs.forEach((doc) => {
        getUser(doc.data().user).then((res) => {
          newPosts.push({
            id: doc.id,
            date: doc.data().createdAt.toDate(),
            text: doc.data().text,
            user: {
              email: res.email,
              name: res.name,
              picture: res.picture,
            },
          })

          if (newPosts.length === querySnapshot.docs.length) {
            setPosts(newPosts)
          }
        })
      })
    })

    return () => unsubscribe()
  }, [])

  return (
    <ScreenWrapper>
      <Title text='Posts mas recientes' mt={4} />

      <TouchableOpacity
        style={styles.add}
        onPress={() => navigation.navigate('CommunityPost')}
      >
        <View style={styles.buttonContent}>
          <AntDesign name='plus' size={24} color='white' />
          <Text style={styles.btnText}>Comparte algo</Text>
        </View>
      </TouchableOpacity>

      {posts
        .sort((a, b) => b.date - a.date)
        .map((post) => (
          <View key={post.id} style={styles.postContainer}>
            <View
              style={[
                styles.post,
                {
                  backgroundColor:
                    post.user.email === auth?.currentUser?.email ? '#1e90ff' : '#f3f4f6',
                  borderWidth: 1,
                  borderColor:
                    post.user.email === auth?.currentUser?.email ? '#f3f4f6' : '#9ca3af',
                },
              ]}
            >
              <View style={styles.userInfo}>
                <Image
                  style={styles.image}
                  source={{ uri: post.user.picture }}
                  resizeMode='cover'
                />

                <Text
                  style={[
                    styles.user,
                    post.user.email === auth?.currentUser?.email && styles.userMe,
                  ]}
                >
                  {post.user.name}
                </Text>
              </View>
              
              <View style={styles.postContent}>
                <Text
                  style={[
                    styles.postText,
                    post.user.email === auth?.currentUser?.email && styles.userMe,
                  ]}
                >
                  {post.text}
                </Text>
              </View>
            </View>
          </View>
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
    borderRadius: 10,
  },
  buttonContent: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 4,
  },
  postContainer: {
    width: '100%',
    marginVertical: 8,
    justifyContent: 'center',
  },
  post: {
    width: '90%',
    alignSelf: 'center',
    borderRadius: 8,
    padding: 8,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#9ca3af',
  },
  image: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    marginRight: 8,
  },
  user: {
    fontSize: 12,
    color: '#303030',
    fontWeight: '700',
  },
  userMe: {
    color: '#F1F1F1',
  },
  postContent: {
    width: '100%',
    paddingTop: 8,
  },
  postText: {
    fontSize: 16,
    color: '#303030',
  },
})
