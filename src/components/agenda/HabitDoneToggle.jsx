import React, { Component } from 'react'

import { markAsDone, unmarkAsDone } from '../../actions/habits'

class HabitDoneToggle extends Component {
    renderDone() {
        return <span 
            className="toggle fa fa-check"
            onClick={() => unmarkAsDone(this.props.habitKey)}
        />
    }

    renderNotDone() {
        return <span 
            className="toggle fa fa-dot"
            onClick={() => markAsDone(this.props.habitKey)}
        />
    }
    
    render() {
        return this.props.isDone
                ? this.renderDone()
                : this.renderNotDone()
    }
}

export default HabitDoneToggle