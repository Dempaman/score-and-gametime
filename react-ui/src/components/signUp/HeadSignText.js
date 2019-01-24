import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    headerStyle: {
        margin: '100px 0 30px 0',
    },
    dividerStyle: {
        maxWidth: 800,
        margin: '0 auto'
    }
});

class HeadSignText extends Component {
    render(){
        const { classes } = this.props;
        return (
            <Grid>
                <Grid
                    container
                    justify="center"
                    className={classes.headerStyle}
                >
                    <Typography variant='h4'>Sign up</Typography>
                </Grid>
                <Divider className={classes.dividerStyle} light variant="middle"/>
            </Grid>
        )
    }
}

export default withStyles(styles)(HeadSignText);
