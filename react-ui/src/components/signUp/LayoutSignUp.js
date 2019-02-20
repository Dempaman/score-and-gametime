import React, { Component } from 'react';
import HeadSignText from './HeadSignText'
import CreateAccount from './CreateAccount'
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import Zoom from '@material-ui/core/Zoom';
import loginImage from '../../images/20190210181918_1.jpg'
import Dialog from '@material-ui/core/Dialog';

const styles = theme => ({
    root: {
        padding: "20px 10px 10px",
    },
    image: {
        height: "100%",
        width: "100%",
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${loginImage})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "bottom",
        position: "absolute",
        [theme.breakpoints.down('xs')]: {
          minHeight: 250,
        },
    },
});



class LayoutSignUp extends Component {
    state = {
        checked: true,
        open: true,
    };
    render(){
        const { classes } = this.props;
        const { checked } = this.state;
        const { fullScreen } = this.props;

        return (
            <div className={classes.image}>
                <Dialog
                    open={this.state.open}
                    fullScreen={fullScreen}
                    aria-labelledby="responsive-dialog-title"
                >
                    <Zoom in={checked} style={{ transitionDelay: checked ? '200ms' : '0ms' }}>
                        <Grid className={classes.root}>
                            <HeadSignText/>
                            {/*<GoogleButtonWrap/>*/}
                            <CreateAccount/>
                        </Grid>
                    </Zoom>
                </Dialog>
            </div>
        )
    }
}

export default withStyles(styles)(LayoutSignUp);
