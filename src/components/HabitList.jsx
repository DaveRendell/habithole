import _ from 'lodash'
import React, { Component } from 'react'

import { auth, database } from '../firebase'
import HabitCard from './HabitCard';

class HabitList extends Component {
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

    render() {
        return (
            <ul>
                {_.keys(this.state.habits).map(key =>
                    <li key={key}><HabitCard habit={this.state.habits[key]} databaseRef={this.databaseRef} habitKey={key} /></li>)}
            </ul>
        )
    }
}

export default HabitList