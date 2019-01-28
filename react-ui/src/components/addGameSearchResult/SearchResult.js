import React, { Component } from 'react';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Divider from '@material-ui/core/Divider';

import games from './fakedata.js'
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
    constructor(props) {
        super(props)
            this.state = {
                email: '',
                clickedGame: []
            }
    }

    setClickedGame = (game) => {
        this.props.searchResultClicked(game)
    }

    render(){
        const { classes } = this.props;
        //games = this.props.searchResult.item
        const postItems = games.map(game => (
            <Grid
                key={game.id}
                onClick={ () => this.setClickedGame(game) }
            >
                <Grid
                    container
                    direction="row"
                    alignItems="center"
                    >
                    <Grid>
                        <img className={classes.image} src={game.cover.url.replace('t_thumb', 't_cover_big')} />
                    </Grid>
                    <Grid>
                        <Typography variant="subtitle1" >
                            {game.name}
                        </Typography>
                        <Typography variant="button">
                            {
                                Math.min.apply(game.release_dates, game.release_dates.map(find =>(
                                    find.y
                                    ))
                                )
                            }
                        </Typography>
                        <Typography variant="body1" >
                            {
                                game.involved_companies.find(obj => {
                                    return obj.developer === true
                                }).company.name
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
                    <CircularProgress className={classes.progress} />
                    :
                    <Grid

                        className={classes.gameWrapper}
                    >
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
