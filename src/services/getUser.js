import { collection, getDocs } from 'firebase/firestore'
import { database } from '../config/firebase'

export const getUser = async (email) => {
  let user = {}
  const querySnapshot = await getDocs(collection(database, 'users'))

  querySnapshot.forEach((doc) => {
    if (doc.data().email === email) {
      user = {
        name: doc.data().name,
        email: doc.data().email,
        picture: doc.data().picture
      }
    }
  })

  return user
}
