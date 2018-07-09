import _ from 'lodash'

import { auth, database } from '../firebase'
import { formatAsString, todaysDateAsString } from '../helpers/date'


function getDatabaseReference() {
    const uid = auth.currentUser.uid
    return database.ref(`habits/${uid}`)
}

export function createHabit(
    description,
    activeDays
) {
    return getDatabaseReference()
        .once('value')
        .then(snapshot => 
            getDatabaseReference().push({
                description: description,
                active_days: activeDays,
                start_date: todaysDateAsString(),
                position: snapshot.numChildren()
            })
        )    
}

function getNextPosition() {
    return getDatabaseReference()
        .once('value')
        .then(snapshot => snapshot.numChildren()).resolve()
}

export function deleteHabit(habitKey) {
    return getDatabaseReference()
        .once('value')
        .then(snapshot => {
            const deletedPosition = snapshot
                .child(habitKey)
                .child('position')
                .val()
            console.log(snapshot.child(habitKey).child('position').val())
            snapshot.forEach(habit => {
                const position = habit.child('position').val()
                if (position > deletedPosition) {
                    console.log('pos', position)
                    getDatabaseReference()
                        .child(habit.key)
                        .child('position')
                        .set(position - 1)
                }
            })
            getDatabaseReference().child(habitKey).remove()
        })
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

export function editDescription(habitKey, newDescription) {
    return getDatabaseReference()
        .child(habitKey)
        .child('description')
        .set(newDescription)
}

export function moveToPosition(habitKey, oldPosition, newPosition) {
    console.log(habitKey, oldPosition, newPosition)
    getDatabaseReference()
        .orderByChild('position')
        .once('value')
        .then(snapshot => {
            snapshot.forEach(habit => {
                if (habit.key != habitKey) {
                    var ret = habit.child('position').val()
                    if (habit.child('position').val() > oldPosition) {
                        ret -= 1
                    }
                    if (habit.child('position').val() >= newPosition) {
                        ret += 1
                    }
                    if (ret != habit.child('position').val()) {
                        getDatabaseReference()
                            .child(habit.key)
                            .child('position')
                            .set(ret)
                    }
                }
            })
        })

        getDatabaseReference()
            .child(habitKey)
            .child('position')
            .set(newPosition > oldPosition ? newPosition - 1 : newPosition)
}