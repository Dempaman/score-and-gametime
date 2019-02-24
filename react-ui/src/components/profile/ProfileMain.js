import React, { Component } from 'react';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import Divider from '@material-ui/core/Divider';
import AccountCircle from '@material-ui/icons/AccountCircle'
import ExitToApp from '@material-ui/icons/ExitToApp'

import history from '../../history.js';
import { logout, getUser, getUserFromMongo } from '../../actions/UserActions';


const styles = theme => ({
    root: {
        margin: "0 auto",
        padding: "60px 20px 70vh 20px",
        maxWidth: 1356,
        backgroundColor: theme.palette.primary.white,
        [theme.breakpoints.down('sm')]: {
            padding: "30px 10px 70vh 10px",
        }
    },
    icon: {
        fontSize: "64px",
        color: "#D3D3D3",
    },
    icon1: {
        fontSize: "24px",
        color: theme.palette.primary.dark03,
        margin: "0 17px 0 2px",
    },
    textStyle: {
        color: "#D3D3D3",
        textTransform: "uppercase",
    },
    textStyle1: {
        color: theme.palette.primary.dark03,
        textTransform: "uppercase",
    },
    buttonStyle: {
        marginTop: 10,
        marginBottom: 50,
        padding: 5,
        border: `1px solid ${theme.palette.primary.white}`,
        '&:hover': {
            border: `1px solid ${theme.palette.primary.dark03}`,
            cursor: "pointer",
        },
    },
    gameWrapper: {
        width: 1356,
        margin: 20,
    },
    containerColor: {
        backgroundColor: theme.palette.primary.white,
    },
    image: {
        width: 80,
        margin: "15px 12px 15px 0px",
        [theme.breakpoints.down('xs')]: {
            width: 100,
        }
    },
    img: {
        margin: 'auto',
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%',
    },
    divider: {
        backgroundColor: theme.palette.secondary.divider,
    },
    absolute: {
        position: "absolute",
        bottom: 0,
        width: "100%",
    },
    noAbsolute: {
        position: "relative",
        width: "100%",
    },
    company: {
        color: "#1e262cb5",
        lineHeight: 1,
        marginBottom: 5,
    },
    subtitle1: {
        fontWeight: 400,
        fontFamily: "Work Sans",
        color: theme.palette.primary.dark03,
        lineHeight: 1.1,

    },
    subtitle3: {
        padding: "0px 10px 0px 0",
        fontWeight: 400,
        fontFamily: "Work Sans",
        color: theme.palette.primary.blue02,
        lineHeight: 1.1,
    },
    extraDiv: {
        [theme.breakpoints.down('xs')]: {
            justifyContent: "center",
        }
    },
    leftCont: {
        paddingRight: 60,
        [theme.breakpoints.down('xs')]: {
            paddingRight: 0,
        }
    },
    textStyle2: {
        color: theme.palette.primary.dark03,
        marginBottom: 7,
    },
    hoursText: {
        marginBottom: 3,
        marginTop: 3,
    },
    timeWrapper: {
        width: 200,
        marginTop: 25,
        [theme.breakpoints.down('xs')]: {
            margin: "25px auto",
        }
    },
    infoCont: {
        borderRadius: "1px",
        backgroundColor: "#80808017",
        padding: 10,
        marginRight: 10,
        [theme.breakpoints.down('xs')]: {
            textAlign: "center",
            justifyContent: "center",
        }
    },
    autoMid: {
        [theme.breakpoints.down('xs')]: {
            margin: "0 auto"
        }
    },
    h3: {
        [theme.breakpoints.down('xs')]: {
            textAlign: "center"
        }
    }
});

class Profile extends Component {
    constructor(props) {
        super(props)
            this.state = {
            }
    }


    componentDidMount() {
        this.props.getUserFromMongo();
        /*if(!this.props.email){
            history.push('/')
        }else {
        }*/
    }

