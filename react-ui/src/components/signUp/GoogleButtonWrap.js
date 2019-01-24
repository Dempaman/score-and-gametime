import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import GoogleIcon from '../../icons/GoogleIcon'

const styles = theme => ({
    root: {
        margin: '25px 0 15px 0',
    },
    gridWidth: {
        width: 340,

    },
    buttonStyle: {
        width: 340,
        backgroundColor: theme.palette.primary.blue02
    },
    textStyle: {
        textTransform: 'none'
    },
    dividerStyle: {
        width: 120,
        margin: '0 15px'
    },
    leftIcon: {
        position: 'absolute',
        left: '5px',
        backgroundColor: theme.palette.common.white,
        padding: 2,
  },
});

class GoogleButtonWrap extends Component {
    render(){
        const { classes } = this.props;
        return (
            <Grid
                container
                justify='center'
                className={classes.root}

            >
                <Grid className={classes.gridWidth}>
                    <Grid>
                        <Button className={classes.buttonStyle} variant="contained">
                            <div className={classes.leftIcon}>
                                <GoogleIcon/>
                            </div>
                            <Typography className={classes.textStyle} variant='button'>Sign In With Google</Typography>
                        </Button>

                    </Grid>
                    <Grid
                        container
                        justify='center'
                        alignItems='center'
                    >
                        <Grid>
                            <Divider className={classes.dividerStyle} light/>
                        </Grid>
                        <Grid>
                            <Typography variant='subtitle1'>or</Typography>
                        </Grid>
                        <Grid>
                            <Divider className={classes.dividerStyle} light/>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        )
    }
}

export default withStyles(styles)(GoogleButtonWrap);
