import React, { Component } from 'react'

import { auth, database } from '../firebase'

export default function withHabit(WrappedComponent) {
    return class extends Component {
        constructor(props) {
            super(props)
            this.state = {
                habit: null
            }
        }

        componentDidMount() {
            this.unregisterAuthObserver = auth.onAuthStateChanged( user => {
                if (user) {
                    if (this.databaseRef) {
                        this.databaseRef.off('value', this.databaseCallback)
                    }
                    this.databaseRef =  database.ref(`habits/${user.uid}/${this.props.habitKey}`)
                    this.databaseCallback = this.databaseRef.on('value', snap =>
                        this.setState({habit: snap.val()})
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
                habit={this.state.habit} 
                {...this.props} 
            />
        }
    }
}