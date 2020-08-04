import React from 'react';
import './App.css';
import { RecoilRoot } from 'recoil';
import { Gallery } from "./components/Gallery";

const App = () => (
  <RecoilRoot>
    <Gallery />
  </RecoilRoot>
);

export default App;
