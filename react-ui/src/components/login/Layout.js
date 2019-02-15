import React, { Component } from 'react';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import LoginAccount from './LoginAccount'
import HeadLoginText from './HeadLoginText'
import Zoom from '@material-ui/core/Zoom';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import loginImage from '../../images/20190210181918_1.jpg'
import Dialog from '@material-ui/core/Dialog';


const styles = theme => ({
    root: {
        padding: "20px 20px 10px",
    },
    image: {
        height: "100%",
        width: "100%",
        backgroundImage: `url(${loginImage})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "bottom",
        position: "absolute",
        [theme.breakpoints.down('xs')]: {
          minHeight: 250,
          padding: "20px 10px 10px",
        },
    },
});

class Layout extends Component {
    state = {
        checked: true,
        open: true,
    };
    render(){
        const { classes } = this.props
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
                        <HeadLoginText/>
                        <LoginAccount/>
                    </Grid>
                </Zoom>
            </Dialog>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => ({
    user: state.user
})

export default compose(
  withStyles(styles),
  connect(mapStateToProps, {})
)(Layout);
