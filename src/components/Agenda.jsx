import _ from 'lodash'
import React, { Component } from 'react'
import dateformat from 'dateformat'

import { auth, database } from '../firebase'
import AgendaItem from './AgendaItem';

class Agenda extends Component {
    constructor(props) {
        super(props)

        this.state = {
            habits: []
        }
    }

    componentDidMount() {
        this.unregisterAuthObserver = auth.onAuthStateChanged( user => {
            if (user) {
                this.databaseRef =  database.ref(`habits/${user.uid}`)
                this.databaseCallback = this.databaseRef.on('value', snap =>
                    this.setState({habits: snap.val()})
                )
            } else {
                this.databaseRef = null
                this.databaseCallback = null
            }
        })
    }

    componentWillUnmount() {
        this.unregisterAuthObserver()
        if (this.databaseRef) {
            this.databaseRef.off('value', this.databaseCallback)
        }
    }

    renderAgendaItem(key, habit) {
        return <li key={key}>
                <AgendaItem 
                    habit={habit}
                    databaseRef={this.databaseRef}
                    habitKey={key}
                />
            </li>
    }

    habitDoneToday(key) {
        var habit = this.state.habits[key]
        var today = dateformat(new Date(), 'yyyy-mm-dd')
        return _.some(habit.events, event => event.date === today)
    }

    render() {
        return (
            <ul>
                {_.keys(this.state.habits).map(key =>
                    this.habitDoneToday(key) ? null : this.renderAgendaItem(key, this.state.habits[key]))}
            </ul>
        )
    }
}

export default Agenda