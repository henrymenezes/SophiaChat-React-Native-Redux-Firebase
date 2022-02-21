import firebase from 'firebase'

  const firebaseConfig = {
    apiKey: "AIzaSyCBkoL9ody1UwNx0Z340DJRU96wwgu-gbk",
    authDomain: "devsapp-5f51c.firebaseapp.com",
    databaseURL: "https://devsapp-5f51c-default-rtdb.firebaseio.com",
    projectId: "devsapp-5f51c",
    storageBucket: "devsapp-5f51c.appspot.com",
    messagingSenderId: "264897136517",
    appId: "1:264897136517:web:10689f478e4781738866ec"
  }
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig)

export default firebase