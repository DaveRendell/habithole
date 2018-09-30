import React, { Component } from 'react';

import FormModal from '../FormModal'
import {deleteAccount} from '../../actions/user'

class DeleteAccount extends Component {
    constructor(props) {
        super(props)
        this.state = {
            modalOpen: false
        }

        this.openModal = this.openModal.bind(this)
        this.closeModal = this.closeModal.bind(this)
    }

    openModal() {
        this.setState({modalOpen: true})
    }

    closeModal() {
        this.setState({modalOpen: false})
    }

    render() {
        return (
            <div>
                <a onClick={this.openModal}>Delete Account</a>
                <FormModal
                    isOpen={this.state.modalOpen}
                    closeModal={this.closeModal}
                    fields={[
                        {
                            id: 'password',
                            label: 'Password',
                            type: 'text',
                            textType: 'password',
                            required: true
                        },
                        {
                            id: 'confirm',
                            label: 'Permanently delete your account?',
                            type: 'checkbox',
                            options: [
                                {id: 'understood', label: 'I understand this action is not reversible.'}
                            ],
                            validator: input => input.understood,
                            required: true
                        }
                    ]}
                    action={state => deleteAccount(state.password).then(this.closeModal)}
                    label='Delete Account'
                    errorHandlers={[
                        error => {
                            switch(error.code) {
                                case 'auth/wrong-password':
                                    return 'Incorrect Password'
                                default: 
                                    return null
                            }
                        }
                    ]}
                />
            </div>
        );
    }
}

export default DeleteAccount;