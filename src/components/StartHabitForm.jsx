import React, { Component } from 'react'

import { auth, database } from '../firebase'

import Button from './Button';

class StartHabitForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            description: '',
            frequency: 'DAILY',
            colour: 'RED',
            loading: false,
            databaseRef: null
        }

        this.submitForm = this.submitForm.bind(this)
    }

    componentDidMount() {
        this.unregisterAuthObserver = auth.onAuthStateChanged(user => {
            if (user) {
                this.setState({
                    databaseRef: database.ref(`habits/${user.uid}`)
                })
            } else {
                this.setState({databaseRef: null})
            }
        })
    }

    componentWillUnmount() {
        this.unregisterAuthObserver()
    }

    submitForm(event) {
        event.preventDefault()
        console.log(`Desc: ${this.state.description}, freq: ${this.state.frequency}, colour: ${this.state.colour}`)
        this.state.databaseRef.push({
            description: this.state.description,
            frequency: this.state.frequency,
            colour: this.state.colour
        })
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
                    onInput={(event) => {
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