import { create } from 'zustand'

export const useSuggestState = create((set) => ({
  suggest: '',
  write: {},
  setSuggest: (suggest) => set({ suggest }),
  setWrite: (write) => set({ write })
}))
