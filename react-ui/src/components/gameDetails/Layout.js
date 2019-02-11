import React, { Component } from 'react';
import GameDetailsPage from './GameDetailsPage';
import HeaderBackground from './HeaderBackground'

class Layout extends Component {
    render(){
        return (
            <div>
                <HeaderBackground/>
                <GameDetailsPage/>
            </div>
        )
    }
}

export default Layout
