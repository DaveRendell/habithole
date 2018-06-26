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
                    <Day 
                        key={day.getTime()} 
                        day={day} 
                        habit={this.props.habit} 
                        habitKey={this.props.habitKey}
                        editMode={this.props.editMode}
                    />
                )}
            </div>
        )
    }
}

export default Week