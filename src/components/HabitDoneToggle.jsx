import React, { Component } from 'react'
import date from 'date-and-time'

import { auth, database } from '../firebase'

import '../../theme/habit_done_toggle.scss'

class HabitDoneToggle extends Component {
    constructor(props) {
        super(props)

        this.markAsDone = this.markAsDone.bind(this)
        this.unmarkAsDone = this.unmarkAsDone.bind(this)
    }

    componentDidMount() {
        this.unregisterAuthObserver = auth.onAuthStateChanged( user => {
            if (user) {
                this.databaseRef =  database.ref(`habits/${user.uid}`)
            } else {
                this.databaseRef = null
            }
        })
    }

    componentWillUnmount() {
        this.unregisterAuthObserver()
    }

    markAsDone() {
        this.databaseRef
            .child(this.props.habitKey)
            .child('events').push({
                type: 'DONE',
                date: date.format(new Date(), 'YYYY-MM-DD')
            })
    }

    unmarkAsDone() {
        const eventsRef = this.databaseRef
            .child(this.props.habitKey)
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

    renderDone() {
        return <span 
            className="fa fa-check"
            onClick={this.unmarkAsDone.bind(this)}
        />
    }

    renderNotDone() {
        return <span 
            className="fa fa-dot"
            onClick={this.markAsDone.bind(this)}
        />
    }
    
    render() {
        return this.props.isDone
                ? this.renderDone()
                : this.renderNotDone()
    }
}

export default HabitDoneToggle