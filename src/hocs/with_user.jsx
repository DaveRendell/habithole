import React, { Component } from 'react'

import { auth } from '../firebase'

export default function withUser(WrappedComponent) {
    return class extends Component {
        constructor(props) {
            super(props)
            this.state = {
                user: null,
                isLoading: true
            }
        }
        
        componentDidMount() {
            this.unregisterAuthObserver = 
                auth.onAuthStateChanged(user =>
                    this.setState({
                        user,
                        isLoading: false
                    })    
                )
        }
    
        componentWillUnmount() {
            this.unregisterAuthObserver();
        }

        render() {
            return <WrappedComponent
                user={this.state.user}
                isLoading={this.state.isLoading}
                {...this.props}
            />
        }
    }
}