import React, { Component } from 'react';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import { withStyles } from '@material-ui/core/styles';
import Grow from '@material-ui/core/Grow';
import Divider from '@material-ui/core/Divider';

import { searchResultHead, searchResultClicked, searchResultGameScore  } from '../../actions/SearchActions';
import history from '../../history.js';

const styles = theme => ({
    root: {
    },
    posterRoot: {
        margin: "0 10px 20px 10px",
        width: 230,
        backgroundColor: theme.palette.primary.dark02,
        [theme.breakpoints.down('xs')]: {
         width: 140,
        },
    },
    gameWrapper: {
        width: "100%",
        [theme.breakpoints.down('xs')]: {
         margin: "0 10px 20px 10px",
        },

    },
    searchNumber: {
        padding: "40px 20px",
        backgroundColor: theme.palette.primary.white01,
        [theme.breakpoints.down('xs')]: {
         fontSize: "23px",
        },
    },
    postersContainer: {
        backgroundColor: theme.palette.primary.white01,
        paddingTop: 20
    },
    image: {
        width: "100%",
    },
    card: {
        maxWidth: 500,
        backgroundColor: theme.palette.primary.dark02,
        transition: "all 0.1s ease-in",
        "&:hover": {
            transform: "scale(1.02)",
            zIndex: 1,
        }
    },
    media: {
        height: 240,
        [theme.breakpoints.down('xs')]: {
         height: 140,
        },
    },
    scoreBox: {
        position: "absolute",
        right: 10,
        top: 182,
        width: 55,
        height: 55,
        backgroundColor: theme.palette.primary.blue03,
        borderRadius: "1px",
        padding: 2,
        zIndex: 2,
        [theme.breakpoints.down('xs')]: {
            top: 105,
            right: 10,
            width: 35,
            height: 35,
        },
    },
    fillerFade: {
        width: "100%",
        height: 60,
        position: "absolute",
        left: 0,
        top: 182,
        backgroundImage: "linear-gradient(to bottom, rgba(0,0,0,0) 0%,rgba(13,14,16,1) 68%,rgba(19,20,23,1) 100%)",
        [theme.breakpoints.down('xs')]: {
            top: 95,
        },
    },
    textStyle: {
        fontWeight: 700,
        fontSize: "1.7rem"
    },
    textStyle1: {
        fontWeight: 700,
        fontSize: "2.2rem",
        [theme.breakpoints.down('xs')]: {
            fontSize: "24px",
        },
    },
    userScoreBox: {
        width: 38,
        height: 38,
        backgroundImage: theme.palette.secondary.orangeButton,
        borderRadius: "1px",
        marginBottom: 2,
        [theme.breakpoints.down('xs')]: {
            width: 18,
            height: 18,
        },
    },
    textStyle2: {
        fontSize: "1.2rem",
        fontWeight: 700,
        [theme.breakpoints.down('xs')]: {
            fontSize: "8px",
        },
    },
    textStyle3: {
        fontSize: "0.9rem",
        fontWeight: 700,
        [theme.breakpoints.down('xs')]: {
            fontSize: "6px",
        },
    },
    hoursText: {
        color: '#fff',
        marginBottom: 7,
        [theme.breakpoints.down('xs')]: {
            fontSize: "7px",
        },
    },
    releaseText: {
        color: '#969696;',
        [theme.breakpoints.down('xs')]: {
            fontSize: "11px",
        },
    },
    timeContainer: {
        marginTop: 5,
    },
    timeWrapper: {
        marginTop: 20,
    },
    divider: {
        backgroundColor: 'rgba(183, 183, 183, 0.2)'
    }
});

class TopGames extends Component {
    state = {
        checked: true,
        showItems: 6,
    };

    componentWillMount() {
        this.props.searchResultHead();
    }

    handleChange = () => {
        this.setState(state => ({ checked: !state.checked }));
    };

    setClickedGame = (game, id) => {
        this.props.searchResultGameScore(game)
        this.props.searchResultClicked(game.games[0])
        history.push(`/game_details/${id}`)
    }

