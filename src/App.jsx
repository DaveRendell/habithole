import React, { Component } from 'react'
import { HashRouter, Route } from 'react-router-dom'

import NavigationBar from './components/navigation_bar/NavigationBar';
import HomePage from './components/HomePage';
import HabitPage from './components/HabitPage';
import SettingsPage from './components/SettingsPage';

import '../theme/app.scss'
import TestPage from './components/TestPage';

class App extends Component {
    render() {
        return (                
            <HashRouter>
                <div>
                    <NavigationBar />
                    <div className="main-content">
                        <Route exact path='/' component={HomePage} />
                        <Route exact path="/habit/:id" component={HabitPage} />
                        <Route exact path="/test/" component={TestPage}/>
                        <Route exact path="/settings/" component={SettingsPage} />
                    </div>
                </div>
            </HashRouter>
        )
    }
}

export default App