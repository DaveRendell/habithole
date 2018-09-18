import React, { Component } from 'react'
import Modal from 'react-modal'

import Button from '../Button'
import Form from '../Form'

import { signIn, signUp } from '../../actions/user'
import FormModal from '../FormModal';

const SIGN_IN = 'sign_in'
const SIGN_UP = 'sign_up'

Modal.setAppElement('#app-container')

class AuthenticationButtons extends Component {
    constructor(props) {
        super(props)

        this.state = {
            modalOpen: false,
            modalType: null
        }

        this.openSignInModal = this.openSignInModal.bind(this)
        this.openSignUpModal = this.openSignUpModal.bind(this)
        this.signUpAction = this.signUpAction.bind(this)
        this.signInAction = this.signInAction.bind(this)
        this.closeModal = this.closeModal.bind(this)
    }

    getModalLabel() {
        switch (this.state.modalType) {
            case SIGN_UP: return 'Sign Up'
            case SIGN_IN: return 'Sign In'
            default: return ''
        }
    }

    getFormFields() {
        switch (this.state.modalType) {
            case SIGN_UP: 
                return [
                    {
                        id: 'email',
                        label: 'Email',
                        type: 'text',
                        textType: 'email',
                        validator: input => input.search('@') > -1,
                        advice: 'Please enter a valid email address',
                        required: true
                    },
                    {
                        id: 'password',
                        label: 'Password',
                        type: 'text',
                        textType: 'password',
                        required: true
                    },
                    {
                        id: 'password_repeat',
                        label: 'Password (Again)',
                        type: 'text',
                        textType: 'password',
                        validator: (input, {password}) => input === password,
                        advice: 'Passwords must match',
                        required: true
                    }
                ]
            case SIGN_IN: 
                return [
                    {
                        id: 'email',
                        label: 'Email',
                        type: 'text',
                        textType: 'email',
                        validator: input => input.search('@') > -1,
                        advice: 'Please enter a valid email address',
                        required: true
                    },
                    {
                        id: 'password',
                        label: 'Password',
                        type: 'text',
                        textType: 'password',
                        required: true
                    }
                ]
            default: 
                return []
        } 
    }

    signUpAction({email, password}) {
        signUp(email, password).then(this.closeModal)
    }

    signInAction({email, password}) {
        signIn(email, password).then(this.closeModal)
    }    
    
    getAction() {
        switch (this.state.modalType) {
            case SIGN_UP:
                return this.signUpAction
            case SIGN_IN:
                return this.signInAction
        }
    }

    closeModal() {
        this.setState({
            modalOpen: false,
        })
    }

    openSignInModal() {
        this.setState({
            modalOpen: true,
            modalType: SIGN_IN
        })
    }

    openSignUpModal() {
        this.setState({
            modalOpen: true,
            modalType: SIGN_UP
        })
    }

    render() {
        return (
            <div className="form-inline">
                <Button style='primary' text='Sign In' action={this.openSignInModal} />
                <Button style='success' text='Sign Up' action={this.openSignUpModal} />
                <FormModal
                    isOpen={this.state.modalOpen}
                    closeModal={this.closeModal}
                    fields={this.getFormFields()}
                    action={this.getAction()}
                    label={this.getModalLabel()}
                />
            </div>
        )
    }
}

export default AuthenticationButtons