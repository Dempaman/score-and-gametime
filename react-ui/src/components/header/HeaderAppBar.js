import React from 'react';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { withStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MoreIcon from '@material-ui/icons/MoreVert';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

import HeaderLinkButton from './HeaderLinkButton';
import { getUser, logout } from '../../actions/UserActions';
import SearchBar from './SearchBar'

const styles = theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.primary.blue01,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  appBar: {
      backgroundColor: theme.palette.primary.blue01,
      [theme.breakpoints.up('md')]: {
          margin: '0 auto',
          maxWidth: 1356,
      },
  },
  paper: {
    width: '200',
    borderRadius: 0,
  },
});

class HeaderAppBar extends React.Component {
  state = {
    anchorEl: null,
    mobileMoreAnchorEl: null,
  };

    componentWillMount() {
        this.props.getUser();
    }

  handleProfileMenuOpen = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleMenuClose = () => {
    this.setState({ anchorEl: null });
    this.handleMobileMenuClose();
  };

  handleMobileMenuOpen = event => {
    this.setState({ mobileMoreAnchorEl: event.currentTarget });
  };

  handleMobileMenuClose = () => {
    this.setState({ mobileMoreAnchorEl: null });
  };

  render() {
    const { anchorEl, mobileMoreAnchorEl } = this.state;
    const { classes } = this.props;
    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const renderMenu = (
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMenuOpen}
        onClose={this.handleMenuClose}
      >
        <MenuItem onClick={this.handleMenuClose}>Profile</MenuItem>
        <MenuItem onClick={this.handleMenuClose}>My account</MenuItem>
      </Menu>
    );

    const renderMobileMenu = (
      <Menu
        anchorEl={mobileMoreAnchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMobileMenuOpen}
        onClose={this.handleMobileMenuClose}
      >
        <MenuItem onClick={this.handleProfileMenuOpen}>
          <p>Profile</p>
        </MenuItem>
        <MenuItem >
          <p>Login</p>
        </MenuItem>
        <MenuItem >
          <p>Sign Up</p>
        </MenuItem>
        <MenuItem >
          <p>Add Game</p>
        </MenuItem>
      </Menu>
    );

    const renderSignInButtons = (
        <div>
            {!this.props.user.email ?
                <Grid container alignItems="center">
                    <HeaderLinkButton loginLabel='Login' signUpLabel='sign up' logoutLable='Log Out'/>
                </Grid>
                :
                <Grid className="navbar">
                  <IconButton
                      aria-owns={isMenuOpen ? 'material-appbar' : undefined}
                      aria-haspopup="true"
                      onClick={this.handleProfileMenuOpen}
                      color="inherit"
                      >
                      <AccountCircle />
                  </IconButton>
                  <Button size="large" onClick={() => {this.props.logout()}}>
                      <Typography variant='button'>Sign Out</Typography>
                  </Button>
                </Grid>
            }
        </div>
    );

    return (
      <div className={classes.root}>
        <AppBar className={classes.appBar} position="static">
          <Toolbar>
            <IconButton className={classes.menuButton} color="inherit" aria-label="Open drawer">
              <MenuIcon />
            </IconButton>
            <Typography className={classes.title} variant="h6" color="inherit" noWrap>
              SG
            </Typography>
            <SearchBar placeholder="Search..." inputWidth='inputL'/>
            <div className={classes.sectionDesktop}>
              <Button size="large" className={classes.headerButton}>
                <Typography variant='button'>Add Game</Typography>
              </Button>
            </div>
            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>
                {renderSignInButtons}
            </div>
            <div className={classes.sectionMobile}>
              <IconButton aria-haspopup="true" onClick={this.handleMobileMenuOpen} color="inherit">
                <MoreIcon />
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
        {renderMenu}
        {renderMobileMenu}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
    user: state.user,
})

export default compose(
  withStyles(styles),
  connect(mapStateToProps, { getUser, logout })
)(HeaderAppBar);
