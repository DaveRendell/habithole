import React, { Component } from 'react'

import Button from '../Button'

import { deleteHabit } from '../../actions/habits'

class HabitCard extends Component {
    render() {
        return (
            <div>
                <span>{this.props.habit.description} </span>
                <span>{this.props.habit.frequency} </span>
                <span>{this.props.habit.colour}</span>
                <span>
                    <Button 
                        text="Delete" 
                        style='danger' 
                        action={() => deleteHabit(this.props.habitKey)}
                    />
                </span>
            </div>
        )
    }
}

export default HabitCard