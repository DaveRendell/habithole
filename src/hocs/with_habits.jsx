import React, { Component } from 'react'

import { auth, database } from '../firebase'

export default function withHabits(WrappedComponent) {
    return class extends Component {
        constructor(props) {
            super(props)
            this.state = {
                habits: []
            }
        }

        componentDidMount() {
            this.unregisterAuthObserver = auth.onAuthStateChanged( user => {
                if (user) {
                    if (this.databaseRef) {
                        this.databaseRef.off('value', this.databaseCallback)
                    }
                    this.databaseRef =  database.ref(`habits/${user.uid}`)
                    this.databaseCallback = this.databaseRef.on('value', snap =>
                        this.setState({habits: snap.val()})
                    )
                } else {
                    this.databaseRef = null
                    this.databaseCallback = null
                }
            })
        }
    
        componentWillUnmount() {
            this.unregisterAuthObserver()
            if (this.databaseRef) {
                this.databaseRef.off('value', this.databaseCallback)
            }
        }

        render() {
            return <WrappedComponent 
                habits={this.state.habits} 
                {...this.props} 
            />
        }
    }
}