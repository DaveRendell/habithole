import React, { Component } from 'react'

import { editDescription } from '../../actions/habits'
import Button from '../Button';

class HabitTitle extends Component {
    constructor(props) {
        super(props)
        this.state = {
            editMode: false,
            value: this.props.habit.description
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    getButtonText() {
        return this.state.editMode
            ? "Edit"
            : "Done"
    }

    handleChange(event) {
        this.setState({value: event.target.value})
    }

    handleSubmit() {
        editDescription(this.props.habitKey, this.state.value)
            .then(() => this.setState({editMode: false}))
        
    }

    renderEditMode() {
        return (
            <form onSubmit={this.handleSubmit}>
                <input
                    type="text"
                    value={this.state.value}
                    onChange={this.handleChange}
                />
                <Button text="Done" action={this.handleSubmit} />
            </form>
        )
    }

    renderStandard() {
        return (
            <div>
                <h2>{this.props.habit.description}</h2>
                <Button text='Edit' action={() => this.setState({editMode: true})} />
            </div>
        )
    }

    render() {
        return (
            <div className='habit-title'>
                {
                    this.state.editMode
                        ? this.renderEditMode()
                        : this.renderStandard()
                }
            </div>
        )
    }
}

export default HabitTitle