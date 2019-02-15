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
import TextField from '@material-ui/core/TextField';
import MobileStepper from '@material-ui/core/MobileStepper';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import classNames from 'classnames';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, DatePicker } from 'material-ui-pickers';
import Slider, { defaultValueReducer } from '@material-ui/lab/Slider';

import history from '../../history.js';
import { searchResultClicked, loading, searchResultHead, searchResultGameScore  } from '../../actions/SearchActions';
import { submitGame } from '../../actions/SubmitGameActions';
import SnackbarContentWrapper from '../snackbarContentWrapper/SnackbarContentWrapper'

const styles = theme => ({
    root: {
        margin: "0 auto",
        padding: "10px 20px 100px 20px",
        maxWidth: 1356,
        backgroundColor: theme.palette.primary.main,
        [theme.breakpoints.down('sm')]: {
            padding: "10px 10px 100px 10px",
        }
    },
    image: {
        position: "absolute",
        width: 250,
        top: 200,
        [theme.breakpoints.down('xs')]: {
         fontSize: "0.7rem",
         left: "50%",
         marginLeft: -100,
         top: 210,
         width: 200,
        },
    },
    leftContainer: {
        marginTop: 112,
        marginRight: 20,
        width: 250,
        [theme.breakpoints.down('sm')]: {
         fontSize: "0.7rem",
         width: "100%",
        },
        [theme.breakpoints.down('xs')]: {
         marginTop: 185,
        },
    },
    gridMargin: {
        margin: "5px 0px 3px 0px",
    },
    textStyle: {
        margin: "15px 0 5px 0"
    },
    textStyle1: {
        marginTop: 20,
        padding: 10,
        backgroundColor: theme.palette.primary.dark02
    },
    textStyle2: {
        marginTop: 20
    },
    textStyle3: {
        marginTop: 40
    },
    topGrid: {
        overflowX: "hidden",
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
    textFieldTime: {
        width: 100,
        marginLeft: 10,
        marginRight: 10,
    },
    dense: {
        marginTop: 16,
    },
    menu: {
        width: 200,
    },
    optionStyle: {
        backgroundColor: theme.palette.primary.main
    },
    gridDate: {
        marginRight:20
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
    },
    mobileStepper: {
        maxWidth: 600,
        flexGrow: 1,
    },
    userScoreBox: {
        width: 48,
        height: 48,
        backgroundImage: theme.palette.secondary.orangeButton,
        borderRadius: "1px",
        marginBottom: 10,
    },
    buttonStyle: {
        marginTop: 60,
        marginLeft: 20,
        width: 200,
        backgroundColor: theme.palette.primary.blue01,
        border: '1px solid rgba(255, 255, 255, 0.2)',
    },
    circularStyle: {
        marginTop: 50,
    },
    slider: {
        width: 500,
        margin: 20,
        [theme.breakpoints.down('sm')]: {
         width: 280,
         margin: "20px 0px",
        },
    },
});

const platforms = [
  {
    value: 'Nintendo Switch',
    label: 'Nintendo Switch',
  },
  {
    value: 'Playstation 4',
    label: 'Playstation 4',
  },
  {
    value: 'Xbox One',
    label: 'Xbox One',
  },
  {
    value: 'PC',
    label: 'PC',
  },
  {
    value: 'Other..',
    label: 'Other..',
  },
];

class Form extends Component {
    constructor(props) {
        super(props)
            this.state = {
                platform: 'Nintendo Switch',
                selectedDate: new Date(),
                value: 0,
                MainStoryHours: null,
                MainStoryMin: null,
                MainStorySec: null,
                MainStoryBonusHours: null,
                MainStoryBonusMin: null,
                MainStoryBonusSec: null,
                CompletionistHours: null,
                CompletionistMin: null,
                CompletionistSec: null,
                open: false,
                error: ''
            }
    }

    handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
      this.setState({
          open: false,
      });
    };

    handleSlider = (event, value) => {
    this.setState({ value });
  };

    valueReducer(rawValue, props, event) {
        const { disabled, max, min, step } = props;

        function roundToStep(number) {
            return Math.round(number / step) * step;
        }
        if (!disabled && step) {
            if (rawValue > min && rawValue < max) {
                if (rawValue === max - step) {
                    // If moving the Slider using arrow keys and value is formerly an maximum edge value
                    return roundToStep(rawValue + step / 2);
                }
                if (rawValue === min + step) {
                    // Same for minimum edge value
                    return roundToStep(rawValue - step / 2);
                }
                return roundToStep(rawValue);
            }
            return rawValue;
        }

        return defaultValueReducer(rawValue, props, event);
    }

    componentWillMount() {
        const id = history.location.pathname.split("/submitgame_form/game/")[1]
        if(!this.props.clicked.id){
            this.props.loading(false)
            axios({
                url: `https://cors-anywhere.herokuapp.com/https://api-v3.igdb.com//games/${id}?fields=name,genres.name,release_dates.y,videos.video_id,platforms.name,popularity,summary,storyline,cover.url,screenshots.url,involved_companies.developer,involved_companies.company.name`,
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
    const id = history.location.pathname.split("/submitgame_form/game/")[1]
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

    convertTime = (num) => {
        const h = Math.floor(num/60)
        const m = num%60
        return (`${h} hours ${m} min`.toString())

    }

    submitAccount(event) {
        event.preventDefault();
        if (this.props.user.uid && this.state.value >= 10) {
            const uid = this.props.user.uid
            const submit =
                {
                    gameId: this.props.clicked.id,
                    platform: this.state.platform,
                    score: this.state.value,
                    date: this.state.selectedDate,
                    mainStory: {
                        h: this.state.MainStoryHours,
                        m: this.state.MainStoryMin,
                        s: this.state.MainStorySec
                    },
                    mainStoryBonus: {
                        h: this.state.MainStoryBonusHours,
                        m: this.state.MainStoryBonusMin,
                        s: this.state.MainStoryBonusSec
                    },
                    completionist : {
                        h: this.state.CompletionistHours,
                        m: this.state.CompletionistMin,
                        s: this.state.CompletionistSec
                    },
                    gameData: this.props.clicked

                }
            this.props.submitGame(submit, uid)
            history.replace('/')

        } else {
            this.setState({
              error: 'You need to login or create an account to submit',
              open: true
            });
        }
    }

    render(){
        const { classes, theme } = this.props
        const game = this.props.clicked
        const { selectedDate, value } = this.state

        return (
            <Grid className={classes.root}>
                    { this.props.clicked.id ?
                        <Grid
                            container
                            justify="space-between"
                            direction="row"
                        >
                            <Grid item xs={12} sm={3} container>
                                <Grid className={classes.leftContainer}>
                                    <Grid>
                                        <img alt="" className={classes.image} src={game.cover ? game.cover.url.replace('t_thumb', 't_cover_big') : require('../../icons/noImage.jpg')} />
                                    </Grid>
                                    <Typography className={classes.textStyle} variant="subtitle1">User Stats and Score</Typography>
                                    <Divider light />
                                    <Grid className={classes.gridMargin}>
                                        <Typography variant="subtitle1">Main Story Completed:</Typography>
                                        <Typography variant="body2">{this.props.gameScore ? this.convertTime(this.props.gameScore.avgMainStoryHours*60 + this.props.gameScore.avgMainStoryMin) : "-" }</Typography>
                                    </Grid>
                                    <Grid className={classes.gridMargin}>
                                        <Typography variant="subtitle1">Main Story + Bonus</Typography>
                                        <Typography variant="body2">{this.props.gameScore ? this.convertTime(this.props.gameScore.avgMainStoryBonusHours*60 + this.props.gameScore.avgMainStoryBonusHours) : "-" }</Typography>
                                    </Grid>
                                    <Grid className={classes.gridMargin}>
                                        <Typography variant="subtitle1">100% The Game!</Typography>
                                        <Typography variant="body2">{this.props.gameScore ? this.convertTime(this.props.gameScore.completionistHours*60 + this.props.gameScore.completionistMin) : "-"}</Typography>
                                    </Grid>
                                    <Grid className={classes.gridMargin}>
                                        <Typography variant="subtitle1">Score</Typography>
                                        <Typography variant="body2">{this.props.gameScore ? this.props.gameScore.totalAvgScore : "-"}</Typography>
                                    </Grid>
                                </Grid>
                            </Grid>

                            <Grid
                                item xs={12} sm={9}
                            >
                                <form onSubmit={(event) => this.submitAccount(event)} >
                                    <Grid>
                                        <Typography className={classes.textStyle} variant="h4">Submit Game Data</Typography>
                                        <Divider light/>
                                        <Grid>
                                            <Typography className={classes.textStyle1} variant="h5">{game.name}</Typography>
                                                <Grid className={classes.topGrid}>
                                                    <Typography variant="subtitle1">Platform</Typography>
                                                    <Divider light/>
                                                    <TextField
                                                      id="outlined-select-platform-native"
                                                      select
                                                      label="Native select"
                                                      className={classes.textField}
                                                      value={this.state.platform}
                                                      onChange={this.handleChange('platform')}
                                                      SelectProps={{
                                                        native: true,
                                                        MenuProps: {
                                                          className: classes.menu,
                                                        },
                                                      }}
                                                      helperText="Select your platform"
                                                      margin="normal"
                                                      variant="outlined"
                                                    >
                                                      {platforms.map(option => (
                                                        <option className={classes.optionStyle} key={option.value} value={option.value}>
                                                          {option.label}
                                                        </option>
                                                      ))}
                                                    </TextField>

                                                </Grid>
                                        </Grid>

                                        <Grid>
                                            <Typography className={classes.textStyle1} variant="h5">Completed</Typography>
                                                <Grid className={classes.topGrid}>
                                                    <Typography variant="subtitle1">Main Story Completed (Bonus Missions skipped / Quests skipped)</Typography>
                                                    <Divider light/>
                                                    <Grid container direction="row">
                                                        <TextField
                                                            id="outlined-dense"
                                                            label="HHH"
                                                            type="number"
                                                            name="MainStoryHours"
                                                            InputProps={{ inputProps: { min: 0, max: 9999 } }}
                                                            InputLabelProps={{ shrink: true }}
                                                            className={classNames(classes.textFieldTime, classes.dense)}
                                                            margin="dense"
                                                            variant="outlined"
                                                            onChange={(event) => { if (event.target.value <= 0) {
                                                                    this.setState({ MainStoryHours: null })
                                                                } else {
                                                                    this.setState({ MainStoryHours: Number(event.target.value) })
                                                                }
                                                                }}
                                                        />
                                                        <TextField
                                                            id="outlined-dense"
                                                            label="MM"
                                                            type="number"
                                                            name="MainStoryMin"
                                                            InputProps={{ inputProps: { min: 0, max: 59 } }}
                                                            InputLabelProps={{ shrink: true }}
                                                            className={classNames(classes.textFieldTime, classes.dense)}
                                                            margin="dense"
                                                            variant="outlined"
                                                            onChange={(event) => { if (event.target.value <= 0) {
                                                                    this.setState({ MainStoryMin: null })
                                                                } else {
                                                                    this.setState({ MainStoryMin: Number(event.target.value) })
                                                                }
                                                                }}
                                                        />
                                                        <TextField
                                                            id="outlined-dense"
                                                            label="SS"
                                                            type="number"
                                                            name="MainStorySec"
                                                            InputProps={{ inputProps: { min: 0, max: 59 } }}
                                                            InputLabelProps={{ shrink: true }}
                                                            className={classNames(classes.textFieldTime, classes.dense)}
                                                            margin="dense"
                                                            variant="outlined"
                                                            onChange={(event) => { if (event.target.value <= 0) {
                                                                    this.setState({ MainStorySec: null })
                                                                } else {
                                                                    this.setState({ MainStorySec: Number(event.target.value) })
                                                                }
                                                                }}
                                                        />
                                                    </Grid>

                                                    <Typography className={classes.textStyle2} variant="subtitle1">Main Story Completed  + Bonus Missions / Quests</Typography>
                                                    <Divider light/>
                                                    <Grid container direction="row">
                                                        <TextField
                                                            id="outlined-dense"
                                                            label="HHH"
                                                            type="number"
                                                            name="MainStoryBonusHours"
                                                            InputProps={{ inputProps: { min: 0, max: 9999 } }}
                                                            InputLabelProps={{ shrink: true }}
                                                            className={classNames(classes.textFieldTime, classes.dense)}
                                                            margin="dense"
                                                            variant="outlined"
                                                            onChange={(event) => { if (event.target.value <= 0) {
                                                                    this.setState({ MainStoryBonusHours: null })
                                                                } else {
                                                                    this.setState({ MainStoryBonusHours: Number(event.target.value) })
                                                                }
                                                                }}
                                                        />
                                                        <TextField
                                                            id="outlined-dense"
                                                            label="MM"
                                                            type="number"
                                                            name="MainStoryBonusMin"
                                                            InputProps={{ inputProps: { min: 0, max: 59 } }}
                                                            InputLabelProps={{ shrink: true }}
                                                            className={classNames(classes.textFieldTime, classes.dense)}
                                                            margin="dense"
                                                            variant="outlined"
                                                            onChange={(event) => { if (event.target.value <= 0) {
                                                                    this.setState({ MainStoryBonusMin: null })
                                                                } else {
                                                                    this.setState({ MainStoryBonusMin: Number(event.target.value) })
                                                                }
                                                                }}
                                                        />
                                                        <TextField
                                                            id="outlined-dense"
                                                            label="SS"
                                                            type="number"
                                                            name="MainStoryBonusSec"
                                                            InputProps={{ inputProps: { min: 0, max: 59 } }}
                                                            InputLabelProps={{ shrink: true }}
                                                            className={classNames(classes.textFieldTime, classes.dense)}
                                                            margin="dense"
                                                            variant="outlined"
                                                            onChange={(event) => { if (event.target.value <= 0) {
                                                                    this.setState({ MainStoryBonusSec: null })
                                                                } else {
                                                                    this.setState({ MainStoryBonusSec: Number(event.target.value) })
                                                                }
                                                                }}
                                                        />
                                                    </Grid>

                                                    <Typography className={classes.textStyle2} variant="subtitle1">100% Completed the game! Everything Collected and Bonus Missions Finished</Typography>
                                                    <Divider light/>
                                                    <Grid container direction="row">
                                                        <TextField
                                                            id="outlined-dense"
                                                            label="HHH"
                                                            type="number"
                                                            name="CompletionistHours"
                                                            InputProps={{ inputProps: { min: 0, max: 9999 } }}
                                                            InputLabelProps={{ shrink: true }}
                                                            className={classNames(classes.textFieldTime, classes.dense)}
                                                            margin="dense"
                                                            variant="outlined"
                                                            onChange={(event) => { if (event.target.value <= 0) {
                                                                    this.setState({ CompletionistHours: null })
                                                                } else {
                                                                    this.setState({ CompletionistHours: Number(event.target.value) })
                                                                }
                                                                }}
                                                        />
                                                        <TextField
                                                            id="outlined-dense"
                                                            label="MM"
                                                            type="number"
                                                            name="CompletionistMin"
                                                            InputProps={{ inputProps: { min: 0, max: 59 } }}
                                                            InputLabelProps={{ shrink: true }}
                                                            className={classNames(classes.textFieldTime, classes.dense)}
                                                            margin="dense"
                                                            variant="outlined"
                                                            onChange={(event) =>  { if (event.target.value <= 0) {
                                                                    this.setState({ CompletionistMin: null })
                                                                } else {
                                                                    this.setState({ CompletionistMin: Number(event.target.value) })
                                                                }
                                                                }}
                                                        />
                                                        <TextField
                                                            id="outlined-dense"
                                                            label="SS"
                                                            type="number"
                                                            name="CompletionistSec"
                                                            InputProps={{ inputProps: { min: 0, max: 59 } }}
                                                            InputLabelProps={{ shrink: true }}
                                                            className={classNames(classes.textFieldTime, classes.dense)}
                                                            margin="dense"
                                                            variant="outlined"
                                                            onChange={(event) => { if (event.target.value <= 0) {
                                                                    this.setState({ CompletionistSec: null })
                                                                } else {
                                                                    this.setState({ CompletionistSec: Number(event.target.value) })
                                                                }
                                                                }
                                                            }
                                                        />
                                                    </Grid>

                                                    <Grid
                                                        container
                                                        direction="column"
                                                      >
                                                        <Typography className={classes.textStyle3} variant="subtitle1">Playthrough Completed on:</Typography>
                                                        <Divider light/>
                                                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                                            <Grid className={classes.gridDate}>
                                                                <DatePicker
                                                                    margin="normal"
                                                                    value={selectedDate}
                                                                    onChange={this.handleDateChange}
                                                                    />
                                                            </Grid>
                                                        </MuiPickersUtilsProvider>
                                                    </Grid>
                                                </Grid>
                                        </Grid>
                                        <Grid>
                                            <Typography className={classes.textStyle} variant="h4">Score</Typography>
                                            <Divider light/>
                                            <Typography className={classes.textStyle1} variant="h5">User Score</Typography>
                                            <Grid container alignItems="center" direction="row" className={classes.topGrid}>
                                                <Grid container justify="center" alignItems="center" className={classes.scoreBox}>
                                                    <Typography variant="display4">{this.props.gameScore ? Math.round(this.props.gameScore.totalAvgScore) : "-"}</Typography>
                                                </Grid>
                                                <Grid className={classes.scoreTextBox}>
                                                    <Typography className={classes.scoreText}>User Score</Typography>
                                                    <Typography className={classes.scoreText}>The avrage score based on<br/>
                                                        <strong>{this.props.gameScore ? this.props.gameScore.count : 0} Rating</strong>
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                            <Typography className={classes.textStyle1} variant="h5">How would you rate this game?</Typography>
                                            <Grid container direction="column" alignItems="center" justify="center" className={classes.topGrid}>
                                                <Typography variant="caption">slide here to rate the game</Typography>
                                                    <div className={classes.slider}>
                                                        <Slider
                                                            value={value}
                                                            valueReducer={this.valueReducer}
                                                            min={0}
                                                            max={100}
                                                            step={10}
                                                            onChange={this.handleSlider}
                                                            />
                                                    </div>
                                                    <Grid container justify="center" alignItems="center" className={classes.userScoreBox}>
                                                        <Typography variant="headline">{this.state.value}</Typography>
                                                    </Grid>
                                                    <Typography variant="caption">Your rating</Typography>
                                            </Grid>

                                            <Button type='submit' size='large' className={classes.buttonStyle}>
                                                <Typography variant="button">Submit my stats</Typography>
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

                                    </Grid>
                                </form>
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
    gameScore: state.searchResult.gamescore,
    clicked: state.searchResult.clicked,
    user: state.user
})

export default compose(
  withStyles(styles, { withTheme: true }),
  connect(mapStateToProps, {searchResultClicked, loading, submitGame, searchResultHead, searchResultGameScore})
)(Form);
