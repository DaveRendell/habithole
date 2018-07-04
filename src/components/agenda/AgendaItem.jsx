import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import { getPastNDays } from '../../helpers/date'
import { getHabitStateOnDay } from '../../helpers/habits'
import HabitDayMarker from './HabitDayMarker';

class AgendaItem extends Component {
    render() {
        return (
            <tr>
                <th scope='row'>
                    <Link to={`/habit/${this.props.habitKey}`}>{this.props.habit.description}</Link>
                </th>
                {
                    getPastNDays(6).map(day =>
                        <td key={day.getTime()}>
                            <HabitDayMarker 
                                habitState={getHabitStateOnDay(this.props.habit, day)}
                                toggle={false}
                            />
                        </td>
                    )
                }
                <td>
                    <HabitDayMarker 
                        habitKey={this.props.habitKey}
                        habitState={getHabitStateOnDay(this.props.habit, new Date())}
                        toggle={true}
                    />
                </td>
            </tr>
        )
    }
}

export default AgendaItem