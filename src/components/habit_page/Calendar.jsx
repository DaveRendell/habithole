import React, { Component } from 'react'
import Week from './Week';

import { getPastNWeeks } from '../../helpers/date'

class Calendar extends Component {
    getSevenWeeks() {
        console.log(getPastNWeeks(7))
        var ret = []
        for (var i = 0; i < 7; i++) {
            ret.push(i)
        }
        return ret;
    }

    render() {
        return (
            <div className="calendar">
                {getPastNWeeks(7).map(week => 
                    <Week key={week[0].getTime()} week={week} habit={this.props.habit} />
                )}
            </div>
        )
    }
}

export default Calendar