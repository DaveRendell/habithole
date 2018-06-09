import React, { Component } from 'react'

import AuthenticationButtons from './AuthenticationButtons'
import Button from './Button'

import { auth } from '../firebase'

class UserInfo extends Component {
    constructor(props) {
        super(props)

        this.state = {
            signedIn: false,
            user: null
        }
    }

    componentDidMount() {
        this.unregisterAuthObserver = 
            auth.onAuthStateChanged(user =>
                this.setState({signedIn: !!user, user})    
            )
    }

    componentWillUnmount() {
        this.unregisterAuthObserver();
    }

    renderSignedIn() {
        return <Button text="Sign Out" action={() => auth.signOut()} />
    }

    renderSignedOut() {
        return <AuthenticationButtons />
    }

    render() {
        return this.state.signedIn
            ? this.renderSignedIn()
            : this.renderSignedOut()
    }
}

export default UserInfo