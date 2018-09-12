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

export function updatePassword(oldPassword, newPassword) {
    var user = auth.currentUser
    return auth.signInWithEmailAndPassword (user.email, oldPassword).then(
        () => user.updatePassword(newPassword))
}