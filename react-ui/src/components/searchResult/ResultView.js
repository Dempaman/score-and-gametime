import React, { Component } from 'react';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
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

    },
    gameWrapper: {
        width: 1356,
        margin: 20,

    },
    searchNumber: {
        padding: 8,
        backgroundColor: theme.palette.primary.dark02
    },
    postersContainer: {
        backgroundColor: theme.palette.primary.dark01,
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
    },
    polygon: {
        fill: theme.palette.common.white,
        stroke: theme.palette.divider,
        strokeWidth: 1,
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
        zIndex: 2
    },
    fillerFade: {
        width: "100%",
        height: 60,
        position: "absolute",
        left: 0,
        top: 182,
        backgroundImage: "linear-gradient(to bottom, rgba(0,0,0,0) 0%,rgba(13,14,16,1) 68%,rgba(19,20,23,1) 100%)",
    },
    textStyle: {
        fontWeight: 700,
        fontSize: "1.7rem"
    },
    textStyle1: {
        fontWeight: 700,
        fontSize: "2.2rem"
    },
    userScoreBox: {
        width: 38,
        height: 38,
        backgroundImage: theme.palette.secondary.orangeButton,
        borderRadius: "1px",
        marginBottom: 2,
    },
    textStyle2: {
        fontSize: "1.2rem",
        fontWeight: 700,
    },
    textStyle3: {
        fontSize: "0.9rem",
        fontWeight: 700,
    },
    hoursText: {
        marginBottom: 7,
    },
    timeContainer: {
        marginTop: 5,
    },
    timeWrapper: {
        marginTop: 20,
    }
});

class ResultView extends Component {
    state = {
        checked: true,
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

        const postItems = filteredGames.map(game => (
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
                                image={game.games[0].gameData.cover ? game.games[0].gameData.cover.url.replace('t_thumb', 't_cover_big') : require('../../icons/noImage.jpg') }
                                title="Contemplative Reptile"
                                />
                            <CardContent>
                                <Grid container className={classes.fillerFade} />
                                <Grid container justify="center" alignItems="center" className={classes.scoreBox}>
                                    <Typography className={game.totalAvgScore < 99 ? classes.textStyle1 : classes.textStyle } variant="headline">{Math.round(game.totalAvgScore)}</Typography>
                                </Grid>
                                <Typography variant="subtitle1" noWrap>
                                    {game.games[0].gameData.name}
                                </Typography>
                                <Typography variant="body2">
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
                                                <Typography className={game.avgMainStoryHours < 99  ? classes.textStyle2 : classes.textStyle3} variant="headline">
                                                    {game.avgMainStoryHours ?
                                                        Math.round(game.avgMainStoryHours)
                                                        :
                                                        0
                                                    }
                                                </Typography>
                                                <Typography variant="headline" className={game.avgMainStoryHours < 99  ? classes.textStyle2 : classes.textStyle3}>h</Typography>
                                            </Grid>
                                        </Grid>
                                        <Divider light/>
                                    </Grid>

                                    <Grid className={classes.timeContainer} container direction="column">
                                        <Grid  container direction="row" alignItems="flex-end" justify="space-between">
                                            <Typography className={classes.hoursText} variant="body2">Main + Bonus</Typography>
                                            <Grid container justify="center" alignItems="center" className={classes.userScoreBox}>
                                                <Typography className={game.avgMainStoryBonusHours < 99  ? classes.textStyle2 : classes.textStyle3} variant="headline">
                                                    {game.avgMainStoryBonusHours ?
                                                        Math.round(game.avgMainStoryBonusHours)
                                                        :
                                                        0
                                                    }
                                                </Typography>
                                                <Typography variant="headline" className={game.avgMainStoryBonusHours < 99  ? classes.textStyle2 : classes.textStyle3}>h</Typography>
                                            </Grid>
                                        </Grid>
                                        <Divider light/>
                                    </Grid>

                                    <Grid className={classes.timeContainer} container direction="column">
                                        <Grid  container direction="row" alignItems="flex-end" justify="space-between">
                                            <Typography className={classes.hoursText} variant="body2">100% the game!</Typography>
                                            <Grid container justify="center" alignItems="center" className={classes.userScoreBox}>
                                                <Typography className={game.completionistHours < 99  ? classes.textStyle2 : classes.textStyle3} variant="headline">
                                                    {game.completionistHours ?
                                                        Math.round(game.completionistHours)
                                                        :
                                                        0
                                                    }
                                                </Typography>
                                                <Typography variant="headline" className={game.completionistHours < 99  ? classes.textStyle2 : classes.textStyle3}>h</Typography>
                                            </Grid>
                                        </Grid>
                                        <Divider light/>
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
                    <Typography align="center" className={classes.searchNumber} variant="h5">
                        {this.props.filterResult.length} Results
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
)(ResultView);
