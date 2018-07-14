import React, { Component } from 'react'

import { getPastNDays } from '../../helpers/date'
import { getHabitStateOnDay } from '../../helpers/habits'
import HabitDayMarker from './HabitDayMarker'

class AgendaItem extends Component {
    render() {
        return (
            <div className="agenda-content-row">
                <div className="agenda-day today">
                    <HabitDayMarker 
                        habitKey={this.props.habitKey}
                        habitState={getHabitStateOnDay(this.props.habit, new Date())}
                        toggle={true}
                    />
                </div>
                {
                    getPastNDays(6).reverse().map(day =>
                        <div className="agenda-day" key={day.getTime()}>
                            <HabitDayMarker 
                                habitState={getHabitStateOnDay(this.props.habit, day)}
                                toggle={false}
                            />
                        </div>
                    )
                }
            </div>
        )
    }
}

export default AgendaItem