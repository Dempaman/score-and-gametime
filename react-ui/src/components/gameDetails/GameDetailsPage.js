import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactPlayer from 'react-player'
import 'date-fns';
import axios from 'axios';
import compose from 'recompose/compose';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import CardMedia from '@material-ui/core/CardMedia';
import CardActionArea from '@material-ui/core/CardActionArea';
import Card from '@material-ui/core/Card';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import history from '../../history.js';
import { searchResultClicked, loading, searchResultHead, searchResultGameScore  } from '../../actions/SearchActions';

const styles = theme => ({
    root: {
        margin: "0 auto",
        padding: "10px 20px 100px 20px",
        maxWidth: 1356,
        backgroundColor: theme.palette.primary.white,
        [theme.breakpoints.down('xs')]: {
         padding: "10px 10px 100px 10px",
        },
        [theme.breakpoints.up('1060')]: {
         padding: "10px 20px 100px 20px",
        },
    },
    leftContainer: {
        marginTop: 122,
        width: 250,
        [theme.breakpoints.down('sm')]: {
         fontSize: "0.7rem",
         width: "100%",
        },
        [theme.breakpoints.down('xs')]: {
         marginTop: 185,
        },
    },
    rightContainer: {
        marginLeft: 20,
        [theme.breakpoints.down('xs')]: {
            marginLeft: 0
        },
    },
    gridMargin: {
        margin: "8px 0px 0px 0px",
    },
    textStyle: {
        margin: "15px 0 5px 0",
        fontWeight: 600
    },
    textStyle1: {
        marginTop: 40,
    },
    textStyle2: {
        marginRight: 3
    },
    textStyle3: {
        marginRight: 8,
        fontWeight: 700
    },
    topGrid: {
        marginTop: 10,
        padding: 10,
        backgroundColor: theme.palette.primary.dark02
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        width: "100%",
    },
    scoreBox: {
        width: 80,
        height: 80,
        backgroundColor: theme.palette.primary.blue03,
        borderRadius: "1px"
    },
    scoreTextBox: {
        marginLeft: 10,
        marginTop: 12,
    },
    mobileStepper: {
        maxWidth: 600,
        flexGrow: 1,
    },
    buttonStyle: {
        marginTop: 10,
        backgroundImage: theme.palette.secondary.orangeButton,
        border: '1px solid #fff',
        '&:hover': {
            backgroundImage: "none",
        },
    },
    circularStyle: {
        height: 600,
        marginTop: 100,
    },
    scoreAndButtonTop: {
        margin: "40px 0 8px 0",
    },
    divider: {
        margin: "5px 0 5px 0"
    },
    avgHours: {
        color: "#fff",
        maxWidth: 400,
        marginRight: 20,
        width: "30%",
        [theme.breakpoints.down('sm')]: {
          width: "25%",
        },
    },
    avgHoursText: {
        color: "#fff",
        [theme.breakpoints.down('sm')]: {
         fontSize: "0.7rem"
        },
    },
    rootTable: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
        backgroundColor: theme.palette.primary.white,
    },
    table: {
        minWidth: 700,
    },
    tbText:{
        color: "#f27449",
        fontWeight: 700,
        fontSize: "15px",
    },
    card: {
        border: "none",
        position: "absolute",
        height: 340,
        width: 340,
        top: 207,
        [theme.breakpoints.down('1300')]: {
            height: 250,
            width: 250,
            top: 300,
        },
        [theme.breakpoints.down('800')]: {
            height: 200,
            width: 200,
            top: 335,
        },
        [theme.breakpoints.down('xs')]: {
            height: 250,
            width: 250,
            fontSize: "0.7rem",
            left: "50%",
            marginLeft: -125,
            top: 215,
        },
    },
    media: {
        height: 340,
        [theme.breakpoints.down('1300')]: {
            height: 250,
        },
        [theme.breakpoints.down('800')]: {
            height: 200,
        },
        [theme.breakpoints.down('xs')]: {
            height: 250,
        },
        "&:hover": {
            cursor: "auto",
        },
    },
    devText: {
        color: "rgba(138, 138, 138, 0.87)",
    },
    videoGrid: {
        marginTop: 40,
    },
    playerWrapper: {
        position: "relative",
        paddingTop: "18.75%",
        [theme.breakpoints.down('xs')]: {
            paddingTop: "56.25%", /* Player ratio: 100 / (1280 / 720) */
            margin: 2,
        },
    },
    reactPlayer: {
        position: "absolute",
        top: 0,
        left: 0,
    }
});

