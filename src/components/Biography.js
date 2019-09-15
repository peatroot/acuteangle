import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Avatar, Typography, Link } from '@material-ui/core';

const useStyles = makeStyles({
  bigAvatar: {
    width: '100%',
    height: '100%',
    maxWidth: '200px',
  },
});

const Biography = () => {
  const classes = useStyles();
  return (
    <Grid
      container
      direction="column"
      justify="center"
      alignItems="center"
      spacing={2}
    >
      <Grid item>
        <Typography variant="h5" component="h1">
          <strong>acute</strong>angle
        </Typography>
      </Grid>
      <Grid item>
        <Typography variant="h6">Personal homepage of Gareth Peat</Typography>
      </Grid>
      <Grid item>
        <Typography>Software engineer. Based in Cambridge, UK.</Typography>
      </Grid>
      <Grid item>
        <Avatar
          alt="Gareth Peat"
          src="headshot.jpg"
          className={classes.bigAvatar}
        />
      </Grid>
      <Grid item>
        <Typography align="justify">
          Hello! I'm a software engineer with experience primarily in JavaScript
          and Python, though I've dabbled with C, Scala, Clojure and Prolog. I'm
          interested in lots of things, but currently curious about graph
          theory, expert systems and natural language processing. I currently
          write software in the genetics and bioinformatics sector. I studied
          mathematics.
        </Typography>
      </Grid>
      <Grid item>
        <Link href="https://github.com/peatroot">github</Link> •{' '}
        <Link href="https://observablehq.com/@peatroot">observable</Link> •{' '}
        <Link href="https://www.linkedin.com/in/garethpeat/">linkedin</Link>
      </Grid>
    </Grid>
  );
};

export default Biography;
