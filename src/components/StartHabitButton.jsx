import React, { Component } from 'react'
import Modal from 'react-modal'

import Button from './Button'
import StartHabitForm from './StartHabitForm';

class StartHabitButton extends Component {
    constructor(props) {
        super(props)

        this.state = {
            isOpen: false
        }

        this.openModal = this.openModal.bind(this)
        this.closeModal = this.closeModal.bind(this)
    }

    openModal() {
        this.setState({isOpen: true})
    }

    closeModal() {
        this.setState({isOpen: false})
    }

    render() {
        return (
            <div>
                <Button text='Start New Habit' action={this.openModal} />
                <Modal
                    isOpen={this.state.isOpen}
                    contentLabel="Start Habit"
                >
                    <StartHabitForm cancel={this.closeModal}/>
                </Modal>
            </div>
        )
    }
}

export default StartHabitButton