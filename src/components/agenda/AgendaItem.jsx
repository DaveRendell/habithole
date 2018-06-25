import React, { Component } from 'react'

import { formatAsString, parseFromString, getPastNDays } from '../../helpers/date'
import HabitDoneToggle from './HabitDoneToggle'
import HabitDonePast from './HabitDonePast'

class AgendaItem extends Component {
    habitDoneOnDay(day) {
        var habit = this.props.habit
        var dayString = formatAsString(day)
        return _.some(habit.events, event => event.date === dayString)
    }

    habitIsActiveOnDay(day) {
        var habit = this.props.habit
        const startDate = parseFromString(habit.start_date)
        return day.getTime() - startDate.getTime() > 0
    }

    render() {
        return (
            <tr>
                <th scope='row'>{this.props.habit.description}</th>
                {
                    getPastNDays(6).map(day =>
                        <td key={day.getTime()}>
                            <HabitDonePast 
                                isDone={this.habitDoneOnDay(day)}
                                isActive={this.habitIsActiveOnDay(day)}
                            />
                        </td>
                    )
                }
                <td>
                    <HabitDoneToggle 
                        isDone={this.habitDoneOnDay(new Date())}
                        habitKey={this.props.habitKey} 
                    />
                </td>
            </tr>
        )
    }
}

export default AgendaItem