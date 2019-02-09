import React, { Component } from 'react';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Divider from '@material-ui/core/Divider';
import ButtonBase from '@material-ui/core/ButtonBase';

import history from '../../history.js';
import { searchResultClicked, searchResultGameScore } from '../../actions/SearchActions';

const styles = theme => ({
    root: {
        paddingLeft: 20,
        margin: "0 auto"
    },
    gameWrapper: {
        width: 1356,
        margin: 20,
        backgroundColor: theme.palette.primary.main,
    },
    image: {
        width: 80,
        margin: "15px 12px 15px 0px"
    },
    img: {
        margin: 'auto',
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%',
    },
    divider: {
        backgroundColor: theme.palette.secondary.divider,
        marginTop: 5,
        marginBottom: 5,
    }

});

class SearchResult extends Component {


    setClickedGame = (game, id) => {
        this.props.searchResultClicked(game)
        history.push(`/submitgame_form/game/${id}`)
        const result = this.props.searchResult.items.filter((item) => {
            return item._id === Number(id)
        })
        this.props.searchResultGameScore(result[0])
    }

    render(){
        const { classes } = this.props;
        const postItems = this.props.searchResult.item.map(game => (
            <Grid
                key={game.id}
                onClick={ () => this.setClickedGame(game, game.id) }

            >
                <Grid
                    container
                    direction="row"
                    alignItems="center"
                    className={classes.root}
                >
                    <Grid item>
                        <ButtonBase className={classes.image}>
                            <img alt="complex" className={classes.img} src={game.cover ? game.cover.url.replace('t_thumb', 't_cover_big') : require('../../icons/noImage.jpg') } />
                        </ButtonBase>
                    </Grid>
                    <Grid item xs={12} sm container>
                      <Grid item xs container direction="column" spacing={16}>
                        <Grid item xs>
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
                        </Grid>
                      </Grid>
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
  connect(mapStateToProps, {searchResultClicked, searchResultGameScore})
)(SearchResult);
