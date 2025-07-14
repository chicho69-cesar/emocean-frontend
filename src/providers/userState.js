import { create } from 'zustand'

const initialValue = {
  id: 1,
  name: '',
  email: '',
  picture: 'https://dio-planner.s3.us-east-2.amazonaws.com/no-image.jpg',
  premium: false
}

export const useUserState = create((set) => ({
  user: initialValue,
  setUser: (user) => set({ user }),
  resetUser: () => set({ user: initialValue }),
  updateUser: (updates) => set((state) => ({ user: { ...state.user, ...updates } }))
}))
