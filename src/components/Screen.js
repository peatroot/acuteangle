import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  screen: {
    minHeight: '100vh',
  },
}));

const Screen = ({ children }) => {
  const classes = useStyles();
  return (
    <Grid
      className={classes.screen}
      container
      justify="center"
      alignItems="center"
    >
      <Grid item xs={10} lg={8}>
        {children}
      </Grid>
    </Grid>
  );
};

export default Screen;
