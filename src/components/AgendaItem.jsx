import React, { Component } from 'react'
import dateformat from 'dateformat'

import HabitDoneToggle from './HabitDoneToggle';

class AgendaItem extends Component {
    habitDoneToday() {
        var habit = this.props.habit
        var today = dateformat(new Date(), 'yyyy-mm-dd')
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