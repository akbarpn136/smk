import firebase from 'firebase/app'
import 'firebase/auth'

// leave the export, even if you don't use it
export default async ({ Vue }) => {
  const config = {
    apiKey: "AIzaSyCKtfFGnzy1MYWy-TRE5pJ6dIYj5KggheE",
    authDomain: "smksiswa-c19c7.firebaseapp.com",
    databaseURL: "https://smksiswa-c19c7.firebaseio.com",
    projectId: "smksiswa-c19c7",
    storageBucket: "smksiswa-c19c7.appspot.com",
    messagingSenderId: "392800305965"
  };

  firebase.initializeApp(config)

  Vue.prototype.$firebase = firebase
}
