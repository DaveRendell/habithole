import React, { Component } from 'react'

import { auth } from '../firebase'

export default function withUser(WrappedComponent) {
    return class extends Component {
        constructor(props) {
            super(props)
            this.state = {
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

        render() {
            return <WrappedComponent
                user={this.state.user}
                {...this.props}
            />
        }
    }
}