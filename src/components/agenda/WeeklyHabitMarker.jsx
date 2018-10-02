import React, { Component } from 'react';

import { increaseWeeklyHabit, decreaseWeeklyHabit } from '../../actions/habits'
import { getStartOfCurrentWeek } from '../../helpers/date'

class WeeklyHabitMarker extends Component {
    constructor(props) {
        super(props)
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick() {
        if (this.props.isDone) {
            decreaseWeeklyHabit(this.props.habitKey, getStartOfCurrentWeek())
        } else {
            increaseWeeklyHabit(this.props.habitKey, getStartOfCurrentWeek())
        }
    }

    getGlyphClass() {
        if (this.props.isDone) {
            return 'fa fa-check'
        } else {
            return 'fa fa-circle'
        }
    }

    render() {
        return (
            <span
                className={`weekly-toggle ${this.getGlyphClass()}`}
                onClick={this.handleClick}
            />
        );
    }
}

export default WeeklyHabitMarker;