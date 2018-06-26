import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import { formatAsString, parseFromString, getPastNDays } from '../../helpers/date'
import { getHabitStateOnDay, HabitState } from '../../helpers/habits'
import HabitDoneToggle from './HabitDoneToggle'
import HabitDonePast from './HabitDonePast'

class AgendaItem extends Component {
    habitDoneOnDay(day) {
        const habit = this.props.habit
        const state = getHabitStateOnDay(habit, day)
        return state == HabitState.DONE
    }

    habitIsActiveOnDay(day) {
        const habit = this.props.habit
        const state = getHabitStateOnDay(habit, day)
        return state != HabitState.NOT_ACTIVE
    }

    render() {
        return (
            <tr>
                <th scope='row'>
                    <Link to={`/habit/${this.props.habitKey}`}>{this.props.habit.description}</Link>
                </th>
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
                        isActive={this.habitIsActiveOnDay(new Date())}
                        habitKey={this.props.habitKey} 
                    />
                </td>
            </tr>
        )
    }
}

export default AgendaItem