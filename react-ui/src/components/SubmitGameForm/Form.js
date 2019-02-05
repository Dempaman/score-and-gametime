import React, { Component } from 'react';
import { connect } from 'react-redux';
import 'date-fns';
import axios from 'axios';
import compose from 'recompose/compose';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
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
import { MuiPickersUtilsProvider, TimePicker, DatePicker } from 'material-ui-pickers';

import history from '../../history.js';
import { searchResultClicked, loading  } from '../../actions/SearchActions';
import { submitGame, submitGameTime  } from '../../actions/SubmitGameActions';
import SnackbarContentWrapper from '../snackbarContentWrapper/SnackbarContentWrapper'

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
        margin: "5px 0px 3px 0px",
    },
    textStyle: {
        margin: "15px 0 5px 0"
    },
    filler: {
        width: 250,
        height: 500,
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
        width: 90,
        height: 90,
        backgroundColor: theme.palette.primary.blue03,
        borderRadius: "1px"
    },scoreText: {
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
        marginRight: 10,
    },
    buttonStyle: {
        marginTop: 60,
        marginLeft: 20,
        width: 200,
        backgroundColor: theme.palette.primary.blue01,
        border: '1px solid rgba(255, 255, 255, 0.2)',
    }
});

const platforms = [
  {
    value: 'Nintendo Switch',
    label: 'Nintendo Switch',
  },
  {
    value: 'Playstaion 4',
    label: 'Playstaion 4',
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
                activeStep: 0,
                MainStoryHours: '',
                MainStoryMin: '',
                MainStorySec: '',
                MainStoryBonusHours: '',
                MainStoryBonusMin: '',
                MainStoryBonusSec: '',
                CompletionistHours: '',
                CompletionistMin: '',
                CompletionistSec: '',
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

    componentDidMount() {
        if(!this.props.searchResult.clicked.id){
            this.props.loading(false)
            const id = history.location.pathname.split("/submitgame_form/game/")[1]
            axios({
                url: `https://cors-anywhere.herokuapp.com/https://api-v3.igdb.com//games/${id}?fields=name,genres.name,release_dates.y,summary,storyline,cover.url,screenshots.url,involved_companies.developer,involved_companies.company.name`,
                method: 'GET',
                data: "fields alpha_channel,animated,height,image_id,url,width;"
            })
            .then(res => {
                this.props.searchResultClicked(res.data[0])
                //this.setState({gameData: res.data[0]})
                this.props.loading(true)
            })
            .catch(err => {
                console.error(err);
            });
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

    submitAccount(event) {
        event.preventDefault();
        if (this.props.user.uid) {
            const uid = this.props.user.uid
            const submit =
                {
                    gameId: this.props.clicked.id,
                    platform: this.state.platform,
                    score: (this.state.activeStep + 1)*10,
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
                    }

                }
            this.props.submitGame(submit, uid)
            //history.replace('/')

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
        const { selectedDate } = this.state
        return (
            <Grid className={classes.root}>
                    { this.props.clicked.id ?
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
                                        <img className={classes.image} src={game.cover ? game.cover.url.replace('t_thumb', 't_cover_big') : require('../../icons/noImage.jpg')} />
                                    </Grid>
                                    <Typography className={classes.textStyle} variant="subtitle1">User Stats and Score</Typography>
                                    <Divider light />
                                    <Grid className={classes.gridMargin}>
                                        <Typography variant="subtitle1">Main Storu Completed:</Typography>
                                        <Typography variant="body2">9h 19m</Typography>
                                    </Grid>
                                    <Grid className={classes.gridMargin}>
                                        <Typography variant="subtitle1">Main Story + Bonus</Typography>
                                        <Typography variant="body2">11h 08m</Typography>
                                    </Grid>
                                    <Grid className={classes.gridMargin}>
                                        <Typography variant="subtitle1">100% The Game!</Typography>
                                        <Typography variant="body2">21h 52m</Typography>
                                    </Grid>
                                    <Grid className={classes.gridMargin}>
                                        <Typography variant="subtitle1">Score</Typography>
                                        <Typography variant="body2">86</Typography>
                                    </Grid>
                                </Grid>
                            </Grid>

                            <Grid
                                item xs={12} sm={9}
                                className={classes.rightContainer}
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
                                                            error={this.state.MainStoryHours.length > 4}
                                                            className={classNames(classes.textFieldTime, classes.dense)}
                                                            margin="dense"
                                                            variant="outlined"
                                                            onChange={(event) => { if (event.target.value <= 0) {
                                                                    this.setState({ MainStoryHours: '' })
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
                                                            error={this.state.MainStoryMin.length > 2}
                                                            className={classNames(classes.textFieldTime, classes.dense)}
                                                            margin="dense"
                                                            variant="outlined"
                                                            onChange={(event) => { if (event.target.value <= 0) {
                                                                    this.setState({ MainStoryMin: '' })
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
                                                            error={this.state.MainStorySec.length > 2}
                                                            className={classNames(classes.textFieldTime, classes.dense)}
                                                            margin="dense"
                                                            variant="outlined"
                                                            onChange={(event) => { if (event.target.value <= 0) {
                                                                    this.setState({ MainStorySec: '' })
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
                                                            error={this.state.MainStoryBonusHours.length > 4}
                                                            className={classNames(classes.textFieldTime, classes.dense)}
                                                            margin="dense"
                                                            variant="outlined"
                                                            onChange={(event) => { if (event.target.value <= 0) {
                                                                    this.setState({ MainStoryBonusHours: '' })
                                                                } else {
                                                                    this.setState({ MainStoryBonusHours: Number(event.target.value) })
                                                                }
                                                                }}
                                                        />
                                                        <TextField
                                                            id="outlined-dense"
                                                            label="SS"
                                                            type="number"
                                                            name="MainStoryBonusMin"
                                                            InputProps={{ inputProps: { min: 0, max: 59 } }}
                                                            InputLabelProps={{ shrink: true }}
                                                            error={this.state.MainStoryBonusMin.length > 2}
                                                            className={classNames(classes.textFieldTime, classes.dense)}
                                                            margin="dense"
                                                            variant="outlined"
                                                            onChange={(event) => { if (event.target.value <= 0) {
                                                                    this.setState({ MainStoryBonusMin: '' })
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
                                                            error={this.state.MainStoryBonusSec.length > 2}
                                                            className={classNames(classes.textFieldTime, classes.dense)}
                                                            margin="dense"
                                                            variant="outlined"
                                                            onChange={(event) => { if (event.target.value <= 0) {
                                                                    this.setState({ MainStoryBonusSec: '' })
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
                                                            label="SS"
                                                            type="number"
                                                            name="CompletionistHours"
                                                            InputProps={{ inputProps: { min: 0, max: 9999 } }}
                                                            InputLabelProps={{ shrink: true }}
                                                            error={this.state.CompletionistHours.length > 4}
                                                            className={classNames(classes.textFieldTime, classes.dense)}
                                                            margin="dense"
                                                            variant="outlined"
                                                            onChange={(event) => { if (event.target.value <= 0) {
                                                                    this.setState({ CompletionistHours: '' })
                                                                } else {
                                                                    this.setState({ CompletionistHours: Number(event.target.value) })
                                                                }
                                                                }}
                                                        />
                                                        <TextField
                                                            id="outlined-dense"
                                                            label="SS"
                                                            type="number"
                                                            name="CompletionistMin"
                                                            InputProps={{ inputProps: { min: 0, max: 59 } }}
                                                            InputLabelProps={{ shrink: true }}
                                                            error={this.state.CompletionistMin.length > 2}
                                                            className={classNames(classes.textFieldTime, classes.dense)}
                                                            margin="dense"
                                                            variant="outlined"
                                                            onChange={(event) =>  { if (event.target.value <= 0) {
                                                                    this.setState({ CompletionistMin: '' })
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
                                                            error={this.state.CompletionistSec.length > 2}
                                                            className={classNames(classes.textFieldTime, classes.dense)}
                                                            margin="dense"
                                                            variant="outlined"
                                                            onChange={(event) => { if (event.target.value <= 0) {
                                                                    this.setState({ CompletionistSec: '' })
                                                                } else {
                                                                    this.setState({ CompletionistSec: Number(event.target.value) })
                                                                }
                                                                }
                                                            }
                                                        />
                                                    </Grid>

                                                    <Grid
                                                        container
                                                        direction="row"
                                                        justify="space-between"
                                                        alignItems="center"
                                                      >
                                                        <Typography className={classes.textStyle3} variant="subtitle1">Playthrough Completed on Date:</Typography>
                                                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                                            <Grid className={classes.gridDate}>
                                                                <DatePicker
                                                                    margin="normal"
                                                                    label="Date picker"
                                                                    value={selectedDate}
                                                                    onChange={this.handleDateChange}
                                                                    />
                                                            </Grid>
                                                        </MuiPickersUtilsProvider>
                                                    </Grid>
                                                    <Divider light/>
                                                </Grid>
                                        </Grid>
                                        <Grid>
                                            <Typography className={classes.textStyle} variant="h4">Score</Typography>
                                            <Divider light/>
                                            <Typography className={classes.textStyle1} variant="h5">User Score</Typography>
                                            <Grid container alignItems="center" direction="row" className={classes.topGrid}>
                                                <Grid container justify="center" alignItems="center" className={classes.scoreBox}>
                                                    <Typography variant="display4">86</Typography>
                                                </Grid>
                                                <Grid className={classes.scoreTextBox}>
                                                    <Typography className={classes.scoreText}>User Score</Typography>
                                                    <Typography className={classes.scoreText}>The avrage score based on<br/>
                                                        <strong>323 Rating</strong>
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                            <Typography className={classes.textStyle1} variant="h5">Your Score</Typography>
                                            <Grid container alignItems="center" justify="center" className={classes.topGrid}>
                                                <Grid container justify="center" alignItems="center" className={classes.userScoreBox}>
                                                    <Typography variant="headline">{(this.state.activeStep + 1)*10}</Typography>
                                                </Grid>
                                                <MobileStepper
                                                    variant="dots"
                                                    steps={10}
                                                    position="static"
                                                    activeStep={this.state.activeStep}
                                                    className={classes.mobileStepper}
                                                    nextButton={
                                                        <Button size="small" onClick={this.handleNext} disabled={this.state.activeStep === 9}>
                                                            Next
                                                            {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
                                                        </Button>
                                                    }
                                                    backButton={
                                                        <Button size="small" onClick={this.handleBack} disabled={this.state.activeStep === 0}>
                                                            {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
                                                            Back
                                                        </Button>
                                                    }
                                                />
                                            </Grid>

                                            <Button type='submit' size='large' className={classes.buttonStyle}>
                                                <Typography variant="button">Submit</Typography>
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
                        <CircularProgress/>
                    }
            </Grid>
        )
    }
}

const mapStateToProps = (state, ownProps) => ({
    searchResult: state.searchResult,
    clicked: state.searchResult.clicked,
    user: state.user
})

export default compose(
  withStyles(styles, { withTheme: true }),
  connect(mapStateToProps, {searchResultClicked, loading, submitGame, submitGameTime})
)(Form);
