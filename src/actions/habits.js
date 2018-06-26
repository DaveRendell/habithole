import _ from 'lodash'

import { auth, database } from '../firebase'
import { formatAsString, todaysDateAsString } from '../helpers/date'


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

export function toggleHabitOnDay(habitKey, day) {
    getDatabaseReference()
        .child(habitKey)
        .once('value')
        .then(snapshot => {
            const habit = snapshot.val()
            if (_.some(habit.events, event => event.date === formatAsString(day))) {
                unmarkAsDone(habitKey, day)
            } else {
                markAsDone(habitKey, day)
            }
        })
}

export function markAsDone(habitKey, day = new Date()) {
    getDatabaseReference()
            .child(habitKey)
            .child('events').push({
                type: 'DONE',
                date: formatAsString(day)
            })
}

export function unmarkAsDone(habitKey, day = new Date()) {
    const eventsRef = getDatabaseReference()
        .child(habitKey)
        .child('events')

    eventsRef
        .orderByChild('date')
        .equalTo(formatAsString(day))
        .once('value')
        .then(snapshot => {
            snapshot.forEach(event => {
                eventsRef.child(event.key).remove()
            })
        })

}