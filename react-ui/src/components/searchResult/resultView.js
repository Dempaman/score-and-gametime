import React, { Component } from 'react';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

import { searchResultHead  } from '../../actions/SearchActions';
import history from '../../history.js';

const styles = theme => ({
    root: {
    },
    gameWrapper: {
        width: 1356,
        margin: 20,
        backgroundColor: theme.palette.primary.dark02
    },

});

class ResultView extends Component {

    componentWillMount() {
        this.props.searchResultHead();
    }

    render(){
        const { classes } = this.props;

        return (
            <Grid
                container
                justify="center"
                className={classes.root}
            >
                <Grid className={classes.gameWrapper}>
                    {this.props.searchResult.items.count}
                </Grid>
            </Grid>
        )
    }
}

const mapStateToProps = (state, ownProps) => ({
    searchResult: state.searchResult,
})

export default compose(
  withStyles(styles),
  connect(mapStateToProps, {searchResultHead})
)(ResultView);
