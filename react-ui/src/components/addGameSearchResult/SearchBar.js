import React, { Component } from 'react';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import axios from 'axios';
import { withStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import { fade } from '@material-ui/core/styles/colorManipulator';

import { searchResult, loading  } from '../../actions/SearchActions';

const styles = theme => ({
    search: {
      position: 'relative',
      color: '#1e262c',
      borderRadius: 0,
      backgroundColor: "#fff",
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.65),
      },
      marginRight: theme.spacing.unit * 2,
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing.unit * 3,
        width: 'auto',
      },
    },
      searchIcon: {
        width: theme.spacing.unit * 9,
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
      inputRoot: {
        color: 'inherit',
        width: '100%',
      },
      inputInput: {
        paddingTop: theme.spacing.unit,
        paddingRight: theme.spacing.unit,
        paddingBottom: theme.spacing.unit,
        paddingLeft: theme.spacing.unit * 10,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
          width: 600,
        },
        [theme.breakpoints.down('sm')]: {
          width: "90%",
        },
      },
});


class SearchBar extends Component {
    constructor(props) {
        super(props)
            this.state = {
                search: '',
            }
    }


    updateSearch = (event) => {
        this.setState({search: event.target.value })
    }

    keyPress = (event) => {
        if (event.key === 'Enter') {
            this.props.loading(false)
            axios({
                url: `https://boiling-wildwood-33193.herokuapp.com/https://api-v3.igdb.com//games/?search=${this.state.search}&fields=name,genres.name,videos.video_id,release_dates.y,release_dates.human,popularity,platforms.name,involved_companies.developer,involved_companies.company.name,cover.url,popularity,screenshots.url&limit=5`,
                headers: {
                  "user-key": "6f618d610d984b87f163ab3f0097a78f",
                  'Access-Control-Allow-Origin': '*',
                },
                method: 'GET',
            })
            .then(res => {
                this.props.searchResult(res.data)
                this.props.loading(true)

            })
            .catch(err => {
                console.error(err);
            });
        event.preventDefault();
        }
    }

    render(){
        const { classes, placeholder } = this.props;
        return (
            <div className={classes.search}>
                <div className={classes.searchIcon}>
                    <SearchIcon />
                </div>
                <InputBase
                    placeholder={placeholder}
                    classes={{
                        root: classes.inputRoot,
                        input: classes.inputInput,
                    }}
                    onChange={this.updateSearch}
                    value={this.state.search}
                    name="search"
                    onKeyPress={this.keyPress}
                />
            </div>
        )
    }
}

export default compose(
  withStyles(styles),
  connect(null, { searchResult, loading })
)(SearchBar);
