import React, { Component } from 'react'

import { auth, database } from '../firebase'
import { createHabit } from '../actions/habits'

import Button from './Button';

class StartHabitForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            description: '',
            frequency: 'DAILY',
            colour: 'RED',
            loading: false
        }

        this.submitForm = this.submitForm.bind(this)
    }

    submitForm(event) {
        event.preventDefault()        
        createHabit(this.state.description)
        this.props.cancel()
    }

    renderFormGroup({id, label, type, placeholder}) {
        return (
            <div className="form-group">
                <label htmlFor={'start-habit-' + id}>{label}</label>
                <input 
                    type={type}
                    className="form-control" 
                    id={'auth-' + id}
                    placeholder={placeholder}
                    value={this.state[id]}
                    onChange={(event) => {
                        const newState = {}
                        newState[id] = event.target.value
                        this.setState(newState)
                    }}
                />
            </div>
        )
    }

    render() {
        return (
            <form onSubmit={this.submitForm}>
            {this.renderFormGroup({
                id: 'description',
                label: 'Description',
                type: 'text',
                placeholder: 'Short description of your new habit'
            })}
            {this.renderFormGroup({
                id: 'frequency',
                label: 'Frequency',
                type: 'text',
                placeholder: 'Enter DAILY, WEEKLY, MONTHLY (I know, fix is TODO)'
            })}
            {this.renderFormGroup({
                id: 'colour',
                label: 'Colour',
                type: 'text',
                placeholder: 'TODO...'
            })}
                <Button text='Cancel' action={this.props.cancel} />
                <Button style='primary' text="Start Habit" action={this.submitForm} disabled={this.state.loading} />
            </form>
        )
    }
}

export default StartHabitForm