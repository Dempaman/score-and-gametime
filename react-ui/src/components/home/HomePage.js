import React, { Component } from 'react'
import compose from 'recompose/compose'
import { connect } from 'react-redux'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Divider from '@material-ui/core/Divider'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import withWidth, { isWidthUp } from '@material-ui/core/withWidth'

import headerImage from './20190107132008_1.jpg'
import SGT from '../../icons/Scoreandgametime.js'
import SGTSmall from '../../icons/ScoreandgametimeSMALL.js'
import TopGames from './TopGames'
import history from '../../history.js';

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
        backgroundColor: theme.palette.primary.blue03
    },
    bottomMain: {
        padding: 20,
        height: 200,
        width: "100%",
        backgroundColor: theme.palette.primary.blue02,
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
});

class HomePage extends Component {
    render(){
        const { classes } = this.props;
        return (
            <div>
                <div className={classes.image}>
                    <div className={classes.alignCenter}>
                        <Grid container justify="center">
                            <div>
                                {(isWidthUp('sm', this.props.width)) ? <SGT/> : <SGTSmall/> }
                            </div>
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
                        <Typography className={classes.textStyle1} variant='subtitle1'>Share your gametime and user score with everyone else!</Typography>
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
  connect(mapStateToProps, {})
)(HomePage);
