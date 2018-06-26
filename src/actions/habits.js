import { auth, database } from '../firebase'

import { todaysDateAsString } from '../helpers/date'


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
        start_date: todaysDateAsString()
    })
}

export function deleteHabit(habitKey) {
    return getDatabaseReference().child(habitKey).remove()
}

export function markAsDone(habitKey) {
    getDatabaseReference()
            .child(habitKey)
            .child('events').push({
                type: 'DONE',
                date: todaysDateAsString()
            })
}

export function unmarkAsDone(habitKey) {
    const eventsRef = getDatabaseReference()
        .child(habitKey)
        .child('events')

    eventsRef
        .orderByChild('date')
        .equalTo(todaysDateAsString())
        .once('value')
        .then(snapshot => {
            snapshot.forEach(event => {
                eventsRef.child(event.key).remove()
            })
        })

}