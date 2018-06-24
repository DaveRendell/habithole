import React, { Component } from 'react'
import dateformat from 'dateformat'

import Button from './Button';

class AgendaItem extends Component {
    constructor(props) {
        super(props)

        this.markAsDone = this.markAsDone.bind(this)
    }

    markAsDone() {
        const today = new Date()
        console.log(today)
        this.props.databaseRef.child(this.props.habitKey).child('events').push({
            type: 'DONE',
            date: dateformat(today, 'yyyy-mm-dd')
        })
    }

    render() {
        return (
            <span>{this.props.habit.description} <Button text="Done" action={this.markAsDone}/></span>
        )
    }
}

export default AgendaItem