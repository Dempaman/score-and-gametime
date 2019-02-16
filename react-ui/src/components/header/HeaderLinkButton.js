import React from 'react';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import history from '../../history.js';

const styles = theme => ({
    root: {
        margin: '0 auto'
    },
    gridWidth: {
    },
    buttonStyle: {
        backgroundColor: theme.palette.primary.dark00,
        padding: '8px 15px',
    },
});

const HeaderLinkButton = (props) => {
    const { loginLabel, signUpLabel, classes } = props;
    return (
        <Grid>
            <Button size='large' className={classes.buttonStyle}
                onClick={ () => {
                    history.push('/login')
                }}
                >
                <Typography variant='button'>{loginLabel}</Typography>
            </Button>
            <Button size='large' className={classes.buttonStyle}
                onClick={ () => {
                    history.push('/signup')
                }}
                >
                <Typography size='large' variant='button'>{signUpLabel}</Typography>
            </Button>
        </Grid>
    )
}

const mapStateToProps = (state, ownProps) => ({
    user: state.user
})

export default compose(
  withStyles(styles),
  connect(mapStateToProps, {})
)(HeaderLinkButton);
