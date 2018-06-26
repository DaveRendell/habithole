import React, { Component } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'

import NavigationBar from './components/navigation_bar/NavigationBar';
import HomePage from './components/HomePage';
import HabitPage from './components/HabitPage';

class App extends Component {
    render() {
        return (                
            <BrowserRouter>
                <div>
                    <NavigationBar />
                    <Route exact path='/' component={HomePage} />
                    <Route exact path="/habit/:id" component={HabitPage} />
                </div>
            </BrowserRouter>
        )
    }
}

export default App