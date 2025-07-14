import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useEmotionState } from '../providers/dailyState'

export default function FeelingList({ feelings }) {
  const emotion = useEmotionState((state) => state.emotion)
  const setEmotion = useEmotionState((state) => state.setEmotion)

  return (
    <View style={styles.container}>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        horizontal
        style={styles.scroll}
      >
        {feelings.map((feeling) => (
          <TouchableOpacity
            key={feeling.id}
            style={styles.card}
            onPress={() => setEmotion(feeling.name)}
          >
            <View
              style={[
                styles.cardContent,
                {
                  backgroundColor: feeling.name === emotion ? '#1e90ff' : '#ffffff',
                  borderWidth: 1,
                  borderColor: feeling.name === emotion ? '#ffffff' : '#d1d5db',
                },
              ]}
            >
              <Text style={styles.emoji}>
                {feeling.emoji}
              </Text>

              <Text
                style={[
                  styles.name,
                  { color: feeling.name === emotion ? '#ffffff' : '#000000' },
                ]}
              >
                {feeling.name}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 5,
    marginTop: 10,
    marginHorizontal: 10,
  },
  scroll: {
    paddingBottom: 15,
  },
  card: {
    marginHorizontal: 10,
    width: 120,
  },
  cardContent: {
    width: '100%',
    paddingHorizontal: 12,
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  emoji: {
    fontSize: 32,
    textAlign: 'center',
    marginBottom: 4,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
})
