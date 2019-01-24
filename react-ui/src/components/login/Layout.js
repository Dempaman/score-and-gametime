import React, { Component } from 'react';
import HeaderAppBar from '../header';
import LoginAccount from './LoginAccount'
import HeadLoginText from './HeadLoginText'

class Layout extends Component {
    render(){
        return (
            <div>
                <HeaderAppBar/>
                <HeadLoginText/>
                <LoginAccount/>
            </div>
        )
    }
}

export default Layout
