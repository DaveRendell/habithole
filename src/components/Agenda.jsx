import _ from 'lodash'
import React, { Component } from 'react'
import date from 'date-and-time'

import { auth, database } from '../firebase'
import AgendaItem from './AgendaItem';

import '../../theme/agenda.scss'

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
        return <AgendaItem 
                    habit={habit}
                    habitKey={key}
                    key={key}
                />
    }

    render() {
        return (
            <div className="agenda">
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Habit</th>
                            {
                                getPastSixDays().map(day =>
                                    <th scope='col' key={day.getTime()}>{date.format(day, 'ddd D')}</th>
                                )
                            }
                            <th scope="col">Today</th>
                        </tr>
                    </thead>
                    <tbody>
                        {_.keys(this.state.habits).map(key =>
                                this.renderAgendaItem(key, this.state.habits[key]))}
                    </tbody>
                </table>
            </div>
            
        )
    }
}

function getPastSixDays() {
    const today = new Date()
    var ret = []
    for (var i = -6; i < 0; i++) {
        ret.push(date.addDays(today, i))
    }
    return ret
}



export default Agenda