import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import UserInfo from './UserInfo'

import '../../../theme/navigation_bar.scss'

class NavigationBar extends Component {
    render() {
        return (
            <div className="nav-bar">
                <div className="nav-bar-content">
                    <div className="nav-bar-left">
                        <Link to="/" className="nav-bar-logo">HabitHole</Link>
                    </div>
                    <div className="nav-bar-right">
                        <UserInfo />
                    </div>
                </div>
            </div>
        )
    }
}

export default NavigationBar