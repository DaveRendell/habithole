import React, { Component } from 'react'

import withHabit from '../../hocs/with_habit'
import Calendar from './Calendar';
import DeleteHabitButton from './DeleteHabitButton';

class HabitInfo extends Component {
    render() {
        return (
            this.props.habit ? <div>
                <h2>{this.props.habit.description}</h2>
                <Calendar habit={this.props.habit}/>
                <DeleteHabitButton habit={this.props.habit} habitKey={this.props.habitKey} />
            </div> : null
        )
    }
}

export default withHabit(HabitInfo)

