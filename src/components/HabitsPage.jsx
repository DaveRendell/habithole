import React, { Component } from 'react'

import StartHabitButton from './StartHabitButton'
import HabitList from './HabitList';

class HabitsPage extends Component {
    render() {
        return (
            <div>
                <h2>Habits Page</h2>
                <StartHabitButton />
                <HabitList />
            </div>
        )
    }
}

export default HabitsPage