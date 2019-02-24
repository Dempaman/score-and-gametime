import React, { Component } from 'react'
import compose from 'recompose/compose'
import { connect } from 'react-redux'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Divider from '@material-ui/core/Divider'
import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core/styles'
import withWidth, { isWidthUp } from '@material-ui/core/withWidth'

import headerImage from './20190107132008_1.jpg'
import SGT from '../../icons/Scoreandgametime.js'
import SGTSmall from '../../icons/ScoreandgametimeSMALL.js'
import TopGames from './TopGames'
import history from '../../history.js';
import { logout } from '../../actions/UserActions';

const styles = theme => ({
    image: {
        minHeight: 550,
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${headerImage})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative",
        /*[theme.breakpoints.down('xs')]: {
          minHeight: 250,
        },*/
    },
    alignCenter: {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        [theme.breakpoints.down('xs')]: {
          position: "relative",
          top: 0,
          left: 0,
          transform: "translate(0, 0)",
          padding: "50px 20px"
        },
    },
    textStyle: {
        margin: "0 0 20px 0",
        [theme.breakpoints.down('xs')]: {
          fontSize: "1.5em",
        },
    },
    textStyle1: {
        [theme.breakpoints.down('xs')]: {
          fontSize: "0.8em",
        },
    },
    dividerStyle: {
        height: 4,
        backgroundImage: theme.palette.secondary.orangeButton
    },
    bottomMain: {
        padding: 20,
        height: 200,
        width: "100%",
        backgroundColor: theme.palette.primary.white,
        [theme.breakpoints.down('xs')]: {
          fontSize: "0.8em",
          /*height: 125,*/
        },
    },
    buttonStyle: {
        marginTop: '20px',
        backgroundImage: theme.palette.secondary.orangeButton,
        border: '1px solid #fff',
    },
    buttonStyle1: {
        marginTop: '20px',
        backgroundColor: "transparent",
        border: '1px solid #fff',
        margin: 10,
        "&:hover": {
       backgroundColor: theme.palette.primary.blue02
   }
    },
});

class HomePage extends Component {
    render(){
        const { classes } = this.props;
        return (
            <div>
                <div className={classes.image}>
                    <div className={classes.alignCenter}>
                        <Grid container direction="column" justify="center">
                            <Grid container justify="center">
                                {(isWidthUp('sm', this.props.width)) ? <SGT/> : <SGTSmall/> }
                            </Grid>
                            <Grid container justify="center" direction="column">
                                {!this.props.user.email ?
                                    <Grid container justify="center">
                                        <div>
                                            <Button
                                                type='submit'
                                                size='large'
                                                className={classes.buttonStyle1}
                                                onClick={ () => {
                                                    history.push('/signup')
                                                }}
                                                >
                                                <Typography variant='button'>
                                                    Become A Member
                                                </Typography>
                                            </Button>
                                            <Button
                                                type='submit'
                                                size='large'
                                                className={classes.buttonStyle1}
                                                onClick={ () => {
                                                    history.push('/login')
                                                }}
                                                >
                                                <Typography variant='button'>
                                                    Login
                                                </Typography>
                                            </Button>
                                        </div>
                                    </Grid>
                                    :
                                    <Grid container justify="center">
                                        <Typography variant="h2">Welcome</Typography>
                                    </Grid>
                                }
                                <Grid container justify="center">
                                    <Typography variant="h2">Discover the experience</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </div>
                </div>
                <Divider className={classes.dividerStyle}/>
                <Grid
                    className={classes.bottomMain}
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                >
                    <Grid
                        container
                        direction="column"
                        justify="center"
                        alignItems="center"
                    >
                        <Typography className={classes.textStyle1} variant='subtitle1'>submit your playthrough and share your experience of your games with everyone else!</Typography>
                        <Button
                            type='submit'
                            size='large'
                            className={classes.buttonStyle}
                            onClick={ () => {
                                history.push('/addgame_search')
                            }}
                        >
                            <Typography variant='button'>
                                Share now!
                            </Typography>
                        </Button>
                    </Grid>
                </Grid>
                <TopGames/>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => ({
    user: state.user
})

export default compose(
  withStyles(styles),
  withWidth(),
  connect(mapStateToProps, {logout})
)(HomePage);
