import React, { Component } from 'react';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Snackbar from '@material-ui/core/Snackbar';
import { withStyles } from '@material-ui/core/styles';

import SnackbarContentWrapper from '../snackbarContentWrapper/SnackbarContentWrapper'
import { getUser, createAccount } from '../../actions/UserActions';
import history from '../../history.js';


const styles = theme => ({
    root: {
        margin: '25px 0 15px 0',
    },
    gridWidth: {
        width: 340,
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 340,
    },
    buttonStyle: {
        marginTop: '50px',
        width: 340,
        backgroundImage: theme.palette.secondary.orangeButton,
        border: '1px solid #fff',
    },
});

class CreateAccount extends Component {
    constructor(props) {
        super(props)
            this.state = {
                username: '',
                email: '',
                password: '',
                confirmPassword: '',
                error: '',
                open: false
            }
    }

    isValid() {
      const { email, password, confirmPassword } = this.state;

      if (email === '' || password === '' || confirmPassword === '') {
        this.setState({
          error: 'Please enter in all fields',
          open: true
        });
        return false;
      }

      if (password !== confirmPassword) {
        this.setState({
          error: 'Please make sure your passwords match',
          open: true
        });
        return false;
      }

      return true;
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
        //this.props.getUser();
    }

    submitAccount(event) {
        console.log('here?');
        event.preventDefault();
        if (!this.isValid()) {
            return;
        }
        this.props.createAccount(this.state.email, this.state.password)
        .then(() => {
            history.replace('/')
        })
        .catch(err => {
            this.setState({
                error: err.message,
                open: true,
            });
        })
    }

    render(){
        const { classes } = this.props;
        return (
            <Grid
                container
                justify='center'
                className={classes.root}
            >
                <form onSubmit={(event) => this.submitAccount(event)} >
                    <Grid
                        container
                        direction='column'
                    >
                        <TextField
                            id="outlined-name"
                            label="Username"
                            className={classes.textField}
                            margin="normal"
                            variant="outlined"
                            onChange={(event) => this.setState({ username: event.target.value })}
                            error={this.state.error !== ''}
                        />
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
                        <TextField
                            id="outlined-confirm-password-input"
                            label="Confirm Password"
                            className={classes.textField}
                            type="password"
                            autoComplete="current-password"
                            margin="normal"
                            variant="outlined"
                            onChange={(event) => this.setState({ confirmPassword: event.target.value })}
                            error={this.state.error !== ''}
                        />
                    </Grid>
                    <Grid
                        container
                        justify='center'
                    >
                        <Button type='submit' size='large' className={classes.buttonStyle}>
                            <Typography variant='button'>Create Account</Typography>
                        </Button>
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
                                variant="warning"
                                message={this.state.error}
                                />
                        </Snackbar>)
                    }
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
  connect(mapStateToProps, { getUser, createAccount })
)(CreateAccount);
