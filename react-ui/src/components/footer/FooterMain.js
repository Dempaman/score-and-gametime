import React, { Component } from 'react';
import compose from 'recompose/compose';
import { connect } from 'react-redux'
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ButtonBase from '@material-ui/core/ButtonBase';
import { withStyles } from '@material-ui/core/styles';
import withWidth from '@material-ui/core/withWidth'

import SGTBlack from '../../icons/ScoreandgametimeBlackSMALL.js'
import history from '../../history.js';

const styles = theme => ({
    root: {
        width: "100%",
        height: 140,
        backgroundColor: theme.palette.primary.white,
        borderTop: "1px solid  #1b20252e",
        marginTop: 40,
        paddingTop: 40,

    },
    emailText: {
        color: '#1b202587',
        lineHeight: 1.2,
    },
    logoContainer: {
        marginRight: 5,
    },
    wrapper: {
        width: 320,
        marginLeft: "20%",
        [theme.breakpoints.down('xs')]: {
            marginLeft: "5%",
        }
    },
    buttonStyle1: {
        backgroundColor: "transparent",
        border: '1px solid #1b202587',
        marginTop: 10,
    },
});

class FooterMain extends Component {
    render(){
        const { classes } = this.props;
        return (
            <Grid className={classes.root}>
                <Grid
                    className={classes.wrapper}
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                >
                    <Grid>
                        <Grid
                            container
                            direction="row"
                        >
                            <Grid className={classes.logoContainer}>
                                <ButtonBase
                                    onClick={ () => {
                                        history.push('/')
                                    }}
                                    >
                                    <SGTBlack/>
                                </ButtonBase>
                            </Grid>
                            <Grid>
                                <Grid container direction="column">
                                    <Typography className={classes.emailText} variant="button">email sign up</Typography>
                                    <Typography className={classes.emailText} variant="caption">Sign up now.</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid>
                            <Typography className={classes.emailText} variant="caption">submit your playthrough and share your experience of your games with everyone else.</Typography>
                        </Grid>
                        <Button
                            type='submit'
                            size='large'
                            className={classes.buttonStyle1}
                            onClick={ () => {
                                history.push('/SignUp')
                            }}
                            >
                            <Typography className={classes.emailText} variant='button'>
                                sign up now
                            </Typography>
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        )
    }
}

const mapStateToProps = (state, ownProps) => ({
})

export default compose(
  withStyles(styles),
  withWidth(),
  connect(mapStateToProps, {})
)(FooterMain);
