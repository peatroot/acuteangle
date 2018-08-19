import React, { Component } from 'react';
import './App.css';

import Poincare from './components/Poincare';

class App extends Component {
  render() {
    return (
    <div style={{display: 'flex'}}>
      <Poincare p={3} q={7} depth={2} />
      <Poincare p={7} q={3} depth={2} />
      <Poincare p={5} q={4} depth={2} />
      </div>
        )
  }
}

export default App;
