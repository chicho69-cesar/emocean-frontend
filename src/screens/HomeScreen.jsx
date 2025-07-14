import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons'
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import { useLayoutEffect, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import ColumnDaily from '../components/ColumnDaily'
import ScreenWrapper from '../components/ScreenWrapper'
import Title from '../components/Title'
import { auth, database } from '../config/firebase'

export default function HomeScreen({ navigation }) {
  const [writes, setWrites] = useState([])

  useLayoutEffect(() => {
    const collectionRef = collection(database, 'dailies')
    const q = query(collectionRef, orderBy('createdAt', 'desc'))

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      setWrites(
        querySnapshot.docs
          .filter((doc) => doc.data().user === auth?.currentUser?.email)
          .map((doc) => {
            const date = doc.data().createdAt
              ? doc.data().createdAt.toDate()
              : new Date()

            return {
              id: doc.id,
              date: date,
              description: doc.data().text,
              color: doc.data().color,
              user: doc.data().user,
              write: doc.data().write || '',
            }
          })
      )
    })

    return () => unsubscribe()
  }, [])

  return (
    <ScreenWrapper>
      <Title text='¿Necesitas ayuda?' mt={4} />

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.btn, styles.phone]}
          onPress={() => navigation.navigate('Calls')}
        >
          <View style={styles.buttonContent}>
            <MaterialCommunityIcons name='phone' size={24} color='white' />
            <Text style={styles.btnText}>Atención</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.btn}
          onPress={() => navigation.navigate('ChatBot')}
        >
          <View style={styles.buttonContent}>
            <MaterialCommunityIcons name='chat' size={24} color='white' />
            <Text style={styles.btnText}>Chat</Text>
          </View>
        </TouchableOpacity>
      </View>

      <Title text='Tú diario' mt={6} />

      <TouchableOpacity
        style={styles.add}
        onPress={() => navigation.navigate('DailyWrite')}
      >
        <View style={styles.buttonContent}>
          <AntDesign name='plus' size={24} color='white' />
          <Text style={styles.btnText}>Agregar</Text>
        </View>
      </TouchableOpacity>
      
      <View style={styles.columns}>
        <ColumnDaily writes={writes.filter((_, index) => index % 2 === 0)} />
        <ColumnDaily writes={writes.filter((_, index) => index % 2 !== 0)} />
      </View>
    </ScreenWrapper>
  )
}

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  btn: {
    width: 150,
    backgroundColor: '#0891b2',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginHorizontal: 4,
  },
  phone: {
    backgroundColor: '#228B22',
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
  columns: {
    flexDirection: 'row',
    width: '100%',
  },
})
