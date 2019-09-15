import React from 'react';
import { Typography, Grid } from '@material-ui/core';

import Biography from '../components/Biography';

const Home = () => (
  <Grid container>
    <Grid item xs={12} sm={6} md={4}>
      <Biography />
    </Grid>
    <Grid item xs={12} sm={6} md={8}>
      blah
    </Grid>
  </Grid>
);

export default Home;
