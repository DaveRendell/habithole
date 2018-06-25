import React, { Component } from 'react'

import { getDayOfMonth } from '../../helpers/date'
import { HabitState, getHabitStateOnDay } from '../../helpers/habits'

class Day extends Component {
    getClassName() {
        const state = getHabitStateOnDay(this.props.habit, this.props.day)
        switch(state) {
            case HabitState.DONE:
                return 'done'
            case HabitState.NOT_DONE:
                return 'not-done'
            default:
                return 'not-active'
        }
    }

    render() {
        return (
            <div className={`day ${this.getClassName()}`}>{getDayOfMonth(this.props.day)}</div>
        )
    }
}

export default Day