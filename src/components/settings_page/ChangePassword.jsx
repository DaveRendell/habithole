import React, { Component } from 'react'
import Modal from 'react-modal'

import Form from '../Form';
import {updatePassword} from '../../actions/user'

Modal.setAppElement('#app-container')

export default class ChangePassword extends Component {
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
                <a onClick={this.openModal}>Change Password</a>
                <Modal
                    isOpen={this.state.modalOpen}
                    contentLabel='Change Password'
                >
                    <Form
                    fields={[
                        {
                            id: 'oldPassword',
                            label: 'Old Password',
                            type: 'text',
                            textType: 'password',
                            required: true
                        },
                        {
                            id: 'newPassword',
                            label: 'New Password',
                            type: 'text',
                            textType: 'password',
                            required: true
                        }
                    ]}
                    action={state => updatePassword(state.oldPassword, state.newPassword).then(this.closeModal)}
                    cancel={this.closeModal}
                />
                </Modal>
            </div>
        )
    }
}
