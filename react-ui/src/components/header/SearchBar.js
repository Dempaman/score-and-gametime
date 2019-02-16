import React, { Component } from 'react';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import { withStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import { fade } from '@material-ui/core/styles/colorManipulator';
import history from '../../history.js';

import { getUser } from '../../actions/UserActions';
import { searchResultNameHead, searchResultHead } from '../../actions/SearchActions';


const styles = theme => ({
    search: {
      position: 'relative',
      color: '#1e262c',
      borderRadius: 0,
      backgroundColor: fade(theme.palette.common.white, 0.45),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.55),
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
          width: 350,
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
        const result = this.props.searchResult.filter((game) => {
            return game.games[0].gameData.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1;
        })
        this.props.searchResultNameHead(result)
    }

    keyPress = (event) => {
        if (event.key === 'Enter') {
            this.props.searchResultHead();
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
                    onClick={ () => {
                        history.push('/search')
                    }}
                    onChange={this.updateSearch}
                    onKeyPress={this.keyPress}
                    placeholder={placeholder}
                    classes={{
                        root: classes.inputRoot,
                        input: classes.inputInput,
                    }}
                />
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => ({
    user: state.user,
    searchResult: state.searchResult.items
})

export default compose(
  withStyles(styles),
  connect(mapStateToProps, { getUser, searchResultNameHead, searchResultHead })
)(SearchBar);
