import firebase from "firebase"
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBAu2iLRmqaREY5uhOXt58kEpk01VeNJu4",
  authDomain: "notechat-24ab7.firebaseapp.com",
  projectId: "notechat-24ab7",
  storageBucket: "notechat-24ab7.appspot.com",
  messagingSenderId: "740371626188",
  appId: "1:740371626188:web:c5c68064c145fb221f2a69",
  measurementId: "G-5JPL8D7MK0"
};
  const firebaseApp= firebase.initializeApp(firebaseConfig);
  const db= firebaseApp.firestore();
  const auth =firebase.auth();
  const provider= new firebase.auth.GoogleAuthProvider();
  const storage = firebase.storage()
  export {auth, provider,storage};
  export default db;