import React, { Component } from 'react';
import './App.css';
import styled from 'styled-components';

import Poincare from './components/Poincare';
import PoincareCanvas from './construction/poincareCanvas';

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  // justify-content: space-evenly;
  align-items: center;
  padding: 0 2rem;
  min-height: 100vh;
`;

const BannerTitle = styled.h1`
  font-size: 3rem;
  font-family: sans-serif;
  color: grey;
`;

const SubTitle = styled.h2`
  font-size: 1.5rem;
  font-family: sans-serif;
`;

const PoincareContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  width: 100%;
  & > * {
    margin: 1rem;
  }
`;

const LinkContainer = styled.div`
  display: flex;
  margin-bottom: 2rem;
`;

const ExternalLink = styled.a`
  display: inline-block;
  border-radius: 3px;
  padding: 0.5rem 0;
  margin: 0.5rem 1rem;
  width: 7rem;
  background: transparent;
  color: grey;
  border: 2px solid grey;
  text-align: center;
  text-decoration: none;
  &:hover {
    background: grey;
    color: white;
    transition: background 300ms ease-out;
  }
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
        <LinkContainer>
          <ExternalLink href="https://github.com/peatroot">GitHub</ExternalLink>
          <ExternalLink href="mailto:garethpeat@gmail.com">Email</ExternalLink>
          <ExternalLink href="https://www.linkedin.com/in/garethpeat/">
            LinkedIn
          </ExternalLink>
        </LinkContainer>
        <PoincareContainer>
          <Poincare p={8} q={3} depth={3} renderPolygons={scheme1} />
          <Poincare p={3} q={7} depth={3} renderPolygons={scheme3} />
          <Poincare p={5} q={4} depth={3} renderPolygons={scheme2} />
        </PoincareContainer>
      </MainContainer>
    );
  }
}

export default App;
