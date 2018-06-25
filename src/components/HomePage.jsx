import React, { Component } from 'react'
import Agenda from './Agenda';

import '../../theme/home_page.scss'

class HomePage extends Component {
    render() {
        return (
            <div className="home-page">
                <Agenda />
            </div>
        )
    }
}

export default HomePage