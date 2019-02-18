import React, { Component } from 'react';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Snackbar from '@material-ui/core/Snackbar';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import Button from '@material-ui/core/Button';

import history from '../../history.js';
import { login, getUser } from '../../actions/UserActions';
import SnackbarContentWrapper from '../snackbarContentWrapper/SnackbarContentWrapper'


const styles = theme => ({
    root: {
        margin: '25px 0 15px 0',
        height: "100vh",
    },
});

class Profile extends Component {
    constructor(props) {
        super(props)
            this.state = {
                email: '',
                password: '',
                error: '',
                open: false,
            }
    }


    componentWillMount() {
        this.props.getUser();
    }

    render(){
        const { classes } = this.props;
        console.log(this.props.user)
        return (
            <Grid
                container
                justify='center'
                className={classes.root}
            >
            <Typography>Welcome to profile</Typography>
            </Grid>
        )
    }
}

const mapStateToProps = (state, ownProps) => ({
    user: state.user
})

export default compose(
  withStyles(styles),
  connect(mapStateToProps, { login, getUser })
)(Profile);
