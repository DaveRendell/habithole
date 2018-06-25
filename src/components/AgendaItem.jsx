import React, { Component } from 'react'
import date from 'date-and-time'

import HabitDoneToggle from './HabitDoneToggle'
import HabitDonePast from './HabitDonePast'

class AgendaItem extends Component {
    habitDoneOnDay(day) {
        var habit = this.props.habit
        var dayString = date.format(day, 'YYYY-MM-DD')
        return _.some(habit.events, event => event.date === dayString)
    }

    habitIsActiveOnDay(day) {
        var habit = this.props.habit
        const startDate = date.parse(habit.start_date, 'YYYY-MM-DD')
        return date.subtract(day, startDate).toHours() > 0
    }

    render() {
        return (
            <tr>
                <th scope='row'>{this.props.habit.description}</th>
                {
                    getPastSixDays().map(day =>
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

function getPastSixDays() {
    const today = new Date()
    var ret = []
    for (var i = -6; i < 0; i++) {
        ret.push(date.addDays(today, i))
    }
    return ret
}

export default AgendaItem