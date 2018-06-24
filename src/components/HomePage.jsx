import React, { Component } from 'react'
import Agenda from './Agenda';

class HomePage extends Component {
    render() {
        return (
            <div>
                <h2>Home</h2>
                <Agenda />
            </div>
        )
    }
}

export default HomePage