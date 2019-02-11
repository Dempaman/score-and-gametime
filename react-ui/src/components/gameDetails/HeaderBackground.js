import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import { withStyles } from '@material-ui/core/styles';
import compose from 'recompose/compose';
import { connect } from 'react-redux';

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
        margin: "0 0 20px 0",
        [theme.breakpoints.down('xs')]: {
          fontSize: "1.5em",
        },
    },
    dividerStyle: {
        height: 4,
        backgroundColor: theme.palette.primary.blue03
    }
});

class HeaderBackground extends Component {
    render(){
        const { classes } = this.props;
        return (
            <div>
                {this.props.clicked ?
                    this.props.clicked.slice(0, 1).map(img => (
                        <div key={img.url} className={classes.image} style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),url(${img.url.replace('t_thumb', 't_1080p')})` }}>
                        <div className={classes.alignCenter}>
                            <Grid container justify="center">
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
