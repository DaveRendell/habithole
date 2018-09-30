import React, { Component } from 'react'

import Form from './Form';
import {updatePassword} from '../actions/user'

import '../../theme/settings_page.scss'
import ChangePassword from './settings_page/ChangePassword';
import DeleteAccount from './settings_page/DeleteAccount';

export default class SettingsPage extends Component {
    render() {
        return (
            <div className="settings-page">
                <h1>Settings Page</h1>
                <h2>Your Account</h2>
                <ChangePassword/>
                <DeleteAccount />
            </div>
        )
    }
}
