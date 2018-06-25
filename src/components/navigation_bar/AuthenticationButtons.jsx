import React, { Component } from 'react'
import Modal from 'react-modal'

import Button from '../Button'
import AuthenticationForm from './AuthenticationForm';

import { auth } from '../../firebase'

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

    getModalContent() {
        switch (this.state.modalType) {
            case SIGN_UP: 
                return <AuthenticationForm action={this.signUpAction} cancel={this.closeModal} text='Sign Up' />
            case SIGN_IN: 
                return <AuthenticationForm action={this.signInAction} cancel={this.closeModal} text='Sign In' />
            default: 
                return ''
        }
    }

    signUpAction(email, password) {
        auth.createUserWithEmailAndPassword(email, password)
            .then(this.closeModal)
    }

    signInAction(email, password) {
        auth.signInWithEmailAndPassword(email, password)
            .then(this.closeModal)
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
                <Modal
                    isOpen={this.state.modalOpen}
                    contentLabel={this.getModalLabel()}
                >
                    {this.getModalContent()}
                </Modal>
            </div>
        )
    }
}

export default AuthenticationButtons