import React, { Component } from 'react'

import withHabit from '../../hocs/with_habit'
import Calendar from './Calendar';

class HabitInfo extends Component {
    render() {
        return (
            this.props.habit ? <div>
                <h2>{this.props.habit.description}</h2>
                <Calendar habit={this.props.habit}/>
            </div> : null
        )
    }
}

export default withHabit(HabitInfo)