class GameDetailsPage extends Component {
    constructor(props) {
        super(props)
            this.state = {
                open: false,
                openVideo: false,
                error: ''
            }
    }

    componentWillMount() {
        const id = history.location.pathname.split("/game_details/")[1]
        if(!this.props.clicked.id){
            this.props.loading(false)
            axios({
                url: `https://boiling-wildwood-33193.herokuapp.com/https://api-v3.igdb.com//games/${id}?fields=name,genres.name,release_dates.y,videos.video_id,platforms.name,popularity,summary,storyline,cover.url,screenshots.url,involved_companies.developer,involved_companies.company.name`,
                headers: {
                    "user-key": "6f618d610d984b87f163ab3f0097a78f",
                    Accept: "application/json"
                },
                method: 'GET',
            })
            .then(res => {
                this.props.searchResultHead();
                this.props.loading(true)
                this.props.searchResultClicked(res.data[0])
            })

            .catch(err => {
                console.error(err);
            });
        }
    }

    componentDidUpdate(prevProps){
        const id = history.location.pathname.split("/game_details/")[1]
        if(prevProps.searchResult !== this.props.searchResult){
            const result = this.props.searchResult.filter((item) => {
             return item._id === Number(id)
            })
            this.props.searchResultGameScore(result[0])
         }
    }

    //********* Fastest total time on game *********//
    fastestMain(){
        const time = Math.min.apply(this.props.gameScore.games, this.props.gameScore.games.map(time => (
                    (time.mainStory.h * 60 * 60) + (time.mainStory.m * 60) + time.mainStory.s
                ))
            )

        return this.secondsToHourAndMin(time)
    }
    fastestBonus(){
        const time = Math.min.apply(this.props.gameScore.games, this.props.gameScore.games.map(time => (
                    (time.mainStoryBonus.h * 60 * 60) + (time.mainStoryBonus.m * 60) + time.mainStoryBonus.s
                ))
            )

        return this.secondsToHourAndMin(time)
    }
    fastestComp(){
        const time = Math.min.apply(this.props.gameScore.games, this.props.gameScore.games.map(time => (
                    (time.completionist.h * 60 * 60) + (time.completionist.m * 60) + time.completionist.s
                ))
            )

        return this.secondsToHourAndMin(time)
    }
    fastestOnPlatform(){
        const time = Math.min.apply(this.props.gameScore.games, this.props.gameScore.games.map(time => (
                    (time.completionist.h * 60 * 60) + (time.completionist.m * 60) + time.completionist.s
                ))
            )

        return this.secondsToHourAndMin(time)
    }
    //********* -------------------------------------*********//

    //********* Average Time on different platforms *********//
    avgTimePlatformMain(number, platform){
        const time = this.props.gameScore.games.filter(x => x.platform === platform).map(time => (
                    (time.mainStory.h * 60 * 60) + (time.mainStory.m * 60) + time.mainStory.s
                )).reduce((a, b) => a + b, 0);
        const avgTime = (time/number)
        return this.secondsToHourAndMin(avgTime)
    }
    avgTimePlatformBonus(number, platform){
        const time = this.props.gameScore.games.filter(x => x.platform === platform).map(time => (
                    (time.mainStoryBonus.h * 60 * 60) + (time.mainStoryBonus.m * 60) + time.mainStoryBonus.s
                )).reduce((a, b) => a + b, 0);
        const avgTime = (time/number)
        return this.secondsToHourAndMin(avgTime)
    }
    avgTimePlatformComp(number, platform){
        const time = this.props.gameScore.games.filter(x => x.platform === platform).map(time => (
                    (time.completionist.h * 60 * 60) + (time.completionist.m * 60) + time.completionist.s
                )).reduce((a, b) => a + b, 0);
        const avgTime = (time/number)
        return this.secondsToHourAndMin(avgTime)
    }
    //********* -------------------------------------*********//

