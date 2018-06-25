import { auth } from '../firebase'

export function signOut() {
    auth.signOut()
}

export function signIn(email, password) {
    return auth.signInWithEmailAndPassword(email, password)
}

export function signUp(email, password) {
    return auth.createUserWithEmailAndPassword(email, password)
}