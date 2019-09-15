import React from 'react';
import { Typography, Grid } from '@material-ui/core';

import Biography from '../components/Biography';
import Index from '../components/Index';

const Home = () => (
  <Grid container>
    <Grid item xs={12} sm={6} md={4}>
      <Biography />
    </Grid>
    <Grid item xs={12} sm={6} md={8}>
      <Index />
    </Grid>
  </Grid>
);

export default Home;
