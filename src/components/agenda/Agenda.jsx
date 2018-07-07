import _ from 'lodash'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import withHabits from '../../hocs/with_habits'
import AgendaItem from './AgendaItem'
import { getPastNDays, shorthandFormat } from '../../helpers/date'

import '../../../theme/agenda.scss'

class Agenda extends Component {
    constructor(props) {
        super(props)
    }

    renderHabitHeading(habitKey) {
        const habit = this.props.habits[habitKey]
        return (
            <div className="agenda-heading" key={habitKey}>
                <Link to={`/habit/${habitKey}`}>{habit.description}</Link>
            </div>
        )
    }

    render() {
        return (
            <div className="agenda">
                <div className="agenda-headings">
                    <div className="agenda-heading">
                        <span>Your Habits</span>
                    </div>
                    {
                        _.keys(this.props.habits).map(key =>
                            this.renderHabitHeading(key)
                        )
                    }
                </div>
                <div className="agenda-content-wrapper">
                    <div className="agenda-content">
                        <div className="agenda-content-row">
                            {
                                getPastNDays(6).map(day =>
                                    <div className="agenda-date-header" key={day.getTime()}>
                                        <span>
                                        {shorthandFormat(day)}
                                        </span>
                                    </div>
                                )
                            }
                            <div className="agenda-date-header">
                                <span>Today</span>
                            </div>
                        </div>
                        {
                            _.keys(this.props.habits).map(key =>
                                <AgendaItem 
                                    habit={this.props.habits[key]} 
                                    habitKey={key} 
                                    key={key}
                                />
                            )
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default withHabits(Agenda)