import React, { Component } from 'react'
import Day from './Day';

class Week extends Component {
    getSevenDays() {
        var ret = []
        for (var i = 0; i < 7; i++) {
            ret.push(i)
        }
        return ret;
    }

    render() {
        return (
            <div className="week">
                {this.props.week.map(day => 
                    <Day key={day.getTime()} day={day} habit={this.props.habit} />
                )}
            </div>
        )
    }
}

export default Week