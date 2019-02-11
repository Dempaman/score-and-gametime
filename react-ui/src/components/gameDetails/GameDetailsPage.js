import React, { Component } from 'react';
import { connect } from 'react-redux';
import 'date-fns';
import axios from 'axios';
import compose from 'recompose/compose';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';

import history from '../../history.js';
import { searchResultClicked, loading, searchResultHead, searchResultGameScore  } from '../../actions/SearchActions';

const styles = theme => ({
    root: {
        margin: "0 auto",
        padding: "10px 20px 100px 20px",
        maxWidth: 1356,
        backgroundColor: theme.palette.primary.main,
    },
    formContainer: {
    },
    image: {
        width: "100%",
    },
    leftContainer: {
        position: "absolute",
        top: "270px",
        width: 250
    },
    rightContainer: {

    },
    gridMargin: {
        margin: "8px 0px 0px 0px",
    },
    filler: {
        width: 250,
        height: 500,
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
        padding: 20,
        backgroundColor: theme.palette.primary.dark01
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
    scoreText: {
        color: "#fff"
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
        backgroundImage: theme.palette.secondary.orangeButton,
        border: '1px solid #fff',
        '&:hover': {
            backgroundImage: "none",
        },
    },
    circularStyle: {
        marginTop: 50,
    },
    scoreAndButtonTop: {
        margin: "40px 0 8px 0",
    },
    divider: {
        margin: "5px 0 5px 0"
    }
});

class GameDetailsPage extends Component {
    constructor(props) {
        super(props)
            this.state = {
                open: false,
                error: ''
            }
    }

    handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
      this.setState({
          open: false
      });
    };

    componentWillMount() {
        const id = history.location.pathname.split("/game_details/")[1]
        if(!this.props.clicked.id){
            this.props.loading(false)
            axios({
                url: `https://cors-anywhere.herokuapp.com/https://api-v3.igdb.com//games/${id}?fields=name,genres.name,release_dates.y,platforms.name,popularity,summary,storyline,cover.url,screenshots.url,involved_companies.developer,involved_companies.company.name`,
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
        console.log(result)
        this.props.searchResultGameScore(result[0])
     }
 }

    handleChange = name => event => {
        this.setState({
          [name]: event.target.value,
      }, () => {

      });
    };

    handleDateChange = date => {
        this.setState({ selectedDate: date });
    };

    handleNext = () => {
        this.setState(state => ({
          activeStep: state.activeStep + 1,
        }));
    };

    handleBack = () => {
        this.setState(state => ({
          activeStep: state.activeStep - 1,
        }));
    };

    render(){
        const game = this.props.clicked
        const { classes } = this.props
        console.log(game)
        return (
            <Grid className={classes.root}>
                    {this.props.clicked.id ?
                        <Grid
                            container
                            justify="space-between"
                            direction="row"
                            className={classes.formContainer}
                        >
                            <Grid item xs={12} sm={3} container className={classes.filler}>
                                <Grid
                                    container
                                    justify="center"
                                    direction="column"
                                    className={classes.leftContainer}
                                >
                                    <Grid>
                                        <img alt="" className={classes.image} src={game.cover ? game.cover.url.replace('t_thumb', 't_cover_big') : require('../../icons/noImage.jpg')} />
                                    </Grid>
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
                                            {game.genres.map(genre => (
                                                <Typography key={genre.id} className={classes.textStyle2} variant="caption">
                                                    {genre.name},
                                                </Typography>
                                            ))}
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
                            </Grid>

                            <Grid
                                item xs={12} sm={9}
                                className={classes.rightContainer}
                            >
                                <Grid>
                                    <Typography className={classes.textStyle} variant="h4">{game.name}</Typography>
                                    <Typography variant="caption">
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
                                                    <Typography variant="display4">{this.props.gameScore ? this.props.gameScore.totalAvgScore : null}</Typography>
                                                </Grid>
                                                <Grid className={classes.scoreTextBox}>
                                                    <Typography className={classes.scoreText}>User Score</Typography>
                                                    <Typography className={classes.scoreText}>The avrage score based on<br/>
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
                                            <Grid className={classes.topGrid}>
                                                // TABELL HÄR!! //
                                            </Grid>
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
