import _ from 'lodash'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import withHabits from '../../hocs/with_habits'
import DailyAgendaItem from './DailyAgendaItem'

import { getPastNDays, shorthandFormat } from '../../helpers/date'
import { moveToPosition } from '../../actions/habits'
import StartHabitButton from '../StartHabitButton'

import '../../../theme/agenda.scss'
import WeeklyAgendaItem from './WeeklyAgendaItem';

class Agenda extends Component {
    constructor(props) {
        super(props)

        this.state = {
            draggedEventKey: null,
            draggedEventPosition: null,
            currentDragTarget: null
        }

        this.onDragOver = this.onDragOver.bind(this)
        this.onDrop = this.onDrop.bind(this)
        this.onDragStart = this.onDragStart.bind(this)
        this.renderAgendaRow = this.renderAgendaRow.bind(this)
    }

    onDragOver(event, targetKey) {
        event.preventDefault()

        this.setState({
            currentDragTarget: targetKey
        })
    }

    onDrop(event, targetKey) {
        const targetPosition = targetKey === 'last'
            ? _.keys(this.props.habits).length
            : this.props.habits[targetKey].position
        this.setState({
            draggedEventKey: null,
            draggedEventPosition: null,
            currentDragTarget: null
        })
        moveToPosition(
            this.state.draggedEventKey, 
            this.state.draggedEventPosition, 
            targetPosition
        )
    }

    onDragStart(event, key, oldPosition) {
        console.log('drag start', key, oldPosition)
        this.setState({
            draggedEventKey: key,
            draggedEventPosition: oldPosition
        })
    }

    renderHabitHeading(habitKey) {
        const habit = this.props.habits[habitKey]
        return (
            <div
                className="agenda-heading" 
                key={habitKey}
                onDragOver={e => this.onDragOver(e, habitKey)}
                onDrop={e => this.onDrop(e, habitKey)}
            >
                {
                    this.state.currentDragTarget == habitKey
                        ? <span className="drop-indicator fa fa-play"/>
                        : null
                }
                <span 
                    className="grip fa fa-bars" 
                    draggable 
                    onDragStart={e => 
                        this.onDragStart(
                            e, 
                            habitKey, 
                            this.props.habits[habitKey].position)
                        } 
                />
                <Link to={`/habit/${habitKey}`}>{habit.description}</Link>
            </div>
        )
    }

    sortedHabits() {
        return _.keys(this.props.habits).sort((a, b) => this.props.habits[a].position > this.props.habits[b].position)
    }

    renderAgendaRow(key) {
        const habit = this.props.habits[key]
        if (habit['habit_type'] == 'daily') {
            return <DailyAgendaItem 
                habit={this.props.habits[key]} 
                habitKey={key} 
                key={key}
            />
        }
        if (habit['habit_type'] == 'weekly') {
            return <WeeklyAgendaItem
                habit={this.props.habits[key]}
                habitKey={key} 
                key={key}
            />
        }
        
    }

    render() {
        return (
            <div className="agenda">
                <div className="agenda-headings">
                    <div className="agenda-heading">
                    </div>
                    {
                        this.sortedHabits().map(key =>
                            this.renderHabitHeading(key)
                        )
                    }
                    <div 
                        className="agenda-heading"
                        onDragOver={e => this.onDragOver(e, 'last')}
                        onDrop={e => this.onDrop(e, 'last')}
                    >
                        {this.state.currentDragTarget == 'last'
                        ? <span className="drop-indicator fa fa-play"/>
                        : null}
                        <StartHabitButton />
                    </div>
                </div>
                <div className="agenda-content-wrapper">
                    <div className="agenda-content">
                        <div className="agenda-content-row">
                            <div className="agenda-date-header">
                                <span>Today</span>
                            </div>
                            {
                                getPastNDays(6).reverse().map(day =>
                                    <div className="agenda-date-header" key={day.getTime()}>
                                        <span>
                                        {shorthandFormat(day)}
                                        </span>
                                    </div>
                                )
                            }
                        </div>
                        {
                            this.sortedHabits().map(this.renderAgendaRow)
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default withHabits(Agenda)