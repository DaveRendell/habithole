import React, { Component } from 'react'
import Agenda from './agenda/Agenda';
import SignedIn from './SignedIn'

import '../../theme/home_page.scss'
import SignedOut from './SignedOut';

class HomePage extends Component {
    render() {
        return (
            <div className="home-page">
                <SignedIn>
                    <Agenda />
                </SignedIn>
                <SignedOut>
                    <p>Welcome! Sign in or sign up to get started tracking habits.</p>
                </SignedOut>
            </div>
        )
    }
}

export default HomePage