import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import UserInfo from './UserInfo'

import '../../theme/navigation_bar.scss'

class NavigationBar extends Component {
    render() {
        return (
            <nav className="navigation-bar navbar navbar-light bg-light justify-content-between">
                <Link to="/" className="navbar-brand">Habit Tracker</Link>
                <Link to="/habits" className="nav-link left">Habits</Link>
                <UserInfo />
            </nav>
        )
    }
}

export default NavigationBar