import date from 'date-and-time'
import { auth, database } from '../firebase'


function getDatabaseReference() {
    const uid = auth.currentUser.uid
    return database.ref(`habits/${uid}`)
}

export function createHabit(
    description,
    frequency = 'DAILY',
    colour = 'RED'
) {
    getDatabaseReference().push({
        description: description,
        frequency: frequency,
        colour: colour,
        start_date: date.format(new Date(), 'YYYY-MM-DD')
    })
}

export function deleteHabit(habitKey) {
    getDatabaseReference().child(habitKey).remove()
}

export function markAsDone(habitKey) {
    getDatabaseReference()
            .child(habitKey)
            .child('events').push({
                type: 'DONE',
                date: date.format(new Date(), 'YYYY-MM-DD')
            })
}

export function unmarkAsDone(habitKey) {
    const eventsRef = getDatabaseReference()
        .child(habitKey)
        .child('events')

    eventsRef
        .orderByChild('date')
        .equalTo(date.format(new Date(), 'YYYY-MM-DD'))
        .once('value')
        .then(snapshot => {
            snapshot.forEach(event => {
                eventsRef.child(event.key).remove()
            })
        })

}