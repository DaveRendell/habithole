import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class SettingsPageLink extends Component {
    render() {
        return (
            <Link to='/settings/'><span class="settings-icon fa fa-cogs"></span></Link>
        )
    }
}
