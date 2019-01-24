import React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import history from '../../history.js';

const styles = theme => ({
    root: {
        margin: '0 auto'
    },
    gridWidth: {
        width: 340,
    },
    buttonStyle: {
        marginTop: '25px',
        width: 340,
        backgroundColor: theme.palette.primary.blue01,
        border: '1px solid rgba(255, 255, 255, 0.2)',
    },
    buttonStyle2: {
        marginTop: '25px',
        width: 340,
        backgroundColor: theme.palette.primary.blue02,
        border: '1px solid rgba(255, 255, 255, 0.2)',
    },
});

const FooterButton = (props) => {
    const { submitLabel, otherLabel, goToLink, classes } = props;
    return (
        <Grid>
            <Grid
                container
                direction='column'
                alignItems='center'
                >
                <Button type='submit' size='large' className={classes.buttonStyle}>
                    <Typography variant='button'>{submitLabel}</Typography>
                </Button>
                <Button size='large' className={classes.buttonStyle2}
                    onClick={ () => {
                        history.push(goToLink)
                    }}
                >
                    <Typography size='large' variant='button'>{otherLabel}</Typography>
                </Button>
            </Grid>
        </Grid>
    )
}

export default withStyles(styles)(FooterButton);
