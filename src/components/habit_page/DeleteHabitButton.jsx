import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import Modal from 'react-modal'

import { deleteHabit } from '../../actions/habits'
import Button from '../Button';

class DeleteHabitButton extends Component {
    constructor(props) {
        super(props)
        this.state = {
            modalOpen: false
        }

        this.openModal = this.openModal.bind(this)
        this.closeModal = this.closeModal.bind(this)
        this.deleteHabit = this.deleteHabit.bind(this)
    }

    openModal() {
        this.setState({modalOpen: true})
    }

    closeModal() {
        this.setState({modalOpen: false})
    }

    deleteHabit() {
        deleteHabit(this.props.habitKey).then(() => this.props.history.push('/'))
    }

    render() {
        return (
            <div>
                <Button style="danger" text="Delete Habit" action={this.openModal} />
                <Modal
                    style={{
                        content: {
                            'max-width': '400px',
                            'height': '140px',
                            'margin': '25% auto 75% auto'
                            
                        }
                    }}
                    isOpen={this.state.modalOpen}
                    contentLabel="Delete Habit?"
                >
                    <div className="delete-modal-content">
                        <span>Permanently delete habit "{this.props.habit.description}"?</span>
                        <div className="buttons">
                            <Button text='Cancel' action={this.closeModal} />
                            <Button style='danger' text="Delete Habit" action={this.deleteHabit} />
                        </div>
                    </div>
                    
                </Modal>
            </div>
        )
    }
}

export default withRouter(DeleteHabitButton)