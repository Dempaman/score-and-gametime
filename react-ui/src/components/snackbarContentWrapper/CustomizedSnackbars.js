NOT IN USE

/*import ErrorAlert from './ErrorAlert';

const styles2 = theme => ({
  margin: {
    margin: theme.spacing.unit,
  },
});


class CustomizedSnackbars extends React.Component {
  state = {
    open: false,
  };

  handleClick = () => {
    this.setState({ open: true });
  };

  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;

    return (
      <div>
        <Button className={classes.margin} onClick={this.handleClick}>
          Open success snackbar
        </Button>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={this.state.open}
          autoHideDuration={6000}
          onClose={this.handleClose}
        >
          <SnackbarContentWrapper
            onClose={this.handleClose}
            variant="success"
            message="This is a success message!"
          />
        </Snackbar>
        <SnackbarContentWrapper
          variant="error"
          className={classes.margin}
          message="This is an error message!"
        />
        <SnackbarContentWrapper
          variant="warning"
          className={classes.margin}
          message="This is a warning message!"
        />
        <SnackbarContentWrapper
          variant="info"
          className={classes.margin}
          message="This is an information message!"
        />
        <SnackbarContentWrapper
          variant="success"
          className={classes.margin}
          message="This is a success message!"
        />
      </div>
    );
  }
}
export default withStyles(styles2)(CustomizedSnackbars);*/
