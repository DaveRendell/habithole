import React, { Component } from 'react';

import { createDailyHabit, createWeeklyHabit } from '../actions/habits'

import FormModal from './FormModal'

const HabitType = {
    DAILY: 'daily',
    WEEKLY: 'weekly'
}

const HowOften = {
    EVERY_DAY: 'how_often_every_day',
    WEEKDAYS: 'how_often_weekdays',
    WEEKENDS: 'how_often_weekends',
    OTHER: 'how_often_other'
}

class StartHabitForm extends Component {
    submitForm(state) {
        switch(state.habitType) {
            case HabitType.DAILY:
                return createDailyHabit(
                    state.description,
                    this.getActiveDays(state)    
                ).then(() => this.props.cancel())
            case HabitType.WEEKLY:
                return createWeeklyHabit(
                    state.description,
                    state['number-per-week']
                ).then(() => this.props.cancel())
        }
        
    }

    getActiveDays(state) {
        switch(state['how-often']) {
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
                return state['custom-days']
        }
    }

    render() {
        return (
            <FormModal
                isOpen={this.props.isOpen}
                closeModal={this.props.cancel}
                fields={[
                    {
                        id: 'description',
                        type: 'text',
                        label: 'Description',
                        required: true
                    },
                    {
                        id: 'habitType',
                        type: 'select',
                        label: 'Track this habit Daily or Weekly?',
                        required: true,
                        options: [
                            {id: HabitType.DAILY, label: 'Daily'},
                            {id: HabitType.WEEKLY, label: 'Weekly'}
                        ],
                        defaultValue: HabitType.DAILY
                    },
                    {
                        id: 'how-often',
                        type: 'select',
                        label: 'Active days',
                        options: [
                            {id: HowOften.EVERY_DAY, label: 'Every day'},
                            {id: HowOften.WEEKDAYS, label: 'Every weekday'},
                            {id: HowOften.WEEKENDS, label: 'Every weekend'},
                            {id: HowOften.OTHER, label: 'Other...'},
                        ],
                        defaultValue: HowOften.EVERY_DAY,
                        validator: (input, {habitType}) => habitType == HabitType.WEEKLY || input,
                        displayIf: state => 
                            state['habitType'] === HabitType.DAILY
                    },
                    {
                        id: 'custom-days',
                        type: 'checkbox',
                        label: 'Custom active days',
                        options: [
                            {id: 'Monday', label: 'Monday'},
                            {id: 'Tuesday', label: 'Tuesday'},
                            {id: 'Wednesday', label: 'Wednesday'},
                            {id: 'Thursday', label: 'Thursday'},
                            {id: 'Friday', label: 'Friday'},
                            {id: 'Saturday', label: 'Saturday'},
                            {id: 'Sunday', label: 'Sunday'},
                        ],
                        displayIf: state => 
                            state['how-often'] === HowOften.OTHER 
                            && state['habitType'] === HabitType.DAILY
                    },
                    {
                        id: 'number-per-week',
                        label: 'How many times a week?',
                        type: 'text',
                        textType: 'number',
                        displayIf: ({habitType}) => habitType === HabitType.WEEKLY,
                        validator: (input, {habitType}) => habitType === HabitType.DAILY || input,
                        defaultValue: 1
                    }
                ]}
                action={this.submitForm.bind(this)}
                label='Start New Habit'
            />
        );
    }
}

export default StartHabitForm;