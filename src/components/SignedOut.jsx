import React, { Component } from 'react';
import withUser from '../hocs/with_user'

class SignedOut extends Component {
    render() {
        if (this.props.user == null && !this.props.isLoading) 
            return this.props.children
        else 
            return null
    }
}

export default withUser(SignedOut);