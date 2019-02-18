import React, { Component } from 'react';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import { withStyles } from '@material-ui/core/styles';
import { Router, Switch, Route } from 'react-router-dom';
import history from '../history.js';

import HeaderAppBar from '../components/header';
import Footer from '../components/footer/';
import Login from '../components/login';
import SignUp from '../components/signUp';
import Home from '../components/home';
import AddGameSearchResult from '../components/addGameSearchResult';
import SubmitGameForm from '../components/submitGameForm';
import GameDetails from '../components/gameDetails';
import Search from '../components/searchResult';
import Profile from '../components/profile';
import { searchResultClicked } from '.././actions/SearchActions';

const styles = theme => ({
    root: {
        textAlign: 'center',
        backgroundColor: theme.palette.secondary.main,
        height: '100%',
    }
});

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
        this.connecToServer = this.connecToServer.bind(this);
    }
    connecToServer() {
        fetch('/');
    }

    componentDidMount() {
        this.connecToServer();
    }



    render() {
        const { classes } = this.props;
        const id = history.location.pathname.split("/submitgame_form/game/")[1]
        const gameId = history.location.pathname.split("/game_details/")[1]
        return (
            <div>
                <Router history={history}>
                    <Switch>
                        <Route path="/signup">
                            <SignUp/>
                        </Route>
                        <Route path="/login">
                            <Login/>
                        </Route>
                        <Route path="/addgame_search" >
                            <div>
                                <HeaderAppBar/>
                                <AddGameSearchResult/>
                                <Footer/>
                            </div>
                        </Route>
                        <Route path={`/submitgame_form/game/${id}`}>
                            <div>
                                <HeaderAppBar/>
                                <SubmitGameForm/>
                                <Footer/>
                            </div>
                        </Route>
                        <Route path={`/game_details/${gameId}`}>
                            <div>
                                <HeaderAppBar/>
                                <GameDetails/>
                                <Footer/>
                            </div>
                        </Route>
                        <Route path={`/Search`}>
                            <div>
                                <HeaderAppBar/>
                                <Search/>
                                <Footer/>
                            </div>
                        </Route>
                        <Route path={`/profile`}>
                            <div>
                                <HeaderAppBar/>
                                <Profile/>
                                <Footer/>
                            </div>
                        </Route>
                        <Route path='/'>
                            <div>
                                <HeaderAppBar/>
                                <Home/>
                                <Footer/>
                            </div>
                        </Route>
                    </Switch>
                </Router>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => ({
    searchResult: state.searchResult,
})

export default compose(
  withStyles(styles),
  connect(mapStateToProps, {searchResultClicked})
)(App);
