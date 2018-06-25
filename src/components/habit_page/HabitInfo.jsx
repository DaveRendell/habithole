import React, { Component } from 'react'

import withHabit from '../../hocs/with_habit'

class HabitInfo extends Component {
    render() {
        return (
            this.props.habit ? <div>
                <h2>{this.props.habit.description}</h2>
            </div> : null
        )
    }
}

export default withHabit(HabitInfo)

