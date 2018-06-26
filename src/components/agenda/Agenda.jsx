import _ from 'lodash'
import React, { Component } from 'react'

import { getPastNDays, shorthandFormat } from '../../helpers/date'
import withHabits from '../../hocs/with_habits'
import AgendaItem from './AgendaItem';
import StartHabitButton from '../StartHabitButton'

import '../../../theme/agenda.scss'

class Agenda extends Component {
    renderAgendaItem(key, habit) {
        return <AgendaItem 
                    habit={habit}
                    habitKey={key}
                    key={key}
                />
    }

    render() {
        return (
            <div className="agenda">
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Habit</th>
                            {
                                getPastNDays(6).map(day =>
                                    <th scope='col' key={day.getTime()}>{shorthandFormat(day)}</th>
                                )
                            }
                            <th scope="col">Today</th>
                        </tr>
                    </thead>
                    <tbody>
                        {_.keys(this.props.habits).map(key =>
                                this.renderAgendaItem(key, this.props.habits[key]))}
                        <tr>
                            <td><StartHabitButton /></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            
        )
    }
}

export default withHabits(Agenda)