import React, { Component } from 'react';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Divider from '@material-ui/core/Divider';

import games from './fakedata.js'
import history from '../../history.js';
import { searchResultClicked } from '../../actions/SearchActions';

const styles = theme => ({
    root: {
    },
    gameWrapper: {
        width: 1356,
        margin: 20,
        backgroundColor: theme.palette.primary.main,
    },
    image: {
        width: 80,
        margin: "25px 12px 25px 25px"
    },
    divider: {
        backgroundColor: theme.palette.secondary.divider,
    }

});

class SearchResult extends Component {

    setClickedGame = (game, id) => {
        this.props.searchResultClicked(game)
        history.push(`/submitgame_form/game/${id}`)
    }

    render(){
        const { classes } = this.props;
        //games = this.props.searchResult.item
        const postItems = this.props.searchResult.item.map(game => (
            <Grid
                key={game.id}
                onClick={ () => this.setClickedGame(game, game.id) }
            >
                <Grid
                    container
                    direction="row"
                    alignItems="center"
                    >
                    <Grid>
                        <img alt="" className={classes.image} src={game.cover ? game.cover.url.replace('t_thumb', 't_cover_big') : require('../../icons/noImage.jpg') } />
                    </Grid>
                    <Grid>
                        <Typography variant="subtitle1" >
                            {game.name}
                        </Typography>
                        <Typography variant="button">
                            {game.release_dates ?
                                Math.min.apply(game.release_dates, game.release_dates.map(find =>(
                                        find.y
                                    ))
                                )
                                :
                                "No release date found"
                            }
                        </Typography>
                        <Typography variant="body1" >
                            {game.involved_companies ?
                                game.involved_companies.find(obj => {
                                    return obj.developer === true
                                }).company.name
                                :
                                "No company name found"
                            }
                        </Typography>
                    </Grid>
                </Grid>
                <Divider className={classes.divider} variant="middle"/>
            </Grid>
        ))

        return (
            <Grid
                container
                justify="center"
                className={classes.root}
            >
                {!this.props.searchResult.loading ?
                    <CircularProgress/>
                    :
                    <Grid className={classes.gameWrapper}>
                        {postItems}
                    </Grid>
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
  connect(mapStateToProps, {searchResultClicked})
)(SearchResult);
