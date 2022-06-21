import firebase from "firebase/compat/app";

const firebaseConfig = {
  apiKey: "AIzaSyCunK8yagHoZcLor052DVU1H9W9rQk9xsM",
  authDomain: "vtrack-ap.firebaseapp.com",
  databaseURL: "https://vtrack-ap-default-rtdb.firebaseio.com/",
  projectId: "vtrack-ap",
  storageBucket: "vtrack-ap.appspot.com",
  messagingSenderId: "44253165506",
  appId: "1:44253165506:web:c73c7353c9f7d1f779485b",
  measurementId: "G-2E6XDBVJ3M",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
