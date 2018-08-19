import React, { Component } from 'react';
import './App.css';
import styled from 'styled-components';

import Poincare from './components/Poincare';

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
`;

const BannerTitle = styled.h1`
  font-size: 3rem;
  font-family: sans-serif;
`;

const SubTitle = styled.h2`
  font-size: 1.5rem;
  font-family: sans-serif;
`;

const PoincareContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
`;

class App extends Component {
  render() {
    return (
      <MainContainer>
        <BannerTitle>acuteangle</BannerTitle>
        <SubTitle>Homepage of Gareth Peat</SubTitle>
        <PoincareContainer>
          <Poincare p={3} q={7} depth={3} />
          <Poincare p={7} q={3} depth={3} />
          <Poincare p={5} q={4} depth={3} />
        </PoincareContainer>
      </MainContainer>
    );
  }
}

export default App;
