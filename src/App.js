import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { cyan } from '@material-ui/core/colors';

import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import Home from './pages/Home';

import Screen from './components/Screen';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: cyan[500],
    },
  },
  typography: {
    useNextVariants: true,
    fontFamily: '"Inter", "serif"',
    fontSize: 10,
  },
});

class App extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <Screen>
          <Router>
            <Route path="/" exact component={Home} />
          </Router>
        </Screen>
      </ThemeProvider>
    );
  }
}

export default App;
