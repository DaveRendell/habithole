import React, { Component } from 'react'
import Week from './Week';

import { getPastNWeeks } from '../../helpers/date'
import Button from '../Button';

class Calendar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            editMode: false
        }
    }

    getButtonText() {
        return this.state.editMode
            ? 'Done'
            : 'Edit Habit History'
    }

    render() {
        return (
            <div>
                <div className="calendar">
                    {getPastNWeeks(7).map(week => 
                        <Week 
                            key={week[0].getTime()} 
                            week={week} 
                            habit={this.props.habit}
                            habitKey={this.props.habitKey}
                            editMode={this.state.editMode}
                        />
                    )}
                </div>
                {
                    this.state.editMode
                        ? <span>Click above to edit habit history</span>
                        : null
                }
                <Button 
                    text={this.getButtonText()}
                    action={() => this.setState({editMode: !this.state.editMode})}
                />
            </div>
            
        )
    }
}

export default Calendar