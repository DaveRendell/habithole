import React, { Component } from 'react'
import dateformat from 'dateformat'

import Button from './Button';

class AgendaItem extends Component {
    constructor(props) {
        super(props)

        this.markAsDone = this.markAsDone.bind(this)
    }

    markAsDone() {
        this.props.databaseRef.child(this.props.habitKey).child('events').push({
            type: 'DONE',
            date: dateformat(new Date(), 'yyyy-mm-dd')
        })
    }

    habitDoneToday() {
        var habit = this.props.habit
        var today = dateformat(new Date(), 'yyyy-mm-dd')
        return _.some(habit.events, event => event.date === today)
    }

    renderMarkAsDoneButton() {
        return <Button text="Done" action={this.markAsDone}/>
    }

    renderDone() {
        return <span>Done!</span>
    }

    render() {
        return (
            <tr key={this.props.habitKey}>
                <th scope='row'>{this.props.habit.description}</th>
                <td>{this.habitDoneToday() ? this.renderDone() : this.renderMarkAsDoneButton()}</td>
            </tr>
        )
    }
}

export default AgendaItem