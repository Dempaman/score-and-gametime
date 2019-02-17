import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import compose from 'recompose/compose';

const styles = theme => ({
    image: {
        minHeight: 350,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
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
    },
    textStyle: {
        color: "#fff",
        margin: "0 0 20px 0",
        width: 400,
        textAlign: "center",
        [theme.breakpoints.down('xs')]: {
          fontSize: "1.5em",
          width: 300
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
                {this.props.clicked ?
                    this.props.clicked.slice(1, 2).map(img => (
                        <div key={img.url} className={classes.image} style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),url(${img.url.replace('t_thumb', 't_1080p')})` }}>
                        <div className={classes.alignCenter}>
                            <Grid container justify="center">
                                <Typography className={classes.textStyle} variant="h3">Share Your Playthrough</Typography>
                            </Grid>
                        </div>
                    </div>
                ))
                :
                null
                }
                <Divider className={classes.dividerStyle}/>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => ({
    clicked: state.searchResult.clicked.screenshots,
})

export default compose(
  withStyles(styles, { withTheme: true }),
  connect(mapStateToProps, {})
)(HeaderBackground);
