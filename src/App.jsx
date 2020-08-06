import React from 'react';
import { RecoilRoot } from 'recoil';
import { createGlobalStyle } from 'styled-components';
import Gallery from './components/Gallery';

export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }
  
  body {
    background-color: #181a1b;
  }

  #root {
    height: 100%;
    width: 60vw;
    margin: 20px auto;
  }
  @media(max-width: 800px) {
    #root {
      width: 95vw;
    }
  }
`;
const App = () => (
  <RecoilRoot>
    <GlobalStyles />
    <Gallery autoLoadTestData={false} />
  </RecoilRoot>
);
export default App;
