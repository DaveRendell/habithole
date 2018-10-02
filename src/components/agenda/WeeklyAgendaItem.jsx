import React, { Component } from 'react'

import { getHabitStateForWeekCommencing } from '../../helpers/habits'
import { getStartOfCurrentWeek } from '../../helpers/date'
import { increaseWeeklyHabit, decreaseWeeklyHabit } from '../../actions/habits'
import Button from '../Button';
import WeeklyHabitMarker from './WeeklyHabitMarker';

class WeeklyAgendaItem extends Component {
    constructor(props) {
        super(props)
        this.getMarkerStates = this.getMarkerStates.bind(this)
        this.renderMarker = this.renderMarker.bind(this)
    }
    getCurrentHabitStateForWeek() {
        return getHabitStateForWeekCommencing(this.props.habit, getStartOfCurrentWeek())
    }

    getMarkerStates() {
        const target = this.props.habit.number_per_week
        const current = this.getCurrentHabitStateForWeek()

        var states = []
        for (var  i = 0; i < target; i++) {
            if (i < current) {
                states.push({key: i, isDone: true})
            } else {
                states.push({key: i, isDone: false})
            }
        }
        return states
    }

    renderMarker({key, isDone}) {
        return <WeeklyHabitMarker key={key} isDone={isDone} habitKey={this.props.habitKey} />
    }

    render() {
        return (
            <div className="agenda-content-row weekly">
                {this.getMarkerStates().map(this.renderMarker)}
                <span className="weekly-time-left">x days left</span>
            </div>
        )
    }
}

export default WeeklyAgendaItem