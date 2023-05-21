import { atom } from 'recoil'

export const userState = atom({
  key: 'userState',
  default: {
    id: 1,
    name: '',
    email: '',
    picture: 'https://dio-planner.s3.us-east-2.amazonaws.com/no-image.jpg',
    premium: false
  }
})
