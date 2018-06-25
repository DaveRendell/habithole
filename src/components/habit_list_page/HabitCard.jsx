import React, { Component } from 'react'

import Button from '../Button'

class HabitCard extends Component {
    constructor(props) {
        super(props)

        this.deleteHabit = this.deleteHabit.bind(this)
    }

    deleteHabit() {
        this.props.databaseRef.child(this.props.habitKey).remove()
    }

    render() {
        return (
            <div>
                <span>{this.props.habit.description} </span>
                <span>{this.props.habit.frequency} </span>
                <span>{this.props.habit.colour}</span>
                <span><Button text="Delete" style='danger' action={this.deleteHabit}/></span>
            </div>
        )
    }
}

export default HabitCard