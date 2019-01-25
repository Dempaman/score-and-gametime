import React, { Component } from 'react';
import Posts from '../components/Posts';
import PostForm from '../components/Postform';
import HeaderAppBar from '../components/header';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import { Router, Switch, Route } from 'react-router-dom';
import history from '../history.js';
import Login from '../components/login';
import SignUp from '../components/signUp';
import AddGameSearchResult from '../components/addGameSearchResult';

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
        this.state = {}
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
        return (
            <div>
                <HeaderAppBar/>
                <Router history={history}>
                    <Switch>
                        <Route path="/signup" component={SignUp}/>
                        <Route path="/login" component={Login}/>
                        <Route path="/addgame_search" component={AddGameSearchResult}/>
                        <Route path='/'>
                            <Grid className={classes.root}>
                                <Posts/>
                                <PostForm/>
                            </Grid>
                        </Route>
                    </Switch>
                </Router>
            </div>
        );
    }
}

export default withStyles(styles)(App);
