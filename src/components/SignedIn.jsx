import React, { Component } from 'react';
import withUser from '../hocs/with_user'

class SignedIn extends Component {
    render() {
        if (this.props.user) 
            return this.props.children
        else 
            return null
    }
}

export default withUser(SignedIn);