    secondsToHourAndMin(d) {
        d = Number(d);
        const h = Math.floor(d / 3600);
        const m = Math.floor(d % 3600 / 60);
        const s = Math.floor(d % 3600 % 60);

        const hDisplay = h > 0 ? h + (h === 1 ? " h " : " h ") : "";
        const mDisplay = m > 0 ? m + (m === 1 ? " min " : " min ") : "";
        const sDisplay = s > 0 ? s + (s === 1 ? " sec" : " sec") : "";
        return hDisplay + mDisplay + sDisplay;
    }


    countPlatforms() {
        const names = this.props.gameScore.games

        const result = [...names.reduce( (mp, o) => {
            if (!mp.has(o.platform)) mp.set(o.platform, Object.assign({ count: 0 }, o));
            mp.get(o.platform).count++;
            return mp;
        }, new Map).values()];
        return result
    }

    render(){
        const game = this.props.clicked
        const { classes } = this.props
        const platformTable = this.countPlatforms().map(platform => (
            <TableBody key={platform.platform}>
                <TableRow>
                    <TableCell component="th" scope="row">
                        {platform.platform}
                    </TableCell>
                    <TableCell className={classes.tbText} align="right">{platform.count}</TableCell>
                    <TableCell align="right">{this.avgTimePlatformMain(platform.count, platform.platform)}</TableCell>
                    <TableCell align="right">{this.avgTimePlatformBonus(platform.count, platform.platform)}</TableCell>
                    <TableCell align="right">{this.avgTimePlatformComp(platform.count, platform.platform)}</TableCell>
                </TableRow>
            </TableBody>
        ))

        return (
            <Grid className={classes.root}>
                    {this.props.clicked.id ?
                        <Grid
                            container
                            justify="space-between"
                            direction="row"
                        >

                                <Grid item xs={12} sm={4} md={3} className={classes.leftContainer}>
                                    <Card className={classes.card}>
                                        <CardActionArea>
                                            <CardMedia
                                                className={classes.media}
                                                image={game.cover ? game.cover.url.replace('t_thumb', 't_720p') : require('../../icons/noImage.jpg')}
                                            />
                                        </CardActionArea>
                                    </Card>
                                    <Grid className={classes.gridMargin}>
                                        <Typography className={classes.textStyle} variant="caption">Platforms:</Typography>
                                        {game.platforms.filter(function(platform) {
                                            if (platform.name.split('.').pop() === "Playstation Network") {
                                                return false; // skip
                                            }
                                                return true;
                                            }).map(platform => (
                                                <Typography key={platform.id} className={classes.textStyle2} variant="caption">
                                                    {platform.name}
                                                </Typography>
                                            ))}
                                    </Grid>
                                    <Divider className={classes.divider} light />
                                    <Grid >
                                        <Grid container direction="row">
                                            <Typography className={classes.textStyle3} variant="caption">Release Year:</Typography>
                                            <Typography variant="caption">
                                                {game.release_dates ?
                                                    Math.min.apply(game.release_dates, game.release_dates.map(find =>(
                                                        find.y
                                                    ))
                                                )
                                                :
                                                "Not found"}
                                            </Typography>
                                        </Grid>
                                        <Grid container direction="row">
                                            <Typography className={classes.textStyle3} variant="caption">Genre(s):</Typography>
                                            {game.genres ?
                                                game.genres.map(genre => (
                                                <Typography key={genre.id} className={classes.textStyle2} variant="caption">
                                                    {genre.name},
                                                </Typography>
                                            ))
                                            :
                                            <Typography className={classes.textStyle2} variant="caption">
                                                "-",
                                            </Typography>
                                            }
                                        </Grid>
                                        <Grid container direction="row">
                                            <Typography className={classes.textStyle3} variant="caption">Developer:</Typography>
                                            <Typography className={classes.textStyle2} variant="caption">
                                                {game.involved_companies ?
                                                    game.involved_companies.find(obj => {
                                                        if(obj.developer === true){
                                                            return obj.developer === true
                                                        }else{
                                                            return obj.developer === false
                                                        }
                                                    }).company.name
                                                    :
                                                    "No company name found"
                                                }
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                    <Divider className={classes.divider} light />
                                    <Grid >
                                        <Typography className={classes.textStyle3} variant="caption">Summary:</Typography>
                                            <Typography className={classes.textStyle2} variant="caption">
                                                {game.summary}
                                            </Typography>
                                    </Grid>
                                </Grid>


                            <Grid
                                item xs={12} sm={8} md={9}
                            >
                                <Grid className={classes.rightContainer}>
                                    <Typography className={classes.textStyle} variant="h4">{game.name}</Typography>
                                    <Typography className={classes.devText} variant="h6">
                                        {game.involved_companies ?
                                            game.involved_companies.find(obj => {
                                                if(obj.developer === true){
                                                    return obj.developer === true
                                                }else{
                                                    return obj.developer === false
                                                }
                                            }).company.name
                                        :
                                            "No company name found"
                                        }
                                    </Typography>
                                    <Grid
                                        container
                                        direction="row"
                                        justify="space-between"
                                        alignItems="flex-end"
                                        className={classes.scoreAndButtonTop}
                                    >
                                        <Grid>
                                            <Grid container alignItems="center" direction="row" >
                                                <Grid container justify="center" alignItems="center" className={classes.scoreBox}>
                                                    <Typography variant="h1">{Math.round(this.props.gameScore.totalAvgScore)}</Typography>
                                                </Grid>
                                                <Grid className={classes.scoreTextBox}>
                                                    <Typography>User Score</Typography>
                                                    <Typography>The avrage score based on<br/>
                                                    <strong>{this.props.gameScore ? this.props.gameScore.count : null} Rating</strong>
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                        </Grid>
                                        <Grid>
                                            <Button
                                                size='large'
                                                className={classes.buttonStyle}
                                                onClick={ () => {
                                                    history.push(`/submitgame_form/game/${this.props.clicked.id}`)
                                                }}
                                            >
                                                <Typography variant="button">Submit your score</Typography>
                                            </Button>
                                        </Grid>
                                    </Grid>
                                    <Divider light/>
                                    <Grid>
                                        <Typography className={classes.textStyle1} variant="h5">Gametime</Typography>
                                        <Divider light/>
                                            <Grid
                                                container
                                                direction="row"
                                                justify="center"
                                                alignItems="center"
                                                className={classes.topGrid}
                                            >
                                                <Grid className={classes.avgHours}>
                                                    <Typography className={classes.avgHoursText} variant="subtitle1">Main Story Complete</Typography>
                                                    <Divider light/>
                                                    <Typography className={classes.avgHoursText} variant="h5">{this.props.gameScore.avgMainStoryHours ? Math.round(this.props.gameScore.avgMainStoryHours) : "-"} Hours</Typography>
                                                </Grid>
                                                <Grid className={classes.avgHours}>
                                                    <Typography className={classes.avgHoursText} variant="subtitle1">Main + Bonus</Typography>
                                                    <Divider light/>
                                                    <Typography className={classes.avgHoursText} variant="h5">{this.props.gameScore.avgMainStoryBonusHours ? Math.round(this.props.gameScore.avgMainStoryBonusHours) : "-"} Hours</Typography>
                                                </Grid>
                                                <Grid className={classes.avgHours}>
                                                    <Typography className={classes.avgHoursText} variant="subtitle1">100% Complete</Typography>
                                                    <Divider light/>
                                                    <Typography className={classes.avgHoursText} variant="h5">{this.props.gameScore.avgCompletionistHours ? Math.round(this.props.gameScore.avgCompletionistHours) : "-"} Hours</Typography>
                                                </Grid>
                                            </Grid>
                                    </Grid>

                                    <Grid className={classes.rootTable}>
                                        <Table className={classes.table}>
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell>Single Player</TableCell>
                                                    <TableCell align="right">Players</TableCell>
                                                    <TableCell align="right">Average</TableCell>
                                                    <TableCell align="right">Fastest</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                <TableRow>
                                                    <TableCell component="th" scope="row">
                                                        Main Story Complete
                                                    </TableCell>
                                                    <TableCell className={classes.tbText} align="right">{this.props.gameScore.playersCountOnMain.filter(x => x).length}</TableCell>
                                                    <TableCell align="right">{Math.round(this.props.gameScore.avgMainStoryHours)} h {Math.round(this.props.gameScore.avgMainStoryMin)} min</TableCell>
                                                    <TableCell align="right">{this.fastestMain() ? this.fastestMain() : "-"}</TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell component="th" scope="row">
                                                        Main Story + Bonus
                                                    </TableCell>
                                                    <TableCell className={classes.tbText} align="right">{this.props.gameScore.playersCountOnBonus.filter(x => x).length}</TableCell>
                                                    <TableCell align="right">{Math.round(this.props.gameScore.avgMainStoryBonusHours)} h {Math.round(this.props.gameScore.avgMainStoryBonusMin)} min</TableCell>
                                                    <TableCell align="right">{this.fastestBonus() ? this.fastestBonus() : "-"}</TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell component="th" scope="row">
                                                        100% Complete!
                                                    </TableCell>
                                                    <TableCell className={classes.tbText} align="right">{this.props.gameScore.playersCountOnCompl.filter(x => x).length}</TableCell>
                                                    <TableCell align="right">{Math.round(this.props.gameScore.avgCompletionistHours)} h {Math.round(this.props.gameScore.avgCompletionistHours)} min</TableCell>
                                                    <TableCell align="right">{this.fastestComp() ? this.fastestComp() : "-"}</TableCell>
                                                </TableRow>
                                            </TableBody>
                                        </Table>
                                    </Grid>

                                    <Grid className={classes.rootTable}>
                                        <Table className={classes.table}>
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell>Platform</TableCell>
                                                    <TableCell align="right">Players</TableCell>
                                                    <TableCell align="right">Main Story</TableCell>
                                                    <TableCell align="right">Main Story + Bonus</TableCell>
                                                    <TableCell align="right">100% Complete</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            {platformTable}
                                        </Table>
                                    </Grid>

                                    <Typography className={classes.textStyle1} variant="h5">Videos </Typography>
                                    <Divider className={classes.divider} light />
                                    <Grid className={classes.videoGrid} container direction="row">
                                        {this.props.clicked.videos ?
                                            this.props.clicked.videos.slice(0, 3).map(video => (
                                                <Grid key={video.video_id} className={classes.playerWrapper} item  xs={12} sm={4}>
                                                    <ReactPlayer
                                                        url={`https://www.youtube.com/watch?v=${video.video_id}`}
                                                        className={classes.reactPlayer}
                                                        controls
                                                        width='100%'
                                                        height='100%'
                                                    />
                                                </Grid>
                                            ))
                                            :
                                            null
                                        }
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        :
                        <Grid container justify="center" className={classes.circularStyle}>
                                <CircularProgress />
                        </Grid>
                    }
            </Grid>
        )
    }
}

const mapStateToProps = (state, ownProps) => ({
    searchResult: state.searchResult.items,
    clicked: state.searchResult.clicked,
    gameScore: state.searchResult.gamescore,
})

export default compose(
  withStyles(styles, { withTheme: true }),
  connect(mapStateToProps, {searchResultClicked, loading, searchResultHead, searchResultGameScore})
)(GameDetailsPage);
