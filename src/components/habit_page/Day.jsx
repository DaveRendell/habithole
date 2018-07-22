import React, { Component } from 'react'

import { getDayOfMonth, getShortMonthName } from '../../helpers/date'
import { HabitState, getHabitStateOnDay } from '../../helpers/habits'
import { toggleHabitOnDay } from '../../actions/habits'

class Day extends Component {
    getStateClassName() {
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

    getBaseClassName() {
        if (this.props.editMode) {
            return 'toggle day'
        } else {
            return 'day'
        }
    }

    renderMonthName() {
        return <span className="month-name">{getShortMonthName(this.props.day)}</span>
    }

    onClickAction() {
        if (this.props.editMode) {
            toggleHabitOnDay(this.props.habitKey, this.props.day)
        }
    }

    render() {
        return (
            <div 
                className={`${this.getBaseClassName()} ${this.getStateClassName()}`}
                onClick={this.onClickAction.bind(this)}
            >
                <span>
                    {
                        getDayOfMonth(this.props.day) == 1 && false
                            ? this.renderMonthName()
                            : null
                    }
                    {getDayOfMonth(this.props.day)}
                </span>
            </div>
        )
    }
}

export default Day