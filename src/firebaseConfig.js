import firebase from "firebase";

const config = {
  apiKey: "AIzaSyBTdq5Ow50FEpNbTz6owDlO4oiz3LGkNDQ",
  authDomain: "burguer-queen-6d1a0.firebaseapp.com",
  databaseURL: "https://burguer-queen-6d1a0.firebaseio.com",
  projectId: "burguer-queen-6d1a0",
  storageBucket: "burguer-queen-6d1a0.appspot.com",
  messagingSenderId: "518669806716",
  appId: "1:518669806716:web:f99ab513a6bd7130"
};

firebase.initializeApp(config);

export default firebase;