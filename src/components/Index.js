import React from 'react';
import { Grid, Typography, Link } from '@material-ui/core';

const Index = () => (
  <Grid container direction="column" justify="center" spacing={1}>
    <Grid item>
      <Typography variant="h6">Data Visualisation</Typography>
      <Typography component="div">
        Some examples using D3, hosted on ObservableHQ.
        <ul>
          <li>
            <Link href="https://observablehq.com/@peatroot/interacting-with-directed-acyclic-graphs">
              Interacting with a directed acyclic graph
            </Link>
          </li>
          <li>
            <Link href="https://observablehq.com/@peatroot/target-associations-bubbles">
              Circle packing applied to disease categories
            </Link>
          </li>
          <li>
            <Link href="https://observablehq.com/@peatroot/protein-protein-interactions-circular">
              Circular layout of protein-protein interactions
            </Link>
          </li>
          <li>
            <Link href="https://observablehq.com/@peatroot/chess-graphs">
              Graphs for different chess pieces
            </Link>
          </li>
          <li>
            <Link href="https://observablehq.com/@peatroot/poincare-disk">
              Triangles on the Poincare disk
            </Link>
          </li>
        </ul>
      </Typography>

      <Typography variant="h6">Articles</Typography>
      <Typography>TODO: Write something interesting!</Typography>
    </Grid>
  </Grid>
);

export default Index;
