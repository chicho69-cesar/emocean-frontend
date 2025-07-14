import { create } from 'zustand'

export const useHeaderTitleState = create((set) => ({
  headerTitle: 'Emocean',
  setHeaderTitle: (title) => set({ headerTitle: title }),
  resetHeaderTitle: () => set({ headerTitle: 'Emocean' }),
}))
