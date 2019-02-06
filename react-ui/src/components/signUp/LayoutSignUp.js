import React, { Component } from 'react';
import HeadSignText from './HeadSignText'
import GoogleButtonWrap from './GoogleButtonWrap'
import CreateAccount from './CreateAccount'
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import Zoom from '@material-ui/core/Zoom';

const styles = theme => ({
    root: {
        margin: '0px auto',
        maxWidth: 1356,
    },
});



class LayoutSignUp extends Component {
    state = {
        checked: true,
    };
    render(){
        const { classes } = this.props;
        const { checked } = this.state;
        return (
            <div>
                <Zoom in={checked} style={{ transitionDelay: checked ? '200ms' : '0ms' }}>
                    <Grid className={classes.root}>
                        <HeadSignText/>
                        <GoogleButtonWrap/>
                        <CreateAccount/>
                    </Grid>
                </Zoom>
            </div>
        )
    }
}

export default withStyles(styles)(LayoutSignUp);
