import React, { Component } from 'react'

import UserInfo from './UserInfo'

import '../../theme/navigation_bar.scss'

class NavigationBar extends Component {
    render() {
        return (
            <nav className="navigation-bar navbar navbar-light bg-light justify-content-between">
                <a className="navbar-brand">Habit Tracker</a>
                <UserInfo />
            </nav>
        )
    }
}

export default NavigationBar