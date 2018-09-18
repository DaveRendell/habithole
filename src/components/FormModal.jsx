import React, { Component } from 'react'
import Modal from 'react-modal'
import Form from './Form';

Modal.setAppElement('#app-container')

export default class FormModal extends Component {
    render() {
        const {
            isOpen,
            closeModal,
            fields,
            action,
            label
        } = this.props

        return (
            <div>
                <Modal
                    isOpen={isOpen}
                    contentLabel={label}
                >
                    <Form
                    fields={fields}
                    action={action}
                    cancel={closeModal}
                />
                </Modal>
            </div>
        )
    }
}
