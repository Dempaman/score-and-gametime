import React, { Component } from 'react';
import LoginAccount from './LoginAccount'
import HeadLoginText from './HeadLoginText'

class Layout extends Component {
    render(){
        return (
            <div>
                <HeadLoginText/>
                <LoginAccount/>
            </div>
        )
    }
}

export default Layout
