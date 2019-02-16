import React, { Component } from 'react';
import SearchBar from './SearchBar';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    image: {
        minHeight: 350,
        backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(https://images.unsplash.com/photo-1519326844852-704caea5679e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2034&q=80)",
        //Photo is borrowed from https://unsplash.com/@serumfabian //
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "bottom",
        position: "relative",
        [theme.breakpoints.down('xs')]: {
          minHeight: 250,
        },
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
    dividerStyle: {
        height: 4,
        backgroundImage: theme.palette.secondary.orangeButton
    }
});

class HeaderBackground extends Component {
    render(){
        const { classes } = this.props;
        return (
            <div>
                <div className={classes.image}>
                    <div className={classes.alignCenter}>
                        <Grid container justify="center">
                            <Typography className={classes.textStyle} variant="h4">Share Your Playthroughs</Typography>
                        </Grid>
                        <SearchBar placeholder="Search For Game Title"/>
                    </div>
                </div>
                <Divider className={classes.dividerStyle}/>
            </div>
        )
    }
}

export default withStyles(styles)(HeaderBackground);
