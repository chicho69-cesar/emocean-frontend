import { Heading, Text, VStack } from 'native-base'
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native'
import { useRecoilState } from 'recoil'

import { emotionState } from '../providers/dailyState'

export default function FeelingList({ feelings }) {
  const [emotion, setEmotion] = useRecoilState(emotionState)

  return (
    <View style={styles.container}>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        horizontal
        style={styles.scroll}
      >
        {feelings.map((feeling) => {
          return (
            <TouchableOpacity
              key={feeling.id}
              style={styles.card}
              onPress={() => setEmotion(feeling.name)}
            >
              <VStack
                w="100%"
                px={3}
                py={4}
                bg={feeling.name === emotion ? 'tahiti.600' : 'white'}
                borderWidth={1}
                borderColor={
                  feeling.name === emotion ? 'white' : 'coolGray.300'
                }
                rounded="lg"
              >
                <Heading w="100%" size="3xl" textAlign="center">
                  {feeling.emoji}
                </Heading>

                <Text
                  w="100%"
                  textAlign="center"
                  fontWeight="semibold"
                  color={feeling.name === emotion ? 'white' : 'black'}
                >
                  {feeling.name}
                </Text>
              </VStack>
            </TouchableOpacity>
          )
        })}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 5,
    marginTop: 10,
    marginHorizontal: 10
  },
  scroll: {
    paddingBottom: 15
  },
  card: {
    marginHorizontal: 10,
    width: 120
  }
})
