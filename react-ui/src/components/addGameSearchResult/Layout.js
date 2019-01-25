import React, { Component } from 'react';
import HeaderBackground from './HeaderBackground';
import SearchResult from './SearchResult';

class Layout extends Component {
    render(){
        return (
            <div>
                <HeaderBackground />
                <SearchResult />
            </div>
        )
    }
}

export default Layout
