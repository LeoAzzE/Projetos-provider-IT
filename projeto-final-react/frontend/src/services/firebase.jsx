import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyCtBA6hqA78QheQpDi0I93IUU0Lb1Fcn3E",
    authDomain: "project-reactjs-8874b.firebaseapp.com",
    projectId: "project-reactjs-8874b",
    storageBucket: "project-reactjs-8874b.appspot.com",
    messagingSenderId: "772462791368",
    appId: "1:772462791368:web:ec44976be3b8a4fdcb33fd",
    measurementId: "G-VP9VWJHECH"
  };

  const firebaseApp = initializeApp(firebaseConfig)

  const auth = getAuth(firebaseApp)
  const db = getFirestore(firebaseApp)
  const storage = getStorage(firebaseApp)

  export { auth, db, storage }