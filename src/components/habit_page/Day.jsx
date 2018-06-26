import React, { Component } from 'react'

import { getDayOfMonth, getShortMonthName } from '../../helpers/date'
import { HabitState, getHabitStateOnDay } from '../../helpers/habits'

class Day extends Component {
    getClassName() {
        const state = getHabitStateOnDay(this.props.habit, this.props.day)
        switch(state) {
            case HabitState.DONE:
                return 'done'
            case HabitState.NOT_DONE:
                return 'not-done'
            case HabitState.TODO_TODAY:
                return 'todo-today'
            default:
                return 'not-active'
        }
    }

    renderMonthName() {
        return <span className="month-name">{getShortMonthName(this.props.day)}</span>
    }

    render() {
        return (
            <div className={`day ${this.getClassName()}`}>
                {
                    getDayOfMonth(this.props.day) == 1
                        ? this.renderMonthName()
                        : null
                }
                {getDayOfMonth(this.props.day)}
            </div>
        )
    }
}

export default Day