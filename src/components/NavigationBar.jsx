import React, { Component } from 'react'

import AuthenticationButtons from './AuthenticationButtons'

import '../../theme/navigation_bar.scss'

class NavigationBar extends Component {
    render() {
        return (
            <nav className="navigation-bar navbar navbar-light bg-light justify-content-between">
                <a className="navbar-brand">Habit Tracker</a>
                <AuthenticationButtons />
            </nav>
        )
    }
}

export default NavigationBar