    render(){
        const { classes } = this.props;
        console.log(this.props.user)
        return (
            <Grid
                container
                justify='center'
                className={classes.root}
            >
                <Grid>

                        <Grid
                            container
                            direction="row"
                            justify="center"

                        >
                            <Grid
                                className={classes.leftCont}
                            >
                                <Grid
                                    container
                                    direction="column"
                                    justify="center"
                                    alignItems="center"
                                    >
                                    <AccountCircle className={classes.icon}/>
                                    <Grid>
                                        <Typography variant="subtitle2" className={classes.textStyle}>{this.props.user.displayName}</Typography>
                                    </Grid>
                                    <Grid>
                                        <Typography variant="subtitle2" className={classes.textStyle}>{this.props.user.email}</Typography>
                                    </Grid>
                                    <Divider/>
                                    <Grid className={classes.buttonStyle} container direction="row" alignItems="center" justify="flex-start">
                                        <ButtonBase
                                            onClick={() => {
                                                this.props.logout()
                                                history.push('/')
                                            }
                                        }

                                        >
                                            <ExitToApp className={classes.icon1}/>
                                            <Typography variant="subtitle2" className={classes.textStyle1}>Sign Out</Typography>
                                        </ButtonBase>
                                    </Grid>
                                </Grid>
                            </Grid>
                            {this.props.user.games ?
                            <Grid>
                                <Typography className={classes.h3} variant="h3" >Your playthroughs</Typography>
                                {this.props.user.games.map(game => (
                                    <Grid
                                        key={game.gameId}

                                    >
                                        <Grid className={classes.containerColor}>
                                            <Grid
                                                container
                                                direction="row"
                                                alignItems="center"

                                            >
                                                <Grid className={classes.autoMid}>
                                                    <ButtonBase className={classes.image}>
                                                        <img alt="complex" className={classes.img} src={game.gameData.cover ? game.gameData.cover.url.replace('t_thumb', 't_cover_big') : require('../../icons/noImage.jpg') } />
                                                    </ButtonBase>
                                                </Grid>
                                                <Grid item xs={12} sm container>
                                                  <Grid container direction="column">
                                                    <Grid className={classes.infoCont}>
                                                        <Typography className={classes.subtitle1} variant="subtitle1" >
                                                            {game.gameData.name}
                                                        </Typography>
                                                        <Typography className={classes.subtitle1} variant="subtitle1">
                                                            {game.gameData.release_dates ?
                                                                Math.min.apply(game.gameData.release_dates, game.gameData.release_dates.map(find =>(
                                                                        find.y
                                                                    ))
                                                                )
                                                                :
                                                                "No release date found"
                                                            }
                                                        </Typography>
                                                        <Typography className={classes.company} variant="body2" >
                                                            {game.gameData.involved_companies ?
                                                                game.gameData.involved_companies.find(obj => {
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
                                                        <Grid className={classes.extraDiv} container direction="row">
                                                            <Typography className={classes.subtitle1} variant="subtitle1">Completed on:</Typography>
                                                            &nbsp;
                                                            <Typography className={classes.subtitle3} variant="subtitle1"> {game.platform}</Typography>
                                                        </Grid>
                                                        <Grid className={classes.extraDiv} container direction="row">
                                                            <Typography className={classes.subtitle1} variant="subtitle1">Game added:</Typography>
                                                            &nbsp;
                                                            <Typography className={classes.subtitle3} variant="subtitle1"> {game.date.slice(0, 10)}</Typography>
                                                        </Grid>
                                                    </Grid>
                                                  </Grid>
                                                </Grid>

                                                <Grid className={classes.timeWrapper}>

                                                    <Grid className={classes.timeContainer} container direction="column">
                                                        <Grid  container direction="column" alignItems="center" justify="center">
                                                            <Typography className={classes.hoursText} variant="body2">Main story complete</Typography>
                                                            <Grid container justify="center" alignItems="center" className={classes.userScoreBox}>
                                                                <Typography className={game.mainStory.h < 99  ? classes.textStyle2 : classes.textStyle3} variant="h2">
                                                                    {game.mainStory.h ? `${game.mainStory.h}h ${game.mainStory.m}m ${game.mainStory.s}s   `: "-"}
                                                                </Typography>
                                                            </Grid>
                                                        </Grid>
                                                        <Divider className={classes.divider} light/>
                                                    </Grid>

                                                    <Grid className={classes.timeContainer} container direction="column">
                                                        <Grid  container direction="column" alignItems="center" justify="center">
                                                            <Typography className={classes.hoursText} variant="body2">Main + Bonus</Typography>
                                                            <Grid container justify="center" alignItems="center" className={classes.userScoreBox}>
                                                                <Typography className={classes.textStyle2} variant="h2">
                                                                    {game.mainStoryBonus.h ? `${game.mainStoryBonus.h}h ${game.mainStoryBonus.m}m ${game.mainStoryBonus.s}s   `: "-"}
                                                                </Typography>
                                                            </Grid>
                                                        </Grid>
                                                        <Divider className={classes.divider} light/>
                                                    </Grid>

                                                    <Grid className={classes.timeContainer} container direction="column">
                                                        <Grid  container direction="column" alignItems="center" justify="center">
                                                            <Typography className={classes.hoursText} variant="body2">100% the game!</Typography>
                                                            <Grid container justify="center" alignItems="center" className={classes.userScoreBox}>
                                                                <Typography className={classes.textStyle2} variant="h2">
                                                                    {game.completionist.h ? `${game.completionist.h}h ${game.completionist.m}m ${game.completionist.s}s   `: "-"}
                                                                </Typography>
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>

                                                </Grid>
                                            </Grid>
                                            <Divider className={classes.divider}/>
                                        </Grid>
                                    </Grid>
                                ))}
                            </Grid>
                            :
                            <Grid>
                                <Typography className={classes.h3} variant="h3" >Your playthroughs</Typography>
                                <Typography className={classes.h3} variant="caption" >no games added...</Typography>
                            </Grid>
                        }
                        </Grid>
                </Grid>
            </Grid>
        )
    }
}

const mapStateToProps = (state, ownProps) => ({
    user: state.user.profile,
    email: state.user.email
})

export default compose(
  withStyles(styles),
  connect(mapStateToProps, { logout, getUser, getUserFromMongo })
)(Profile);
