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
import Button from '@material-ui/core/Button';
import ButtonBase from '@material-ui/core/ButtonBase';
import Grid from '@material-ui/core/Grid';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import HeaderLinkButton from './HeaderLinkButton';
import { getUser, logout } from '../../actions/UserActions';
import SearchBar from './SearchBar'
import history from '../../history.js';

const styles = theme => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.primary.dark00,
    },
    grow: {
        flexGrow: 1,
    },
    title: {
        marginRight: 10,
        fontWeight: 700,
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
        backgroundColor: theme.palette.primary.dark00,
        [theme.breakpoints.up('md')]: {
        margin: '0 auto',
            maxWidth: 1356,
        },
    },
    paper: {
        width: '200',
        borderRadius: 0,
    },
    list: {
        width: 250,
    },
        fullList: {
        width: 'auto',
    },
});

class HeaderAppBar extends React.Component {
  state = {
    anchorEl: null,
    mobileMoreAnchorEl: null,
    right: false,
  };

    componentWillMount() {
        this.props.getUser();
    }

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

    toggleDrawer = (side, open) => () => {
        this.setState({
            [side]: open,
        });
    };

  render() {
    const { anchorEl } = this.state;
    const { classes } = this.props;
    const isMenuOpen = Boolean(anchorEl);

    const sideList = (
      <div className={classes.list}>
        <List>
            {this.props.user.email ?
                <div>
                    <ListItem button>
                        <ListItemText primary={"Log Out"}
                            onClick={() => {this.props.logout()}}
                            />
                    </ListItem>
                    <ListItem button>
                        <ListItemText primary={"Add game"}
                            onClick={ () => {
                                history.push('/addgame_search')
                            }}
                            />
                    </ListItem>
                </div>

            :
            <div>
                <ListItem button>
                    <ListItemText primary={"Login"}
                        onClick={ () => {
                            history.push('/login')
                        }}
                        />
                </ListItem>
                <ListItem button>
                    <ListItemText primary={"Sign up"}
                        onClick={ () => {
                            history.push('/signup')
                        }}
                        />
                </ListItem>
                <ListItem button>
                    <ListItemText primary={"Add game"}
                        onClick={ () => {
                            history.push('/addgame_search')
                        }}
                        />
                </ListItem>
            </div>
            }
        </List>
        <Divider />
      </div>
    );

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
                      onClick={ () => {
                          history.push('/profile')
                      }}
                      color="inherit"
                      >
                      <AccountCircle/>
                  </IconButton>
                  <Button size="large" onClick={() => {this.props.logout() }}>
                      <Typography variant='button'>Sign Out</Typography>
                  </Button>
                </Grid>
            }
        </div>
    );

    return (
      <div className={classes.root}>
          <Drawer anchor="right" open={this.state.right} onClose={this.toggleDrawer('right', false)}>
            <div
              tabIndex={0}
              role="button"
              onClick={this.toggleDrawer('right', false)}
              onKeyDown={this.toggleDrawer('right', false)}
            >
              {sideList}
            </div>
          </Drawer>
        <AppBar className={classes.appBar} position="static">
          <Toolbar>
            <ButtonBase
                onClick={ () => {
                    history.push('/')
                }}
            >
                <Typography className={classes.title} variant="h6" color="inherit" noWrap>
                    SG
                </Typography>
            </ButtonBase>
            <SearchBar placeholder="Search..." inputWidth='inputL'/>
            <div className={classes.sectionDesktop}>
              <Button size="large" className={classes.headerButton}
                  onClick={ () => {
                      history.push('/addgame_search')
                  }}
              >
                <Typography variant='button'>Add Game</Typography>
              </Button>
            </div>
            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>
                {renderSignInButtons}
            </div>
            <div className={classes.sectionMobile}>
              <IconButton onClick={this.toggleDrawer('right', true)} color="inherit" aria-label="Open drawer">
                <MenuIcon />
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
        {renderMenu}
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
