import React, { Component } from 'react';
import './App.css';
import styled from 'styled-components';

import Poincare from './components/Poincare';
import PoincareCanvas from './construction/poincareCanvas';

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  padding: 2rem;
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
  width: 100%;
`;

const scheme1 = (context, polygons, R) => {
  PoincareCanvas.renderBoundaryCircle(context, R, 'grey', 'grey');
  PoincareCanvas.renderPolygonsRightTriangles(context, polygons, R);
};

const scheme2 = (context, polygons, R) => {
  PoincareCanvas.renderBoundaryCircle(context, R, 'grey', 'grey');
  PoincareCanvas.renderPolygonsSolid(context, polygons, R);
};

const scheme3 = (context, polygons, R) => {
  PoincareCanvas.renderBoundaryCircle(context, R, 'grey', 'grey');
  PoincareCanvas.renderPolygonsDuals(context, polygons, R);
};

class App extends Component {
  render() {
    return (
      <MainContainer>
        <BannerTitle>Homepage of Gareth Peat</BannerTitle>
        <SubTitle />
        <PoincareContainer>
          <Poincare p={3} q={8} depth={3} renderPolygons={scheme1} />
          <Poincare p={3} q={7} depth={3} renderPolygons={scheme3} />
          <Poincare p={5} q={4} depth={3} renderPolygons={scheme2} />
        </PoincareContainer>
      </MainContainer>
    );
  }
}

export default App;
