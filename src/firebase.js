import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

var config = {
    apiKey: "AIzaSyCTNOjgShckaJwgF3z3NDuIkV4xldpWLNU",
    authDomain: "habit-tracker-176c2.firebaseapp.com",
    databaseURL: "https://habit-tracker-176c2.firebaseio.com",
    projectId: "habit-tracker-176c2",
    storageBucket: "habit-tracker-176c2.appspot.com",
    messagingSenderId: "259111479884"
}

const app = firebase.initializeApp(config)
const auth = firebase.auth();
const database = firebase.database();

export { auth, database }
