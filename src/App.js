import React from 'react';
import { RecoilRoot } from 'recoil';
import { Gallery } from "./components/Gallery";
import { createGlobalStyle } from "styled-components";


export const GlobalStyles = createGlobalStyle`
body {
  background-color: #181a1b;
}

#root {
  width: 50vw;
  margin: 20px auto;
}
`
const App = () => (
  <RecoilRoot>
    <GlobalStyles />
    <Gallery autoLoadTestData={true} />
  </RecoilRoot>
);

export default App;
