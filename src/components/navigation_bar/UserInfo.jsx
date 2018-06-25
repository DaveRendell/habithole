import React, { Component } from 'react'

import AuthenticationButtons from './AuthenticationButtons'
import Button from '../Button'

import withUser from '../../hocs/with_user'
import { signOut } from '../../actions/user'

class UserInfo extends Component {
    renderSignedIn() {
        return <Button text="Sign Out" action={signOut} />
    }

    renderSignedOut() {
        return <AuthenticationButtons />
    }

    render() {
        return this.props.user
            ? this.renderSignedIn()
            : this.renderSignedOut()
    }
}

export default withUser(UserInfo)