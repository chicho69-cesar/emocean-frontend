import { Heading } from 'native-base'

export default function Title({ text, mt }) {
  return (
    <Heading w="100%" textAlign="center" fontSize="lg" color="black" mt={mt}>
      {text}
    </Heading>
  )
}
