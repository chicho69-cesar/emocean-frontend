import { create } from 'zustand'

export const useEmotionState = create((set) => ({
  emotion: '',
  setEmotion: (emotion) => set({ emotion }),
}))

export const useFeelState = create((set) => ({
  feel: '',
  setFeel: (feel) => set({ feel }),
}))
