import React, { Component } from 'react'
import { HabitState } from '../../helpers/habits';

import { toggleHabitOnDay } from '../../actions/habits'

class HabitDayMarker extends Component {
    getGlyphClass() {
        const habitState = this.props.habitState
        switch(habitState) {
            case HabitState.DONE:
                return 'fa fa-check';
            case HabitState.NOT_DONE:
                return 'fa fa-remove';
            case HabitState.TODO_TODAY:
                return 'fa fa-circle';
            case HabitState.NOT_ACTIVE:
                return 'fa fa-minus';
        }
    }

    getToggleClass() {
        return this.props.toggle ? 'toggle' : ''
    }

    render() {
        return this.props.toggle 
            ? <span
                className={`${this.getToggleClass()} ${this.getGlyphClass()}`}
                onClick={() => toggleHabitOnDay(this.props.habitKey, new Date())}
            />
            : <span
                className={`${this.getToggleClass()} ${this.getGlyphClass()}`}
            />
    }
}

export default HabitDayMarker