import React, { Component } from 'react';
import compose from 'recompose/compose';
import { connect } from 'react-redux'
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import ButtonBase from '@material-ui/core/ButtonBase';
import { withStyles } from '@material-ui/core/styles';
import withWidth, { isWidthUp } from '@material-ui/core/withWidth'

import SGT from '../../icons/Scoreandgametime.js'
import SGTSmall from '../../icons/ScoreandgametimeSMALL.js'
import history from '../../history.js';

const styles = theme => ({
    headerStyle: {
        margin: '20px 0 30px 0',
    },
    dividerStyle: {
        maxWidth: 800,
        margin: '0 auto'
    }
});

class HeadSignText extends Component {
    render(){
        const { classes } = this.props;
        return (
            <Grid>
                <Grid
                    container
                    justify="center"
                    className={classes.headerStyle}
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
                    <Typography variant='h5'>Create An Account</Typography>
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
)(HeadSignText);
