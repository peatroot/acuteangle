import React from 'react';
import { Grid } from '@material-ui/core';

import Biography from '../components/Biography';
import Index from '../components/Index';

const Home = () => (
  <Grid container spacing={4}>
    <Grid item xs={12} sm={6} md={6}>
      <Biography />
    </Grid>
    <Grid item xs={12} sm={6} md={6}>
      <Index />
    </Grid>
  </Grid>
);

export default Home;
