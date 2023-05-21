import { Heading } from 'native-base'
import React from 'react'

export default function Title({ text, mt }) {
  return (
    <Heading w="100%" textAlign="center" fontSize="lg" color="black" mt={mt}>
      {text}
    </Heading>
  )
}
