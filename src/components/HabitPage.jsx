import React, { Component } from 'react'
import HabitInfo from './habit_page/HabitInfo';

import '../../theme/habit_page.scss'

class HabitPage extends Component {
    render() {
        return (
            <div className="habit-page">
                <HabitInfo habitKey={this.props.match.params.id} />
            </div>
        )
    }
}

export default HabitPage