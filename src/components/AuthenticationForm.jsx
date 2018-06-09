import React, { Component } from 'react'
import Button from './Button';

class AuthenticationForm extends Component {
    constructor(props) {
        super(props)

        this.state = {
            email: '',
            password: ''
        }

        this.submitForm = this.submitForm.bind(this)
    }

    submitForm(event) {
        event.preventDefault()
        this.props.action(this.state.email, this.state.password)
    }

    renderFormGroup({id, label, type, placeholder}) {
        return (
            <div className="form-group">
                <label htmlFor={'auth-' + id}>{label}</label>
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
                    id: 'email', 
                    label: 'Email Address', 
                    type: 'email', 
                    placeholder: 'example@mail.com'
                })}
                {this.renderFormGroup({
                    id: 'password', 
                    label: 'Password', 
                    type: 'password'
                })}
                <Button text='Cancel' action={this.props.cancel} />
                <Button style='primary' text={this.props.text} action={this.submitForm} />
            </form>
        )
    }
}

export default AuthenticationForm