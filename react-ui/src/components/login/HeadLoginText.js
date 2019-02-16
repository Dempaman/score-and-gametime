import React, { Component } from 'react';
import compose from 'recompose/compose';
import { connect } from 'react-redux'
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import SGT from '../../icons/Scoreandgametime.js'
import SGTSmall from '../../icons/ScoreandgametimeSMALL.js'
import { withStyles } from '@material-ui/core/styles'
import withWidth, { isWidthUp } from '@material-ui/core/withWidth'

import history from '../../history.js';

const styles = theme => ({
    headerStyle: {
        margin: '0 0 30px 0',
    },
    welcomeText: {
        color: "#fff"
    },
    dividerStyle: {
        backgroundColor: "#ffffff30",
    }
});

class HeadLoginText extends Component {
    render(){
        const { classes } = this.props;
        return (
            <Grid>
                <Grid
                    container
                    justify="center"
                    className={classes.headerStyle}
                    direction="column"
                >
                    <Grid container justify="center">
                        <ButtonBase
                            onClick={ () => {
                                history.push('/')
                            }}
                        >
                            {(isWidthUp('sm', this.props.width)) ? <SGT/> : <SGTSmall/> }
                        </ButtonBase>
                    </Grid>
                    <Grid container justify="center">
                        <Typography className={classes.welcomeText} variant="h5">Welcome</Typography>
                    </Grid>
                </Grid>
                <Divider className={classes.dividerStyle} light variant="middle"/>
            </Grid>
        )
    }
}

const mapStateToProps = (state, ownProps) => ({
})

export default compose(
  withStyles(styles),
  withWidth(),
  connect(mapStateToProps, {})
)(HeadLoginText);
