import React, { Component } from 'react'

import Button from './Button'

class AuthenticationButtons extends Component {
    render() {
        return (
            <div className="form-inline">
                <Button style='primary' text='Sign In' />
                <Button style='success' text='Sign Up' />
            </div>
        )
    }
}

export default AuthenticationButtons