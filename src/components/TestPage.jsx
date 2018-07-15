import React, { Component } from 'react';

import Form from './Form'

class TestPage extends Component {
    render() {
        return (
            <div>
                <Form
                    fields={[
                        {
                            type: 'text',
                            id: 'text-field',
                            label: 'Text Field',
                            placeholder: '(Not Optional)',
                            validator: input => input.length > 5,
                            advice: 'Must have lenth 5 or more',
                            required: true
                        },
                        {
                            type: 'text',
                            id: 'text-field-2',
                            textType: 'password',
                            label: 'Another Text Field'
                        },
                        {
                            type: 'select',
                            id: 'select-field',
                            options: [
                                {id: 'option_1', label: 'Option One'},
                                {id: 'option_2', label: 'Option Two'}
                            ],
                            label: 'Select with no default',
                            required: true
                        },
                        {
                            type: 'select',
                            id: 'select-with-default',
                            options: [
                                {id: 'default', label: 'Default'},
                                {id: 'other', label: 'Other'}
                            ],
                            defaultValue: 'default',
                            label: 'Select with default'
                        },
                        {
                            type: 'checkbox',
                            id: 'checkboxes',
                            options: [
                                {id: 'check_option_1', label: 'Option 1'},
                                {id: 'check_option_2', label: 'Option 2'},
                                {id: 'check_option_3', label: 'Option 2'},
                                {id: 'check_option_4', label: 'Option 2'},
                                {id: 'check_option_5', label: 'Option 2'},
                                {id: 'check_option_6', label: 'Option 2'},
                                {id: 'check_option_7', label: 'Option 2'},
                                {id: 'check_option_8', label: 'Option 2'},
                                {id: 'check_option_9', label: 'Option 2'},
                                {id: 'check_option_10', label: 'Option 2'},
                                {id: 'check_option_11', label: 'Option 2'},
                                {id: 'check_option_12', label: 'Option 2'}
                            ],
                            label: 'Checkbox Group',
                            displayIf: state => state['select-with-default'] === 'default'
                        }
                    ]}
                    cancel={() => console.log('CANCEL')}
                    action={state => console.log('SUBMIT', state)}
                />  
            </div>
        );
    }
}

export default TestPage;