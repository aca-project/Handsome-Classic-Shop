import firebase from 'firebase';
import 'firebase/firestore';


const config = {
  apiKey: "AIzaSyAYPSkBWYzn3RQroBGJPhhHqht9j1MS5No",
    authDomain: "aca-project-90034.firebaseapp.com",
    databaseURL: "https://aca-project-90034.firebaseio.com",
    projectId: "aca-project-90034",
    storageBucket: "",
    messagingSenderId: "930312279923",
    appId: "1:930312279923:web:8f2928163014b408"
};

export function initFirebase() {
  firebase.initializeApp(config);
}

export default initFirebase;