import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyCjqNPwD7jeSMS_TSL6cIbIbyo72nMXM-w',
  authDomain: 'curso-11ce4.firebaseapp.com',
  projectId: 'curso-11ce4',
  storageBucket: 'curso-11ce4.appspot.com',
  messagingSenderId: '609010403370',
  appId: '1:609010403370:web:cc8e472276f39e34395b53',
  measurementId: 'G-6T3KLZEDT9'
}

const firebaseApp = initializeApp(firebaseConfig)

const db = getFirestore(firebaseApp)
const auth = getAuth(firebaseApp)
export { db, auth }
