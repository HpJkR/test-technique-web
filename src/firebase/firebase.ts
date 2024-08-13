import firebase from 'firebase/compat/app';
import 'firebase/compat/functions';
import 'firebase/compat/auth';
import 'firebase/compat/database';
import 'firebase/compat/storage';

const config = {
  apiKey: 'AIzaSyAIId2ByN9c0RX9_R71EbJJoV-lB1RDADc',
  authDomain: 'test-technique-beeldi.firebaseapp.com',
  databaseURL: 'https://test-technique-beeldi.firebaseio.com',
  projectId: 'test-technique-beeldi',
  storageBucket: 'test-technique-beeldi.appspot.com',
  messagingSenderId: '937748581892',
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

const auth = firebase.auth();
const functions = firebase.functions();
const database = firebase.database();
const storage = firebase.storage();

export { firebase, auth, functions, database, storage };
