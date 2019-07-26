import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

// leave the export, even if you don't use it
export default async ({ Vue }) => {
  const config = {
    apiKey: "AIzaSyDhdq_BvTK2eU9Nx9rvK8DkudjIWZWuf",
    authDomain: "smksiswa-1e9b2.firebaseapp.com",
    databaseURL: "https://smksiswa-1e9b2.firebaseio.com",
    projectId: "smksiswa-1e9b2",
    storageBucket: "smksiswa-1e9b2.appspot.com",
    messagingSenderId: "759722842112"
  };

  firebase.initializeApp(config)

  Vue.prototype.$firebase = firebase
}
