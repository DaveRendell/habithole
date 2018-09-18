import React, { Component } from 'react';

import { createHabit } from '../actions/habits'

import FormModal from './FormModal'

const HowOften = {
    EVERY_DAY: 'how_often_every_day',
    WEEKDAYS: 'how_often_weekdays',
    WEEKENDS: 'how_often_weekends',
    OTHER: 'how_often_other'
}

class StartHabitForm extends Component {
    submitForm(state) {
        createHabit(
            state.description,
            this.getActiveDays(state)    
        )
        this.props.cancel()
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
                        id: 'how-often',
                        type: 'select',
                        label: 'Active days',
                        required: true,
                        options: [
                            {id: HowOften.EVERY_DAY, label: 'Every day'},
                            {id: HowOften.WEEKDAYS, label: 'Every weekday'},
                            {id: HowOften.WEEKENDS, label: 'Every weekend'},
                            {id: HowOften.OTHER, label: 'Other...'},
                        ],
                        defaultValue: HowOften.EVERY_DAY
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
                        displayIf: state => state['how-often'] === HowOften.OTHER
                    }
                ]}
                action={this.submitForm.bind(this)}
                label='Start New Habit'
            />
        );
    }
}

export default StartHabitForm;