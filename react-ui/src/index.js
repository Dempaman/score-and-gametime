import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from "react-router-dom";
import history from "./history.js";
import './index.css';
import App from './containers/App';
import * as serviceWorker from './serviceWorker';
import axios from 'axios';
import { Provider } from 'react-redux';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import store from  './store';

axios.defaults.headers.common['user-key'] = '1e0d942be61aa0b756e62a4ebd28521f'
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#33323A',
            blue01: '#2C6BC8',
            blue02: '#438BC8',
            blue03: '#36A9CE',
            dark01: '#222327',
            dark02: '#131417',
        },
        secondary: {
            main: '#2B2A32',
            orangeButton: 'linear-gradient(top, #f27449 0%,#fb9f33 100%)',
            divider: 'rgba(255, 255, 255, 0.12)'
        }
    },
    typography: {
        fontFamily: 'Lato, sans-serif',
        headline:{
            color: '#fff',
        },
        body1: {
            color: '#747480'
        },
        body2: {
            color: '#fff',
            fontWeight: '300',
            lineHeight: 0.6
        },
        body3: {
            color: '#747480',
            fontWeight: '700',
        },
        subtitle1: {
            color: '#fff',
        },
        button: {
            color: '#fff',
            fontWeight: '700',
        },
        h1: {
            color: '#fff',
        },
        h2: {
            color: '#fff',
        },
        h3: {
            color: '#fff',
            fontWeight: 300,
        },
        h4: {
            color: '#fff',
            fontWeight: 400,
        },
        h5: {
            color: '#fff',
            fontWeight: 400,
            fontSize: "1.2rem",
        },
        display4: {
            color: '#fff',
            fontWeight: 700,
            fontSize: "3rem",
        },
    },
    shadows: ["none"],

    //**** overrides  **** ///
    overrides:{
        MuiMenu: {
            paper: {
                borderRadius: 0,
                color: '#131417',
            }
        },
        MuiDivider: {
            light: {
                backgroundColor: 'rgba(255, 255, 255, 0.2)'
            }
        },
        MuiButton: {
            root: {
                borderRadius: 0,
                color: "#fff",
            },
        },
        MuiInput: {
            underline: {
                borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
                '&:hover:not($disabled):before': {
                    borderBottom: '1px solid #fff',
                },
                '&:hover:not($disabled):after': {
                    borderBottom: '1px solid #fff',
                },
                '&:before': {
                    borderBottom: 0,
                },
                "&:hover:not($disabled):not($focused):not($error):before": {
                  borderBottom: '1px solid #fff',
                },
            },
        },
        MuiOutlinedInput: {
            root: {
                color: '#fff',
                '& $notchedOutline': {
                    borderColor: 'rgba(255, 255, 255, 0.2)',
                    borderRadius: 0,
                },
                '&:hover:not($disabled):not($focused):not($error) $notchedOutline': {
                    borderColor: '#fff',
                    '@media (hover: none)': {
                        borderColor: 'rgba(255, 255, 255, 0.2)',
                    },
                },
                '&$focused $notchedOutline': {
                    borderColor: '#fff',

                },
            },
        },
        MuiFormLabel: {
            root: {
                '&$focused': {
                    color: '#fff'
                }
            },
            filled: {
                color: 'rgba(255, 255, 255, 0.2)',
            },
        },
        MuiFormHelperText: {
            root: {
                color: '#fff',
            }
        },
        MuiInputBase: {
            input: {
                color: '#fff'
            },
        },
        MuiInputLabel: {
            outlined: {
                color: '#fff',
            },
        },
        MuiCircularProgress: {
            colorPrimary: {
                color: '#438BC8',
            }
        },
        MuiMobileStepper: {
            root: {
                backgroundColor: "#438BC8"
            },
            dot: {
                backgroundColor: "#fff"
            }
        },
    }
    //**** ------   **** ///

});

ReactDOM.render(
    <div>
        <MuiThemeProvider theme={theme}>
            <Provider store={store}>
                <Router history={history}>
                    <App/>
                </Router>
            </Provider>
        </MuiThemeProvider>
    </div>,
    document.getElementById('root')
);
serviceWorker.unregister();
