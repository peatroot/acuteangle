import React from 'react';
import { CssBaseline } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';

import theme from './theme';
import Home from './pages/Home';
import Screen from './components/Screen';

const App = () => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <Screen>
      <Home />
    </Screen>
  </ThemeProvider>
);

export default App;
