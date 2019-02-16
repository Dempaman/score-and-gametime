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
            blue02: '#438BC8',
            blue03: '#36A9CE',
            dark00: '#232A2F',
            dark01: '#222327',
            dark02: '#131417',
            dark03: '#1B2025',
            white: '#fff',
            white01: '#E4E8EB',
        },
        secondary: {
            main: '#2B2A32',
            orangeButton: 'linear-gradient(top, #f27449 0%,#fb9f33 100%)',
            divider: 'rgba(90, 90, 90, 0.19)'
        }
    },
    typography: {
        fontFamily: 'Open Sans, sans-serif',
        headline:{
            color: '#fff',
        },
        body1: {
            color: '#1e262c'
        },
        body2: {
            color: '#1e262c',
            fontWeight: '300',
            lineHeight: 0.6
        },
        body3: {
            color: '#fff',
            fontWeight: '300',
        },
        subtitle1: {
            color: '#1e262c',
        },
        subtitle2: {
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
            color: '#1e262c',
            fontWeight: 300,
            fontSize: "36px"
        },
        h4: {
            color: '#fff',
            fontWeight: 400,
        },
        h5: {
            color: '#1e262c',
            fontWeight: 400,
            fontSize: "1.2rem",
        },
        h6: {
            color: "rgba(183, 183, 183, 0.87)",
            fontWeight: 300,
            fontSize: "1.05rem",
        },
        display4: {
            color: '#fff',
            fontWeight: 700,
            fontSize: "3rem",
        },
        caption: {
            color: '#1e262c',
        },
    },
    shadows: ["none"],

    //**** overrides  **** ///
    overrides:{
        MuiMenu: {
            paper: {
                borderRadius: 0,
                color: '#00000078',
            }
        },
        MuiPaper: {
            root: {
                backgroundColor: "#000000d6",
            },
            rounded: {
                borderRadius: 0,
                border: "none",
            }
        },
        MuiDialog: {
            paper: {
                margin: 0,
            },
        },
        MuiDivider: {
            light: {
                backgroundColor: 'rgba(68, 68, 68, 0.2)'
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
                    borderBottom: '1px solid #1e262c',
                },
                '&:hover:not($disabled):after': {
                    borderBottom: '1px solid #1e262c',
                },
                '&:before': {
                    borderBottom: 0,
                },
                "&:hover:not($disabled):not($focused):not($error):before": {
                  borderBottom: '1px solid #1e262c',
                },
            },
        },
        MuiOutlinedInput: {
            root: {
                color: '#1e262c',
                '& $notchedOutline': {
                    borderColor: '#1e262c',
                    borderRadius: 0,
                },
                '&:hover:not($disabled):not($focused):not($error) $notchedOutline': {
                    borderColor: '#1e262c',
                    '@media (hover: none)': {
                        borderColor: '#1e262c',
                    },
                },
                '&$focused $notchedOutline': {
                    borderColor: '#1e262c',

                },
            },
        },
        MuiFormLabel: {
            root: {
                '&$focused': {
                    color: '#1e262c'
                }
            },
            filled: {
                color: '#1e262c',
            },
        },
        MuiFormHelperText: {
            root: {
                color: '#1e262c',
            }
        },
        MuiInputBase: {
            input: {
                color: '#1e262c'
            },
        },
        MuiInputLabel: {
            outlined: {
                color: '#1e262c',
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
        MuiTableCell: {
            root: {
                borderBottom: "1px solid #1e262c",
            },
            head: {
                color: "#1e262c",
                fontSize: "0.8rem"
            },
            body: {
                color: "#1e262c",

            }
        },
        MuiPickersCalendarHeader: {
            iconButton: {
                margin: "5px 10px"
            },
        },
        MuiPickersDay: {
            day: {
                color: "#fff"
            },
        },
        MuiSlider: {
            thumb: {
                backgroundColor: "#36A9CE"
            },
            track: {
                backgroundColor: "#36A9CE"
            }
        },
        MuiCardMedia: {
            root: {
                backgroundPosition: "top",
            }
        },
        MuiMenuItem: {
            root: {
                color: "#fff"
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
