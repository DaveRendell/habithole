import React, { Component } from 'react'

import AuthenticationButtons from './AuthenticationButtons'
import Button from '../Button'

import withUser from '../../hocs/with_user'
import { signOut } from '../../actions/user'
import SettingsPageLink from './SettingsPageLink'

class UserInfo extends Component {
    renderSignedIn() {
        return (
            <div>
                <SettingsPageLink />
                <Button text="Sign Out" action={signOut} />
            </div>
        )
    }

    renderSignedOut() {
        return <AuthenticationButtons />
    }

    render() {
        return this.props.isLoading
            ? null
            : this.props.user
                ? this.renderSignedIn()
                : this.renderSignedOut()
    }
}

export default withUser(UserInfo)