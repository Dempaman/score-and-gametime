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
import Footer from '../../components/footer/';

const styles = theme => ({
    root: {
        paddingLeft: 20,
        margin: "0 auto",
        backgroundColor: theme.palette.primary.white,
        [theme.breakpoints.down('xs')]: {
            paddingLeft: 10,
        }
    },
    gameWrapper: {
        width: 1356,
        margin: 20,
    },
    containerColor: {
        backgroundColor: theme.palette.primary.white,
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
    },
    absolute: {
        position: "absolute",
        bottom: 0,
        width: "100%",
    },
    noAbsolute: {
        position: "relative",
        width: "100%",
    },
    company: {
        color: "#1e262cb5",
        lineHeight: 1,
        marginBottom: 5,
    },
    subtitle1: {
        lineHeight: 1.1,
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
                <Grid className={classes.containerColor}>
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
                                <Typography className={classes.subtitle1} variant="subtitle1" >
                                    {game.name}
                                </Typography>
                                <Typography className={classes.subtitle1} variant="subtitle1">
                                    {game.release_dates ?
                                        Math.min.apply(game.release_dates, game.release_dates.map(find =>(
                                                find.y
                                            ))
                                        )
                                        :
                                        "No release date found"
                                    }
                                </Typography>
                                <Typography className={classes.company} variant="body2" >
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
            </Grid>
        ))

        return (
            <Grid
                container
                justify="center"
            >
            <Grid container justify="center">
                <Typography variant="caption">Search limit is set to 3.</Typography>
            </Grid>
                <Grid  className={classes.gameWrapper}>
                    {!this.props.searchResult.loading ?
                        <Grid
                            container
                            justify="center"
                            className={classes.gameWrapper}
                        >

                            <CircularProgress/>
                        </Grid>
                        :
                        <Grid>
                            {postItems}
                        </Grid>
                    }
                </Grid>
                <Grid className={this.props.searchResult.item.length === 0 ? classes.absolute : classes.noAbsolute}>
                    <Footer/>
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
  connect(mapStateToProps, {searchResultClicked, searchResultGameScore})
)(SearchResult);
