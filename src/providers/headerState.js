import { create } from 'zustand'

export const useHeaderState = create((set) => ({
  headerVisible: true,
  setHeaderVisible: (visible) => set({ headerVisible: visible }),
  toggleHeaderVisible: () => set((state) => ({ headerVisible: !state.headerVisible })),
}))
