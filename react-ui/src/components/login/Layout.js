import React, { Component } from 'react';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import LoginAccount from './LoginAccount'
import HeadLoginText from './HeadLoginText'
import Zoom from '@material-ui/core/Zoom';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import loginImage from '../../images/20190210181918_1.jpg'


const styles = theme => ({
    root: {
        display: "block",
        maxWidth: 400,
        position: "fixed",
        margin: "150px auto",
        left: 0,
        right: 0,
        zIndex: 3,
        padding: "50px 20px 5px",
        backgroundColor: "#000000b0",
        border: "solid 1px #ffffff17",
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

class Layout extends Component {
    state = {
        checked: true,
    };
    render(){
        const { classes } = this.props
        const { checked } = this.state;
        return (
            <div className={classes.image}>
                <Zoom in={checked} style={{ transitionDelay: checked ? '200ms' : '0ms' }}>
                    <Grid className={classes.root}>
                        <HeadLoginText/>
                        <LoginAccount/>
                    </Grid>
                </Zoom>
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