    render(){
        const filteredGames = this.props.filterResult
        const { classes } = this.props;
        const { checked } = this.state;
        const postItems = filteredGames.slice(0, this.state.showItems).map(game => (
            <Grow
                key={game._id}
                in={checked}
                style={{ transformOrigin: '0 0 0' }}
                {...(checked ? { timeout: 1000 } : {})}
            >
                <Grid
                    className={classes.posterRoot}
                    onClick={ () => this.setClickedGame(game, game._id) }
                >
                    <Card className={classes.card}>
                        <CardActionArea>
                            <CardMedia
                                className={classes.media}
                                image={game.games[0].gameData.cover ? game.games[0].gameData.cover.url.replace('t_thumb', 't_720p') : require('../../icons/noImage.jpg') }
                                title="Contemplative Reptile"
                                />
                            <CardContent>
                                <Grid container className={classes.fillerFade} />
                                <Grid container justify="center" alignItems="center" className={classes.scoreBox}>
                                    <Typography className={game.totalAvgScore < 99 ? classes.textStyle1 : classes.textStyle } variant="h2">{Math.round(game.totalAvgScore)}</Typography>
                                </Grid>
                                <Typography variant="subtitle2" noWrap>
                                    {game.games[0].gameData.name}
                                </Typography>
                                <Typography className={classes.releaseText} variant="body2">
                                    Release Year: {game.games[0].gameData.release_dates ?
                                        Math.min.apply(game.games[0].gameData.release_dates, game.games[0].gameData.release_dates.map(find =>(
                                                find.y
                                            ))
                                        )
                                        :
                                        "Not found"
                                    }

                                </Typography>
                                <Grid className={classes.timeWrapper}>

                                    <Grid className={classes.timeContainer} container direction="column">
                                        <Grid  container direction="row" alignItems="flex-end" justify="space-between">
                                            <Typography className={classes.hoursText} variant="body2">Main story complete</Typography>
                                            <Grid container justify="center" alignItems="center" className={classes.userScoreBox}>
                                                <Typography className={game.avgMainStoryHours < 99  ? classes.textStyle2 : classes.textStyle3} variant="h2">
                                                    {game.avgMainStoryHours ?
                                                        Math.round(game.avgMainStoryHours)
                                                        :
                                                        0
                                                    }
                                                </Typography>
                                                <Typography variant="h2" className={game.avgMainStoryHours < 99  ? classes.textStyle2 : classes.textStyle3}>h</Typography>
                                            </Grid>
                                        </Grid>
                                        <Divider className={classes.divider} light/>
                                    </Grid>

                                    <Grid className={classes.timeContainer} container direction="column">
                                        <Grid  container direction="row" alignItems="flex-end" justify="space-between">
                                            <Typography className={classes.hoursText} variant="body2">Main + Bonus</Typography>
                                            <Grid container justify="center" alignItems="center" className={classes.userScoreBox}>
                                                <Typography className={game.avgMainStoryBonusHours < 99  ? classes.textStyle2 : classes.textStyle3} variant="h2">
                                                    {game.avgMainStoryBonusHours ?
                                                        Math.round(game.avgMainStoryBonusHours)
                                                        :
                                                        0
                                                    }
                                                </Typography>
                                                <Typography variant="h2" className={game.avgMainStoryBonusHours < 99  ? classes.textStyle2 : classes.textStyle3}>h</Typography>
                                            </Grid>
                                        </Grid>
                                        <Divider className={classes.divider} light/>
                                    </Grid>

                                    <Grid className={classes.timeContainer} container direction="column">
                                        <Grid  container direction="row" alignItems="flex-end" justify="space-between">
                                            <Typography className={classes.hoursText} variant="body2">100% the game!</Typography>
                                            <Grid container justify="center" alignItems="center" className={classes.userScoreBox}>
                                                <Typography className={game.avgCompletionistHours < 99  ? classes.textStyle2 : classes.textStyle3} variant="h2">
                                                    {game.avgCompletionistHours ?
                                                        Math.round(game.avgCompletionistHours)
                                                        :
                                                        0
                                                    }
                                                </Typography>
                                                <Typography variant="h2" className={game.avgCompletionistHours < 99  ? classes.textStyle2 : classes.textStyle3}>h</Typography>
                                            </Grid>
                                        </Grid>
                                        <Divider className={classes.divider} light/>
                                    </Grid>

                                </Grid>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>
            </Grow>
        ))

        return (
            <Grid
                container
                justify="center"
                className={classes.root}
            >
                <Grid className={classes.gameWrapper}>
                    <Typography align="center" className={classes.searchNumber} variant="h3">
                        Popular games this month
                    </Typography>
                    <Grid container justify="center" className={classes.postersContainer}>
                        {postItems}
                    </Grid>
                </Grid>
            </Grid>
        )
    }
}

const mapStateToProps = (state, ownProps) => ({
    searchResult: state.searchResult.items,
    filterResult: state.searchResult.filter,
})

export default compose(
  withStyles(styles),
  connect(mapStateToProps, {searchResultHead, searchResultClicked, searchResultGameScore})
)(TopGames);
