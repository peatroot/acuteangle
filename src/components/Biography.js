import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Avatar, Typography, Link } from '@material-ui/core';

const useStyles = makeStyles({
  avatar: {
    margin: 10,
  },
  bigAvatar: {
    // margin: 10,
    width: '100%',
    height: '100%',
  },
});

// const Biography = () => <img src="headshot.jpg" width="100%" height="100%" />;
const Biography = () => {
  const classes = useStyles();
  return (
    <div>
      <Typography variant="h5" component="h1">
        <strong>acute</strong>angle
      </Typography>
      <Typography variant="h6">Personal homepage of Gareth Peat</Typography>
      <Avatar
        alt="Gareth Peat"
        src="headshot.jpg"
        className={classes.bigAvatar}
      />
      <Typography>
        lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum
        lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum
      </Typography>
      <Link href="https://github.com/peatroot">github</Link> •{' '}
      <Link href="https://observablehq.com/@peatroot">observable</Link> •{' '}
      <Link href="https://www.linkedin.com/in/garethpeat/">linkedin</Link>
    </div>
  );
};

export default Biography;
