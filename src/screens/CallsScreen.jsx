import { MaterialCommunityIcons } from '@expo/vector-icons'
import { Image, Linking, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import ScreenWrapper from '../components/ScreenWrapper'
import Title from '../components/Title'

const docs = [
  {
    id: 1,
    name: 'Carolina Carrillo Pedroza',
    phone: '+523461099207',
    picture: 'https://i.pinimg.com/564x/fe/b9/fb/feb9fbf6762b9b59fc8088d6871ccef9.jpg',
    active: false,
  },
  {
    id: 2,
    name: 'Cesar Villalobos Olmos',
    phone: '+523461005286',
    picture: 'https://i.pinimg.com/564x/2c/4c/67/2c4c67f144c8ed1600be38d06d8d1765.jpg',
    active: true,
  },
]

export default function CallsScreen({ navigation }) {
  const handleCall = (phone) => {
    Linking.openURL(`tel:${phone}`)
  }

  return (
    <ScreenWrapper>
      <Title text='¿Te sientes mal?, marcános' mt={4} />
      
      {docs.map((doc) => (
        <View key={doc.id} style={styles.cardContainer}>
          <View style={styles.card}>
            <View style={styles.info}>
              <Image
                style={styles.image}
                source={{ uri: doc.picture }}
                resizeMode='cover'
              />

              <Text style={styles.name}>
                {doc.name}
              </Text>
            </View>

            <TouchableOpacity style={styles.call} onPress={() => handleCall(doc.phone)}>
              <MaterialCommunityIcons name='phone' size={24} color='white' />
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </ScreenWrapper>
  )
}

const styles = StyleSheet.create({
  cardContainer: {
    width: '100%',
    justifyContent: 'center',
    marginTop: 16,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#f3f4f6',
    marginHorizontal: 16,
    padding: 8,
    borderRadius: 8,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  info: {
    flexDirection: 'row',
    width: '80%',
    alignItems: 'center',
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginRight: 8,
  },
  name: {
    fontSize: 16,
    color: '#000000',
  },
  call: {
    padding: 10,
    borderRadius: 50,
    backgroundColor: '#228B22',
  },
})
