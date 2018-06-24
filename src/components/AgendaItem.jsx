import React, { Component } from 'react'
import date from 'date-and-time'

import HabitDoneToggle from './HabitDoneToggle';

class AgendaItem extends Component {
    habitDoneToday() {
        var habit = this.props.habit
        var today = date.format(new Date(), 'YYYY-MM-DD')
        return _.some(habit.events, event => event.date === today)
    }

    render() {
        return (
            <tr>
                <th scope='row'>{this.props.habit.description}</th>
                <td>
                    <HabitDoneToggle 
                        isDone={this.habitDoneToday()}
                        habitKey={this.props.habitKey} 
                    />
                </td>
            </tr>
        )
    }
}

export default AgendaItem