import _ from 'lodash'
import React, { Component } from 'react';

import Button from './Button'

import '../../theme/form.scss'

class Form extends Component {
    constructor(props) {
        super(props)

        this.state = {}
        this.props.fields.map( field => {
            if (field.type === 'checkbox') {
                this.state[field.id] = {
                    value: {}
                }
                _.forEach(field.options, option => {
                    this.state[field.id].value[option.id] = false
                })
            } else {
                this.state[field.id] = {
                    value: field.defaultValue || "",
                    touched: false
                }
            }
        })

        this.submitForm = this.submitForm.bind(this)
    }

    getValue(id) {
        return this.state[id].value
    }

    setValue(id, value) {
        const newState = {}
        newState[id] = this.state[id]
        newState[id].value = value;
        this.setState(newState)
    }

    isTouched(id) {
        return this.state[id].touched
    }

    setAsTouched(id) {
        const newState = {}
        newState[id] = this.state[id]
        newState[id].touched = true;
        this.setState(newState)
    }

    getFormState() {
        var formState = {}
        this.props.fields.forEach(field => {
            formState[field.id] = this.getValue(field.id)
        })
        return formState
    }

    isValidState() {
        var isValid = true;
        this.props.fields.forEach(field =>  {
            if (field.validator 
                && !field.validator(this.getValue(field.id))) {
                    isValid = false;
            }
        })
        return isValid
    }

    submitForm(event) {
        if (event) event.preventDefault()
        const formState = this.getFormState()
        return this.props.action(formState)
    }

    renderTextInput({
        id, label, textType, placeholder, required,
        validator, advice
    }) {
        const isInvalid = this.isTouched(id) 
            && validator 
            && !validator(this.getValue(id))

        const errorClass = isInvalid || (this.isTouched(id) && required && this.getValue(id) === '')
            ? 'error'
            : ''

        return (
            <div key={id} className="text-input-group">
                <label htmlFor={`form-input-${id}`}>
                    {label}
                </label>
                <input
                    className={errorClass}
                    type={textType || "text"}
                    id={`form-input-${id}`}
                    placeholder={placeholder}
                    value={this.getValue(id)}
                    onChange={(event) => {
                        this.setValue(id, event.target.value)
                    }}
                    onBlur={(event) => {
                        this.setAsTouched(id)
                    }}
                />
                {
                    this.isTouched(id) && required && this.getValue(id) === ''
                        ? <span className="error-message">Please enter a value.</span>
                        : isInvalid 
                            ? <span className="error-message">
                                {advice || 'Invalid Input'}
                            </span>
                            : null
                }
            </div>
        )
    }

    renderSelectInput({
        id, options, defaultValue, label, required
    }) {
        const inErrorState = required && this.isTouched(id) && !this.getValue(id)
        const errorClass = inErrorState ? 'error' : ''

        return (
            <div className="select-input-group" key={id}>
                <label htmlFor={`form-input-${id}`}>
                    {label}
                </label>
                <div className="select-wrapper">
                    <select
                        id={`form-input-${id}`}
                        value={this.getValue(id)}
                        className={errorClass}
                        onChange={event => 
                            this.setValue(id, event.target.value)
                        }
                        onBlur={() => this.setAsTouched(id)}
                    >
                        {
                            defaultValue
                                ? null
                                : <option id={null}></option>
                        }
                        {
                            options.map(({id, label}) =>
                                <option value={id} key={id}>
                                    {label}
                                </option>
                            )
                        }
                    </select>
                </div>
                {
                    inErrorState
                        ? <span className="error-message">Please select an option.</span>
                        : null
                }
            </div>
        )
    }

    renderCheckboxGroup({
        id, options, label
    }) {
        const values = this.getValue(id)
        return (
            <div className="checkbox-group" key={id}>
                <label className="group-label">
                    {label}
                </label>
                <div className="check-boxes">
                    {
                        options.map( option =>
                            <div className="check-box" key={option.id}>
                                <input
                                    key={option.id}
                                    id={`option-${option.id}`}
                                    type='checkbox'
                                    value={values[option.id]}
                                    onChange={event => {
                                            var newValue = this.getValue(id)
                                            newValue[option.id] = !!event.target.value
                                            this.setValue(id, newValue)
                                        }
                                    }
                                />
                                <label
                                    htmlFor={`option-${option.id}`}
                                >
                                    {option.label}
                                </label>
                            </div>
                        )
                    }
                </div>
            </div>
        )
    }

    render() {
        return (
            <form 
                className="form" 
                onSubmit={this.submitForm}
                ref={formRef => this.formRef = formRef}
            >
                <div className="form-content">
                    {
                        this.props.fields.map( field => {
                            if (!field.displayIf || field.displayIf(this.getFormState())) {
                                if (field.type === 'text') {
                                    return this.renderTextInput(field)
                                }
                                if (field.type === 'select') {
                                    return this.renderSelectInput(field)
                                }
                                if (field.type === 'checkbox') {
                                    return this.renderCheckboxGroup(field)
                                }
                            }
                        })
                    }
                    <input type="submit" className="hidden-submit-input"/>
                </div>
                <div className="form-footer">
                    <Button 
                        text="Cancel"
                        action={this.props.cancel}
                    />
                    <Button 
                        text="Submit"
                        loadingText="Loading..."
                        action={this.submitForm}
                        disabled={!this.isValidState()}
                    />
                </div>
            </form>
        );
    }
}

export default Form;