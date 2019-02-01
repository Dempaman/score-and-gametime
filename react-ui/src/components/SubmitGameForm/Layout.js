import React, { Component } from 'react';
import HeaderBackground from './HeaderBackground.js'
import Form from './Form'

class Layout extends Component {
    render(){
        return (
            <div>
                <HeaderBackground/>
                <Form/>
            </div>
        )
    }
}

export default Layout
