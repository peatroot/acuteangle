import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { CssBaseline } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';

import theme from './theme';
import Home from './pages/Home';
import Screen from './components/Screen';

class App extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
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
