import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyDJ_1t3K34aYFJk0y2IjqXlk8X1KLsUMLI",
    authDomain: "whatsapp-clone-42dfa.firebaseapp.com",
    projectId: "whatsapp-clone-42dfa",
    storageBucket: "whatsapp-clone-42dfa.appspot.com",
    messagingSenderId: "604721070120",
    appId: "1:604721070120:web:fd560e03cb80c703d9351d",
    measurementId: "G-GKEGNESGDS"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider();

  export {auth,provider};
  export default db;
  