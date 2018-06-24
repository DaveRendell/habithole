import React, { Component } from 'react'

class HabitDonePast extends Component {
    renderDone() {
        return <span 
            className="fa fa-check"
        />
    }

    renderNotDone() {
        return <span 
            className="fa fa-remove"
        />
    }

    renderNotActive() {
        return <span 
            className="fa fa-minus"
        />
    }
    
    render() {
        return this.props.isDone
            ? this.renderDone()
            : this.props.isActive
                ? this.renderNotDone()
                : this.renderNotActive()
    }
}

export default HabitDonePast