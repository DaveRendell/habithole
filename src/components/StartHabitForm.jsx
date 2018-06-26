import _ from 'lodash'
import React, { Component } from 'react'

import { auth, database } from '../firebase'
import { createHabit } from '../actions/habits'

import Button from './Button';

const HowOften = {
    EVERY_DAY: 'how_often_every_day',
    WEEKDAYS: 'how_often_weekdays',
    WEEKENDS: 'how_often_weekends',
    OTHER: 'how_often_other'
}

class StartHabitForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            description: '',
            howOften: HowOften.EVERY_DAY,
            customDays: {
                'Monday': false,
                'Tuesday': false,
                'Wednesday': false,
                'Thursday': false,
                'Friday': false,
                'Saturday': false,
                'Sunday': false
            },
            loading: false
        }

        this.submitForm = this.submitForm.bind(this)
    }

    calculateDays() {
        switch(this.state.howOften) {
            case HowOften.EVERY_DAY:
                return {
                    'Monday': true,
                    'Tuesday': true,
                    'Wednesday': true,
                    'Thursday': true,
                    'Friday': true,
                    'Saturday': true,
                    'Sunday': true
                }
            case HowOften.WEEKDAYS:
                return {
                    'Monday': true,
                    'Tuesday': true,
                    'Wednesday': true,
                    'Thursday': true,
                    'Friday': true,
                    'Saturday': false,
                    'Sunday': false
                }
            case HowOften.WEEKENDS:
                return {
                    'Monday': false,
                    'Tuesday': false,
                    'Wednesday': false,
                    'Thursday': false,
                    'Friday': false,
                    'Saturday': true,
                    'Sunday': true
                }
            case HowOften.OTHER:
                return this.state.customDays
        }
    }

    submitForm(event) {
        event.preventDefault()        
        createHabit(this.state.description, this.calculateDays())
        this.props.cancel()
    }

    renderCustomDaysGroup() {
        return _.keys(this.state.customDays).map(dayOfWeek =>
            <span key={dayOfWeek}>
                <label htmlFor={`day-of-week-${dayOfWeek}`}>{dayOfWeek}</label>
                <input 
                    type="checkbox" 
                    value={this.state.customDays[dayOfWeek]} 
                    onChange={(event) => {
                        var newDays = this.state.customDays;
                        newDays[dayOfWeek] = !!event.target.value;
                        this.setState({customDays: newDays})
                    }} 
                />
            </span>
        )
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
                <div className='form-group'>
                    <label htmlFor="new-habit-how-often">How Often: </label>
                    <select id="new-habit-how-often" value={this.state.howOften} onChange={(event) =>
                        this.setState({howOften: event.target.value})
                    }>
                        <option value={HowOften.EVERY_DAY}>Every Day</option>
                        <option value={HowOften.WEEKDAYS}>Every Weekday</option>
                        <option value={HowOften.WEEKENDS}>On Weekends</option>
                        <option value={HowOften.OTHER}>Other...</option>
                    </select>
                    {this.state.howOften}
                </div>
                {
                    this.state.howOften === HowOften.OTHER
                        ? this.renderCustomDaysGroup()
                        : null
                }
                <Button text='Cancel' action={this.props.cancel} />
                <Button style='primary' text="Start Habit" action={this.submitForm} disabled={this.state.loading} />
            </form>
        )
    }
}

export default StartHabitForm