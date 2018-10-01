import React, { Component } from 'react'

import withHabit from '../../hocs/with_habit'
import Calendar from './Calendar';
import DeleteHabitButton from './DeleteHabitButton';
import HabitTitle from './HabitTitle';

class HabitInfo extends Component {
    render() {
        return (
            this.props.habit ? <div>
                <HabitTitle habit={this.props.habit} habitKey={this.props.habitKey} />
                {this.props.habit['habit_type'] === 'daily' 
                    ? <Calendar habit={this.props.habit} habitKey={this.props.habitKey} />
                    : null}
                <DeleteHabitButton habit={this.props.habit} habitKey={this.props.habitKey} />
            </div> : null
        )
    }
}

export default withHabit(HabitInfo)

