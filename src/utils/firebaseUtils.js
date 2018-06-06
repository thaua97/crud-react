import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyC60sroSnAWEYm9zMKi6MtyBBzacJhliyc",
    authDomain: "start-ups-now.firebaseapp.com",
    databaseURL: "https://start-ups-now.firebaseio.com",
    projectId: "start-ups-now",
    storageBucket: "start-ups-now.appspot.com",
    messagingSenderId: "632151546422"
}

export const firebaseImpl = firebase.initializeApp(config);
export const firebaseDatabase = firebase.database();