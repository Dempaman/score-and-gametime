import React, { Component } from 'react';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = theme => ({
    root: {
        margin: '25px 0 15px 0',
    },
});

class SearchResult extends Component {
    constructor(props) {
        super(props)
            this.state = {
                email: '',
            }
    }

    render(){
        const { classes } = this.props;
        const postItems = this.props.searchResult.item.map(post => (
            <Typography variant="subtitle1" key={post.id}>
                {post.name}
            </Typography>
        ))

        return (
            <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
            >
                {!this.props.searchResult.loading ?
                    <CircularProgress className={classes.progress} />
                    :
                    <div>{postItems}</div>
                }
            </Grid>
        )
    }
}

const mapStateToProps = (state, ownProps) => ({
    searchResult: state.searchResult,
})

export default compose(
  withStyles(styles),
  connect(mapStateToProps, {})
)(SearchResult);
