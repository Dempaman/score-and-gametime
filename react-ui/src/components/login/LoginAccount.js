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
    },
    gridWidth: {
        width: 340,
    },
    textField: {
        width: 340,
    },
    buttonStyle: {
        marginTop: '20px',
        width: 340,
        backgroundColor: theme.palette.primary.blue02,
        border: '1px solid rgba(255, 255, 255, 0.2)',
    },
    textSignup: {
        marginLeft: 5,
        color: theme.palette.primary.blue02,
        '&:hover': {
            color: '#fff',
        },
    },
    gridMargin: {
        marginTop: 10
    }
});

class LoginAccount extends Component {
    constructor(props) {
        super(props)
            this.state = {
                email: '',
                password: '',
                error: '',
                open: false,
            }
    }

////**** SnackBar handler *****////
    handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
      this.setState({
          open: false
      });
    };
////**** -------------- *****////

    componentWillMount() {
        this.props.getUser();
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.user.email !== undefined) {
            history.push('/');
        }
    }

    submitLogin(event) {
        event.preventDefault();
        this.props.login(this.state.email, this.state.password)
        .catch(err => {
            this.setState({
                error: err,
                open: true
            })
        });
    }

    render(){
        const { classes } = this.props;
        return (
            <Grid
                container
                justify='center'
                className={classes.root}
            >
                <form onSubmit={event => {this.submitLogin(event)}}  autoComplete="off">
                    <Grid
                        container
                        direction='column'
                    >
                        <TextField
                            id="outlined-email-input"
                            label="Email"
                            className={classes.textField}
                            type="email"
                            name="email"
                            autoComplete="email"
                            margin="normal"
                            variant="outlined"
                            onChange={(event) => this.setState({ email: event.target.value })}
                            error={this.state.error !== ''}
                        />
                        <TextField
                            id="outlined-password-input"
                            label="Password"
                            className={classes.textField}
                            type="password"
                            autoComplete="current-password"
                            margin="normal"
                            variant="outlined"
                            onChange={(event) => this.setState({ password: event.target.value })}
                            error={this.state.error !== ''}
                        />
                    </Grid>
                    {this.state.error &&
                        (<Snackbar
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={this.state.open}
                            autoHideDuration={6000}
                            onClose={this.handleClose}

                            >
                            <SnackbarContentWrapper
                                onClose={this.handleClose}
                                variant="error"
                                message="username/password is incorrect"
                                />
                        </Snackbar>)
                    }
                    <Button type='submit' size='large' className={classes.buttonStyle}>
                        <Typography variant='button'>Login</Typography>
                    </Button>
                    <Grid className={classes.gridMargin} container direction="row" alignItems="center">
                        <Typography variant="subtitle2">Need an Account?</Typography>
                        <ButtonBase
                            onClick={ () => {
                                history.push('/signUp')
                            }}
                        >
                            <Typography className={classes.textSignup} variant="subtitle1">Sign up.</Typography>
                        </ButtonBase>
                    </Grid>
                </form>
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
)(LoginAccount);
