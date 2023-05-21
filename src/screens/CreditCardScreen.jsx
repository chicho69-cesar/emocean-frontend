import React, { useEffect, useState } from 'react'
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native'
import { useRecoilState } from 'recoil'

import { headerState } from '../providers/headerState'
const backImage = require('../../assets/images/backImage.jpg')

export default function CreditCardScreen({ navigation }) {
  const [, setHeaderShow] = useRecoilState(headerState)

  const [name, setName] = useState('')
  const [curp, setCurp] = useState('')
  const [number, setNumber] = useState('')
  const [date, setDate] = useState('')
  const [cvc, setCvc] = useState('')

  useEffect(() => {
    setHeaderShow(false)
  }, [setHeaderShow])

  const onHandleSubmit = () => {
    console.log('Hola xd')
    navigation.push('Profile')
  }

  return (
    <View style={styles.container}>
      <Image source={backImage} style={styles.backImage} />
      <View style={styles.whiteSheet} />

      <SafeAreaView style={styles.form}>
        <Text style={styles.title}>Agregar tarjeta</Text>

        <TextInput
          style={styles.input}
          placeholder="Nombre en la tarjeta"
          autoCapitalize="none"
          keyboardType="default"
          textContentType="givenName"
          autoFocus={true}
          value={name}
          onChangeText={(text) => setName(text)}
        />

        <TextInput
          style={styles.input}
          placeholder="CURP"
          autoCapitalize="none"
          keyboardType="default"
          textContentType="givenName"
          value={curp}
          onChangeText={(text) => setCurp(text)}
        />

        <TextInput
          style={styles.input}
          placeholder="Numero de tarjeta"
          autoCapitalize="none"
          keyboardType="default"
          textContentType="givenName"
          value={number}
          onChangeText={(text) => setNumber(text)}
        />

        <View style={styles.horizontalView}>
          <TextInput
            style={[styles.input, styles.inputHorizontal]}
            placeholder="MM/AA"
            autoCapitalize="none"
            keyboardType="default"
            textContentType="givenName"
            value={date}
            onChangeText={(text) => setDate(text)}
          />

          <TextInput
            style={[styles.input, styles.inputHorizontal]}
            placeholder="CVC"
            autoCapitalize="none"
            keyboardType="default"
            textContentType="givenName"
            value={cvc}
            onChangeText={(text) => setCvc(text)}
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={onHandleSubmit}>
          <Text style={styles.loginButton}>Agregar</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#0891b2',
    alignSelf: 'center',
    marginBottom: 24
  },
  input: {
    backgroundColor: '#f6f7fb',
    height: 58,
    marginBottom: 20,
    fontSize: 16,
    borderRadius: 10,
    padding: 12
  },
  backImage: {
    width: '100%',
    height: 340,
    position: 'absolute',
    top: 0,
    resizeMode: 'cover'
  },
  whiteSheet: {
    width: '100%',
    height: '75%',
    position: 'absolute',
    bottom: 0,
    backgroundColor: '#fff',
    borderTopLeftRadius: 60
  },
  form: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 30,
    marginTop: 90
  },
  button: {
    backgroundColor: '#0891b2',
    height: 58,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20
  },
  loginButton: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold'
  },
  horizontalView: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  inputHorizontal: {
    width: '45%'
  }
})
