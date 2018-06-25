import _ from 'lodash'
import React, { Component } from 'react'

import withHabits from '../../hocs/with_habits'
import HabitCard from './HabitCard';

class HabitList extends Component {
    render() {
        return (
            <ul>
                {_.keys(this.props.habits).map(key =>
                    <li key={key}><HabitCard habit={this.props.habits[key]} habitKey={key} /></li>)}
            </ul>
        )
    }
}

export default withHabits(HabitList)