import { FontAwesome } from '@expo/vector-icons'
import * as ImagePicker from 'expo-image-picker'
import { doc, updateDoc } from 'firebase/firestore'
import { AspectRatio, HStack, Image } from 'native-base'
import { useEffect, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useRecoilState } from 'recoil'

import ScreenWrapper from '../components/ScreenWrapper'
import { database } from '../config/firebase'
import { headerState } from '../providers/headerState'
import { userState } from '../providers/userState'
import { getPhrase } from '../utils/getPhrase'
import { uploadImage } from '../utils/uploadImage'

export default function ProfileScreen({ navigation }) {
  const [, setHeaderShow] = useRecoilState(headerState)
  const [user, setUser] = useRecoilState(userState)

  const [image, setImage] = useState(null)
  const [imageFileName, setImageFileName] = useState(null)
  const [isEditing, setIsEditing] = useState(false)
  const [phrase, setPhrase] = useState('')

  useEffect(() => {
    setHeaderShow(true)
  }, [setHeaderShow])

  useEffect(() => {
    setPhrase(getPhrase())
  }, [])

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1
    })

    if (!result.canceled) {
      setImage(result.assets[0].uri)
      setImageFileName(result.assets[0].fileName)
    }
  }

  const onChangeImage = () => {
    setIsEditing(true)
    pickImage()
  }

  const onHandleEdit = async () => {
    let response = 'https://dio-planner.s3.us-east-2.amazonaws.com/no-image.jpg'
    const uri = image
    const type = 'image/jpeg'
    const file = imageFileName || 'image.jpg'

    if (image) {
      response = await uploadImage(uri, type, file)

      const updatingUser = doc(database, 'users', user.id)
      await updateDoc(updatingUser, {
        ...user,
        picture: response
      })

      setUser({ ...user, picture: response })
      setIsEditing(false)
    }
  }

  return (
    <ScreenWrapper>
      <HStack w="100%" justifyContent="center" mt={6}>
        <AspectRatio
          ratio={{
            base: 3 / 4,
            md: 3 / 4
          }}
          height={{
            base: 200,
            md: 200
          }}
        >
          <Image
            rounded="lg"
            resizeMode="cover"
            alt={user.name}
            source={{
              uri: user.picture
            }}
          />
        </AspectRatio>
      </HStack>

      <HStack
        w="100%"
        justifyContent="center"
        alignItems="center"
        space={4}
        mt={3}
      >
        <TouchableOpacity style={styles.editButton} onPress={onChangeImage}>
          <FontAwesome name="pencil" color="#888" size={24} />
        </TouchableOpacity>

        <View
          style={[
            styles.accountView,
            user.premium && styles.accountPremiumView
          ]}
        >
          <Text style={[styles.account, user.premium && styles.accountPremium]}>
            {user.premium ? 'Premium' : 'Básica'}
          </Text>
        </View>
      </HStack>

      {isEditing && (
        <TouchableOpacity style={styles.save} onPress={onHandleEdit}>
          <Text style={styles.saveText}>Guardar</Text>
        </TouchableOpacity>
      )}

      <Text style={styles.text}>{user.name}</Text>
      <Text style={styles.email}>{user.email}</Text>

      {!user.premium && (
        <TouchableOpacity
          style={styles.premium}
          onPress={() => {
            navigation.push('CreditCard')
          }}
        >
          <Text style={styles.premiumText}>Hazte Premium</Text>
        </TouchableOpacity>
      )}

      <Text style={styles.quote}>&quot;{phrase}&quot;</Text>
    </ScreenWrapper>
  )
}

const styles = StyleSheet.create({
  editButton: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    textAlign: 'center',
    borderRadius: 50,
    backgroundColor: '#f3f3f3'
  },
  accountView: {
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 10,
    backgroundColor: '#f3f3f3'
  },
  accountPremiumView: {
    backgroundColor: '#FFD700'
  },
  account: {
    color: '#303030',
    fontSize: 16,
    fontWeight: 'bold'
  },
  accountPremium: {
    color: '#fff'
  },
  text: {
    marginTop: 20,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#303030'
  },
  email: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'semibold',
    color: '#404040'
  },
  premium: {
    marginTop: 15,
    marginHorizontal: 80,
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 10,
    backgroundColor: '#FFD700'
  },
  premiumText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '800',
    color: '#303030'
  },
  quote: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 18,
    color: '#303030',
    fontStyle: 'italic'
  },
  save: {
    marginTop: 15,
    marginHorizontal: 80,
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 10,
    backgroundColor: '#353535',
    elevation: 1
  },
  saveText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '800',
    color: '#f1f1f1'
  }
})
