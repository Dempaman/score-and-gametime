import React, { Component } from 'react';
import HeadSignText from './HeadSignText'
import GoogleButtonWrap from './GoogleButtonWrap'
import CreateAccount from './CreateAccount'
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    root: {
        margin: '0px auto',
        maxWidth: 1356,
    },
});



class LayoutSignUp extends Component {
    render(){
        const { classes } = this.props;
        return (
            <div>
                <Grid className={classes.root}>
                    <HeadSignText/>
                    <GoogleButtonWrap/>
                    <CreateAccount/>
                </Grid>
            </div>
        )
    }
}

export default withStyles(styles)(LayoutSignUp);
