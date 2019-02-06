import React, { Component } from 'react';
import LoginAccount from './LoginAccount'
import HeadLoginText from './HeadLoginText'
import Zoom from '@material-ui/core/Zoom';

class Layout extends Component {
    state = {
        checked: true,
    };
    render(){
        const { checked } = this.state;
        return (
            <div>
                <Zoom in={checked} style={{ transitionDelay: checked ? '200ms' : '0ms' }}>
                    <div>
                        <HeadLoginText/>
                        <LoginAccount/>
                    </div>
                </Zoom>
            </div>
        )
    }
}

export default Layout
